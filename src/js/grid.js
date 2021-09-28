var _grid = {

    header: {},
    fields: {},
    data: {},
    action: {},
    id: null,

    table: function(id, structure, data) {

        this.id = id;
        this.data = data;

        this.header = structure.header;
        this.fields = structure.fields;
        this.action = structure.action;

        var htmlReturn = '<table id="' + id + '" class="table table-bordered table-striped">';
        htmlReturn += this.createHeader(this.header);
        htmlReturn += this.createBody(this.action, this.fields, this.data);
        htmlReturn += "</table>";
        return htmlReturn;
    },

    createHeader: function(header) {
        var htmlReturn = "<thead>";
        htmlReturn += "<tr>";
        htmlReturn += "<th>" + _system.label("Azioni") + "</th>";
        for (var i = 0; i < header.length; i++) {
            htmlReturn += "<th>" + _system.label(header[i]) + "</th>";
        }
        htmlReturn += "</tr>";
        htmlReturn += "</thead>";
        return htmlReturn;
    },

    createBody: function(action, fields, data) {
        var htmlReturn = "<tbody>";
        var htmlActions = "";
        if (action['edit']) htmlActions += "<i class='fa fa-2x fa-pencil grid action modify'></i>";
        if (action['delete']) htmlActions += "<i class='fa fa-2x fa-trash grid action delete'></i>";
        if (action['custom'] !== undefined) htmlActions += this.checkCustomActions(action['custom']);
        for (var i in data) {
            htmlReturn += "<tr indexdata='" + i + "' iddata='" + data[i]['__id'] + "'>";
            htmlReturn += "<td nowrap='nowrap'>" + htmlActions + "</td>";
            for (var j = 0; j < fields.length; j++) {
                var idCell = "tb-cell-" + data[i]['__id'] + "-" + j;
                var value = data[i][fields[j]['field']];
                if (fields[j]['field'].split("-").length == 2) {
                    try {
                        value = data[i][fields[j]['field'].split('-')[0]][fields[j]['field'].split('-')[1]];
                    } catch(e) {
                        value = "";
                    }
                } else if (fields[j]['field'].split("-").length == 3) {
                    //console.log(fields[j]['field'].split('-'));
                    try {
                        value = data[i][fields[j]['field'].split('-')[0]][fields[j]['field'].split('-')[1]][fields[j]['field'].split('-')[2]];
                    } catch(e) {
                        value = "";
                    }
                }
                htmlReturn += "<td id='" + idCell + "'>" + this.checkFieldType(fields[j]['field'], fields[j]['type'], value, fields[j]['services'], idCell) + "</td>";
            }
            htmlReturn += "</tr>";
        }
        htmlReturn += "</tbody>";
        return htmlReturn;
    },

    checkCustomActions: function(actions) {
        var htmlReturn = "";
        for (key in actions) {
            var action = actions[key];
            htmlReturn += "<i class='fa fa-2x fa-"+action['icon']+" grid action custom' custom-action='"+action['action']+"' style='color: "+action['color']+"' title=\""+action['label']+"\"></i>";
        }
        return htmlReturn;
    },

    checkFieldType: function(name, type, value, services, idCell) {
        value = $('<div/>').text(value).html().replace(/\n/g, "<br>");
        if (type == "check") {
            return "<i field=\"" + name + "\" class=\"fa fa-2x fa-check grid toggle check " + (value == true || value == "true" ? "on" : "") + "\"><span style=\"display:none\">" + (value == true || value == "true" ? "1" : "0") + "</span></i>";
            //return (value == "true" ? 1 : 0);
        } else if (type == "date") {
            return _system.dateStandard(_system.dateFromUnix(value));
        } else if (type == "email") {
            return "<a href='mailto:" +  value + "'>" + value + "</a>";
        } else if (type == "tag") {
            return _system.stringForTag(value);
        } else if (type == "time") {
            return _system.timeFromUnix(value);
        } else if (type == "datetime") {
            return _system.dateFromUnix(value) + " " + _system.timeFromUnix(value);
        } else if (type == "select") {
            _system.database.ref('/' + services['get'] + '/' + value + '/' + services['label']).once('value').then(function(data) {
                $("#" + idCell).text(data.val());
            });
            return "<span style='display:none'>"+value+"</span>...";
        } else {
            return (value !== undefined && value !== null ? value : "");
        }
        return;
    },

    exportDeprecated: function() {

        var exportCSVContent = '';
        var fieldsDate = [];
        //Header CSV
        var c = 0;
        for (i in this.data) {
            if (c == 0) {
                var value = this.data[i];
                for (j in value) {
                    fieldsDate[c] = "";
                    if (typeof(value[j]) === "object") {
                        for (k in value[j]) {
                            result = '"' + j + "_" + k + '"';
                            if (k == "created_at" || k == "updated_at") fieldsDate[c] = "date";
                            exportCSVContent += (c > 0 ? "," : "") + result;
                            c++;
                        }
                    } else {
                        result = '"' + j + '"';
                        if (j == "created_at" || j == "updated_at") fieldsDate[c] = "date";
                        exportCSVContent += (c > 0 ? "," : "") + result;
                        c++;
                    }
                }
                exportCSVContent += '\n';
            }
        }
        //Content CSV
        for (i in this.data) {
            var c = 0;
            var value = this.data[i];
            for (j in value) {
                if (typeof(value[j]) === "object") {
                    for (k in value[j]) {
                        var innerValue = value[j][k] === null ? '' : value[j][k].toString();
                        var result = innerValue.replace(/"/g, '""');
                        result = '"' + result + '"';
                        exportCSVContent += (c > 0 ? "," : "") + result;
                        c++;
                    }
                } else {
                    if (fieldsDate[c] == "date") value[j] = new Date(value[j]);
                    var innerValue = value[j] === null ? '' : value[j].toString();
                    var result = innerValue.replace(/"/g, '""');
                    result = '"' + result + '"';
                    exportCSVContent += (c > 0 ? "," : "") + result;
                    c++;
                }
            }
            exportCSVContent += '\n';
        }

        var csvFile = exportCSVContent;
        var filename = _grid.id + ".csv";

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

    },

    export: function() {
        if (_grid.id == "transactions")  {
            firebase.database().ref("users").once('value').then(function(data) {
                _grid.exportFile(data.val());
            });
        } else {
            this.exportFile();
        }
    },

    exportFile: function(users) {

        var dataExport = [];
        var fieldExport = [];
        var tabs = _dataForms[_grid.id].fields;
        var exportCSVContent = "";
        for (var i = 0; i < tabs.length; i++) {
            for (tab in tabs[i]) {
                var fields = tabs[i][tab];
                for (key in fields) {
                    var field = fields[key];
                    if (field['type'] !== undefined && field['type'] !== "collection")  {
                        var fieldName = field['id'];
                        var fieldLabel = field['label'];
                        if (_dataLabels['it'][fieldLabel] !== undefined) fieldLabel = _dataLabels['it'][fieldLabel];
                        dataExport.push(fieldLabel);
                        fieldExport.push(field);
                        exportCSVContent += (exportCSVContent == "" ? "" : ",")+'"'+fieldLabel.replace('"','\"')+'"';
                        //console.log(fieldName + ": " + fieldLabel);
                    }
                }
            }
        }
        fieldExport.push({id: "created_at", type: "date", label: "Created At"});
        exportCSVContent += ',"Creato il"\n';

        for (i in _grid.data) {
            var line = _grid.data[i];
            for (var c = 0; c < fieldExport.length; c++) {
                if (fieldExport[c]['type'] !== "collection") {
                    var value = _form.requireFieldVal(_grid.data, i, fieldExport[c]['id']) + "";
                    if (value === undefined) value = "";
                    if (fieldExport[c]['type'] ==  "date" && value !== undefined && value !== "") value = _system.dateFromUnix(value);
                    value = value.replace('"','\"');
                    exportCSVContent += (c == 0 ? "" : ",")+'"'+value+'"';
                }
            }
            exportCSVContent += '\n';
        }

        var csvFile = exportCSVContent;
        var filename = _grid.id + ".csv";

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

    },

    preview: function(object, id) {
        if (object == "articles") {
            window.open(_config.urlDomain+"/article.html?idA="+id+"&sID="+CryptoJS.SHA512(id).toString());
        } else if (object == "sections") {
            window.open(_config.urlDomain+"/section.html?idS="+id+"&sID="+CryptoJS.SHA512(id).toString());
        } else if (object == "projects") {
            window.open(_config.urlDomain+"/project.html?idP="+id+"&sID="+CryptoJS.SHA512(id).toString());
        }
    },

    pdf: function(id) {
        window.open(_config.apiCheck + "pdf/?idT="+id+"&sID="+CryptoJS.MD5("PDF"+id).toString());
    }

}
