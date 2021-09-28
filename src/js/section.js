var _section = {

    tree: null,
    gridFilters: [],

    welcome: function() {
        //this.dashboard();
        //this.palinsesto();
    },

    dashboard: function() {
        _content.title("Benvenuto", "");
        $("#main-dashboard").load("pages/dashboard.html", function() {
            $('section.content').addClass("hide");
            $("#main-dashboard").removeClass("hide");
            dashboard2();
            setTimeout(function() {}, 1000)
        });
    },

    config: function(key) {
        _system.database.ref(key).once('value').then(function(data) {
            var items = data.val();
            _form.modalConfig(key, items);
        });
    },

    payout: function(idProject) {
        if (confirm("Vuoi effettuare un payout per questo progetto? Verrà effettuato solo se presente disponibilità e in tal caso tutti i fondi saranno trasferiti!")) {
            firebase.database().ref("/projects/" + idProject).once('value').then(function(data) {
                var project = data.val();
                firebase.database().ref("/users/" + project.users_id).once('value').then(function(data) {
                    var user = data.val();
                    var transferData = {
                        "ProjectId": idProject,
                        "BankId": user.wallet.bank_id,
                        "UserId": project.users_id
                    };
                    if (user['wallet'] === undefined || user['wallet']['bank_id'] === undefined || user['wallet']['bank_id'] == "") {
                        alert("Attenzione! L'utente a cui è associato questo progetto non ha un bank_id assegnato! Sicuro l'utente sia stato validato correttamente?");
                        return;
                    }
                    $.ajax({
                        url: _config.apiCheck + "mangopay/payouts/bank/",
                        method: 'POST',
                        data: JSON.stringify(transferData),
                        dataType: "json",
                        crossDomain: true,
                        header: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                        success: function(data) {
                            if (data.status == "OK") {
                                _section.grid('payouts');
                            } else {
                                alert("Non è stato possibile effettuare un payout! Controllo che il progetto abbia disponibilità di fondi.");
                            }
                        },
                        error: function(err) {
                            alert("Non è stato possibile effettuare un payout! Controllo che il progetto abbia disponibilità di fondi.");
                            return
                        },
                    });
                });
            });
        }
    },

    grid: function(key, filterField, filterValue, limit) {
        if (_system.isUndefined(key)) return false;
        if (_system.isUndefined(_dataGrids[key])) return false;
        if (_system.isUndefined(limit)) limit = 2000;
        _content.header('<button class="btn btn-warning export"><i class="fa fa-file-excel-o" aria-hidden="true"></i> ' + _system.label("Export") + '</button>' + (_dataGrids[key]['action']['create'] ? '<button type="button" form="' + key + '" class="btn btn-primary add"><i class="fa fa-plus" aria-hidden="true"></i> ' + _system.label("Add") + '</button>' : ''));
        _content.title(_system.label(_dataGrids[key]['title']), "");
        _content.loader();
        if (filterField !== undefined && filterField !== null) {
            _section.gridFilters[key] = {
                filterField: filterField,
                filterValue: filterValue,
                limit: null
            }
            var moreFilter = "";
            if (filterValue == "pending_expired") {
                filterValue = "pending";
                moreFilter = "expired";
            }
            _system.database.ref(key).orderByChild(filterField).equalTo(filterValue).limitToLast(limit).once('value').then(function(data) {
                var items = data.val();
                var data = [];
                var i = 0;
                for (id in items) {
                    if (moreFilter == "expired") {
                        //Scaduto da 14 giorni
                        if (items[id]['created_at'] < (new Date().getTime() - (86400000 * 14))) {
                            data[i] = items[id];
                            data[i]['__id'] = id;
                            i++;
                        }

                    } else {
                        if (items[id]['is_deleted'] != true || filterField == "is_deleted") {
                            data[i] = items[id];
                            data[i]['__id'] = id;
                            i++;
                        }
                    }
                }
                data.sort(function(a, b) { return (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0); });
                _content.render(_box.create("", _grid.table(key, _dataGrids[key], data)));
                $("table#" + key).DataTable({
                    "pageLength": 25,
                    "stateSave": true,
                    "stateSaveParams": function(settings, data) {
                        //console.log(data);
                    },
                    "language": _dataLabels.dataTable
                });
            });
        } else {
            _section.gridFilters[key] = {
                filterField: null,
                filterValue: null,
                limit: limit
            }
            _system.database.ref(key).limitToLast(limit).once('value').then(function(data) {
                var items = data.val();
                var data = [];
                var i = 0;
                for (id in items) {
                    if (items[id]['is_deleted'] != true || filterField == "is_deleted") {
                        data[i] = items[id];
                        data[i]['__id'] = id;
                        i++;
                    }
                }
                data.sort(function(a, b) { return (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0); });
                _content.render(_box.create("", _grid.table(key, _dataGrids[key], data)));
                $("table#" + key).DataTable({
                    "pageLength": 25,
                    "stateSave": true,
                    "stateSaveParams": function(settings, data) {
                        //console.log(data);
                    },
                    "language": _dataLabels.dataTable
                });
            });
        }
    },

    sections: function() {
        var key = "sections";
        _content.header('<button class="btn btn-warning export"><i class="fa fa-file-excel-o" aria-hidden="true"></i> ' + _system.label("Export") + '</button>' + (_dataGrids[key]['action']['create'] ? '<button type="button" form="' + key + '" class="btn btn-primary add"><i class="fa fa-plus" aria-hidden="true"></i> ' + _system.label("Add") + '</button>' : ''));
        _content.title(_system.label("Sections"), "");
        _content.loader();
        /*
        _system.database.ref("languages").once('value').then(function(data) {
            var lang = [];
            var langData = data.val();
            for (i in langData) {
                if (langData[i]['is_active']) {
                    lang[langData[i]['code']] = langData[i]['language'];
                }
            }
        */
        var lang = { "en": "true", "it": "true", "de": "false", "fr": "false", "es": "false" };

        _system.database.ref("sections").once('value').then(function(data) {
            _section.tree = data.val();
            _grid.data = data.val();
            var langSelected = "IT";
            if (_section.latestLangSelected !== undefined) var langSelected = _section.latestLangSelected;
            $('#main-content').html("\n\
                <div class='nav-tabs-custom sections'>\n\
                    <ul class='nav nav-tabs'>\n\
                    <li class='" + (langSelected == "IT" ? "active" : "") + "'><a href='#section_IT' onclick='_section.latestLangSelected = \"IT\"' data-toggle='tab' aria-expanded='true'><div class='icon IT'>&nbsp;</div></a></li>\n\
                    <li class='" + (langSelected == "EN" ? "active" : "") + "'><a href='#section_EN' onclick='_section.latestLangSelected = \"EN\"' data-toggle='tab' aria-expanded='true'><div class='icon EN'>&nbsp;</div></a></li>\n\
                    </ul>\n\
                    <div class='tab-content'>\n\
                        <div class='tab-pane " + (langSelected == "IT" ? "active" : "") + "' id='section_IT'></div>\n\
                        <div class='tab-pane " + (langSelected == "EN" ? "active" : "") + "' id='section_EN'></div>\n\
                    </div>\n\
                </div>");
            $('#section_EN').treeview({ data: _section.createTreeItems(_grid.data, "en", lang, 0), selectable: false, levels: 5 });
            $('#section_IT').treeview({ data: _section.createTreeItems(_grid.data, "it", lang, 0), selectable: false, levels: 5 });
        });
        //});
    },

    createTreeItems: function(items, nodeId, lang, level) {
        var nodes = [];
        if (_system.isNull(nodeId)) nodeId = "";
        var myItems = [];
        for (key in items) {
            var item = items[key];
            if (nodeId == item['sections_id']) {
                myItems.push(item);
                var newPos = myItems.length - 1
                myItems[newPos]['key'] = key;
                if (myItems[newPos]['order_id'] == undefined) myItems[newPos]['order_id'] = 0;
                myItems[newPos]['order_id'] = myItems[newPos]['order_id'] * 1;
            }
        }
        myItems.sort(function(a, b) { return (a.order_id < b.order_id) ? 1 : ((b.order_id < a.order_id) ? -1 : 0); });

        for (var i = 0; i < myItems.length; i++) {
            var idNode = myItems[i]['key'];
            var showNode = true;
            var item = myItems[i];
            if (_system.isUndefined(item['sections_id'])) item['sections_id'] = "";
            if (_system.isNull(item['sections_id'])) {
                if (lang[idNode] === undefined) showNode = false;
            }
            if (nodeId == item['sections_id'] && showNode) {
                var subNodes = _section.createTreeItems(items, idNode, lang, level + 1);
                var actions = '\n\
                            <div class="pull-right section-status ' + (item['is_active'] ? "active" : "") + '">\n\
                                <i class="fa fa-circle section action active" sectionId="' + idNode + '" aria-hidden="true"></i>\n\
                            </div>\n\
                            <div class="pull-right section-mover">\n\
                                <i class="fa fa-arrow-circle-up section action up" sectionId="' + idNode + '" aria-hidden="true"></i>\n\
                                <i class="fa fa-arrow-circle-down section action down" sectionId="' + idNode + '" aria-hidden="true"></i>\n\
                            </div>\n\
                            <div class="pull-right section-actions">\n\
                                <button type="button" class="btn btn-success btn-sm section action modify" sectionId="' + idNode + '"><i class="fa fa-pencil" aria-hidden="true"></i> ' + _system.label('Edit') + '</button>\n\
                                <button type="button" class="btn btn-primary btn-sm section action add" sectionId="' + idNode + '"><i class="fa fa-plus" aria-hidden="true"></i> ' + _system.label('Add Section') + '</button>\n\
                                <button type="button" class="btn btn-danger btn-sm section action delete" sectionId="' + idNode + '"><i class="fa fa-trash-o" aria-hidden="true"></i> ' + _system.label('Delete') + '</button>\n\
                                <!--<button type="button" class="btn btn-warning btn-sm section action preview" custom-action="preview" sectionId="' + idNode + '"><i class="fa fa-eye" aria-hidden="true"></i> ' + _system.label('Preview') + '</button>-->\n\
                            </div>';
                if (nodeId == "") {
                    actions = '\n\
                            <div class="pull-right section-actions">\n\
                                <button type="button" class="btn btn-primary btn-sm section action add" idGroup="true" sectionId="' + idNode + '"><i class="fa fa-plus" aria-hidden="true"></i> ' + _system.label('Add Group') + '</button>\n\
                            </div>';
                }
                var label = (nodeId == "" ? lang[idNode] : item['section']) + actions;
                var icon = "fa fa-file";
                if (level == 0) icon = "fa fa-bars";
                //if (level == 1) icon = "fa fa-bars";
                if (item['is_reserved']) icon = "fa fa-lock";
                if (subNodes.length > 0) {
                    nodes.push({ text: label, icon: icon, selectable: false, nodes: subNodes });
                } else {
                    nodes.push({ text: label, icon: icon, selectable: false });
                }
            }
        }
        return nodes;
    },

}