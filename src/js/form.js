var _form = {

    title: null,
    fields: null,
    id: null,
    idLastEdit: null,
    indexLastEdit: null,
    initData: null,
    dataFields: null,
    timerShowMessageForm: null,

    create: function(id, initData) {
        this.id = id;
        this.initData = initData;
        this.setTitle(_dataForms[id].title.create);
        this.setType(id, "post");
        this.setResetPassword(false);
        this.setDelete(false);
        this.setRemimber(false);
        this.setDuplicate(false);
        this.setContent(this.generateFormInfo(_dataForms[id]['note'], "warning") + this.generateFormFieldsTabs(_dataForms[id].fields, 'insert', false, 1));
        this.show();
        _system.logAdmin(id, "", "OPEN");
    },

    modalEdit: function(id, idData, idGrid) {
        this.id = id;
        this.idLastEdit = idData;
        this.indexLastEdit = idGrid;
        this.setTitle(_dataForms[id].title.edit);
        this.setType(id, "put");
        if (_form.id == "transactions") {
            // this.setDelete(true, "_form.delete('" + _form.id + "','" + _form.idLastEdit + "')");
            // this.setRemimber(true);
            this.setDelete(false);
            this.setRemimber(false);
        } else {
            this.setDelete(false);
            this.setRemimber(false);
        }
        this.setResetPassword(false);
        this.setDuplicate(true);
        firebase.database().ref(id + "/" + idData).once('value').then(function(data) {
            _grid.data[idGrid] = data.val();
            _form.setContent(_form.generateFormInfo(_dataForms[id]['note'], "warning") + _form.generateFormFieldsTabs(_dataForms[id].fields, 'modify', false, 1));
            _form.checkFields();
        });
        this.show();
        _system.logAdmin(id, idData, "OPEN");
    },

    resetPassword: function() {
        if (confirm("Vuoi inviare un'email per il reset password a questo utente?")) {
            _system.auth.sendPasswordResetEmail($('.modal-body #email').val()).then(function(data) {
                alert("Email per il reset inviata correttamente!");
            }).catch(function(error) {
                alert("Si è verificato un problema in fase di invio. Contatta l'amministratore.");
            });
        }
    },

    checkFields: function() {
        if ($('#investor_type').length > 0) {
            $('#investor_type').change();
        }
        if (_form.id == "users") {
            $('.modal-body #email').attr("readonly", "readonly");
            $('.modal-body #password').val("").parents('.form-group').hide();
            // $('.modal-footer').prepend("<div class='clear'></div><button type='button' id='user-pass-reset' class='btn btn-success' style='float: left'>Reset della Password</button>");
        }
    },

    modalConfig: function(id, data) {
        this.id = id;
        this.idLastEdit = "";
        this.indexLastEdit = id;
        this.dataFields = data;
        this.setTitle(_dataForms[id].title.edit);
        this.setType(id, "put");
        this.setDelete(false);
        this.setRemimber(false);
        this.setDuplicate(false);
        this.setResetPassword(false);
        this.setContent(this.generateFormInfo(_dataForms[id]['note'], "warning") + this.generateFormFieldsTabs(_dataForms[id].fields, 'modify', true, 1));
        this.show();
        _system.logAdmin(id, idData, "CONFIG");
    },

    generateFormInfo: function(note, type) {
        if (note !== undefined) {
            if (note != "") {
                return "\n\
			  		<div class=\"alert alert-" + type + " alert-dismissible\">\n\
		                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n\
		                <h4><i class=\"icon fa fa-warning\"></i> " + _system.label("ehi...") + "!</h4>\n\
		                " + note + "\n\
		            </div>\n\
			  	";
            }
        }
        return "";
    },

    generateFormFieldsTabs: function(fields, typeForm, isConfig, level) {
        if (!_system.isUndefined(fields[0]['id'])) {
            return this.generateFormFields(fields, typeForm, isConfig);
        } else {
            var htmlReturn = "<div class='nav-tabs-custom level-" + level + "'>";
            var htmlReturnTab = "<ul class='nav nav-tabs'>";
            var htmlReturnTabContent = "<div class='tab-content'>";
            var index = 0;
            for (var i in fields) {
                for (var j in fields[i]) {
                    var prefix = CryptoJS.MD5(_system.label(j) + Math.random());
                    htmlReturnTab += "<li class='" + (index == 0 ? "active" : "") + "'><a href='#form_tab_" + prefix + "_" + level + "_" + index + "' data-toggle='tab' aria-expanded='true'>" + _system.label(j) + "</a></li>";
                    htmlReturnTabContent += "<div class='tab-pane " + (index == 0 ? "active" : "") + "' id='form_tab_" + prefix + "_" + level + "_" + index + "'>" + this.generateFormFields(fields[i][j], typeForm, isConfig) + "</div>";
                    if (level > 1) index++;
                }
                index++;
            }
            htmlReturnTabContent += "</div>";
            htmlReturnTab += "</ul>";
            htmlReturn += htmlReturnTab + htmlReturnTabContent + "</div>";
            return htmlReturn;
        }
    },

    requireFieldVal: function(data, index, id) {
        if (!_system.isNull(index)) {
            var value = data[index];
        } else {
            var value = data;
        }
        if (id.indexOf("-") >= 0) {
            var nodesNested = id.split("-");
            if (value[nodesNested[0]] === undefined) value[nodesNested[0]] = [];
            try {
                if (nodesNested.length == 3) {
                    if (value[nodesNested[0]][nodesNested[1]] === undefined) value[nodesNested[0]][nodesNested[1]] = [];
                    //console.log(value[nodesNested[0]][nodesNested[1]][nodesNested[2]]);
                    //if (nodesNested[0] !== undefined && nodesNested[1] !== undefined && nodesNested[3] !== undefined) {
                    if (value[nodesNested[0]][nodesNested[1]][nodesNested[2]] === undefined) {
                        return "";
                    } else {
                        return value[nodesNested[0]][nodesNested[1]][nodesNested[2]];
                    }
                    //} else {
                    //    return "";
                    //}
                }
                if (nodesNested.length == 2) {
                    if (value[nodesNested[0]] !== undefined) {
                        if (value[nodesNested[0]][nodesNested[1]] === undefined) {
                            return "";
                        } else {
                            return value[nodesNested[0]][nodesNested[1]];
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            if (value === undefined) {
                return "";
            } else {
                return value[id];
            }
        }
    },

    checkLabel: function(string) {
        string = string.replace("[IT]", "<div class='title-flag IT'></div>");
        string = string.replace("[EN]", "<div class='title-flag EN'></div>");
        string = string.replace("[FR]", "<div class='title-flag FR'></div>");
        string = string.replace("[DE]", "<div class='title-flag DE'></div>");
        string = string.replace("[ES]", "<div class='title-flag ES'></div>");
        return string;
    },

    generateFormFields: function(fields, typeForm, isConfig, collectionId, collectionIndex, collectionLength) {
        var htmlForm = "";
        if (collectionId === undefined) {
            this.fields = fields;
        }
        if (!_system.isUndefined(collectionId)) {
            var classCollection = "hide";
            if (typeForm == "insert" && collectionIndex == 0) classCollection = "";
            if ((typeForm == "modify" && !_system.isNull(this.requireFieldVal(_grid.data, this.indexLastEdit, (!_system.isUndefined(collectionId) ? collectionId + "-" : "") + (!_system.isUndefined(collectionIndex) ? collectionIndex + "-" : "") + fields[0]['id']))) || (typeForm == "modify" && collectionIndex == 0)) classCollection = "";
            htmlForm += '<div class="form-collection-group ' + classCollection + '"><div class="icon remove group"><i class="fa fa-trash doc remove" aria-hidden="true"></i></div>';
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (_system.isNull(field['id'])) {
                htmlForm += this.generateFormFieldsTabs([field], typeForm, isConfig, 2);
            } else {
                showMandatory = field['mandatory'];
                if (!_system.isUndefined(collectionId) && i == 0) {
                    showMandatory = true;
                }
                if (field['type'] != "collection") {
                    htmlForm += '<div class="form-group ' + (!_system.isUndefined(field['width']) ? "w-" + field['width'] : "") + '">';
                    htmlForm += (field['type'] != "check" && field['type'] != "hidden" ? '<label>' + this.checkLabel(_system.label(field['label'])) + ':' + (showMandatory ? " <span style='color:red'>[" + _system.label("Mandatory") + "]</span>" : "") + (field['key'] ? " <span style='color:green'>[" + _system.label("Key") + "]</span>" : "") + '</label>' : '');
                    htmlForm += '<div class="input-group">';
                } else {
                    htmlForm += '<div class="form-collection"><div>';
                }
                var myVal = "";
                if (typeForm == "modify") {
                    if (isConfig != true) {
                        myVal = this.requireFieldVal(_grid.data, this.indexLastEdit, (!_system.isUndefined(collectionId) ? collectionId + "-" : "") + (!_system.isUndefined(collectionIndex) ? collectionIndex + "-" : "") + field['id']);
                    } else {
                        myVal = this.requireFieldVal(this.dataFields, null, (!_system.isUndefined(collectionId) ? collectionId + "-" : "") + (!_system.isUndefined(collectionIndex) ? collectionIndex + "-" : "") + field['id']);
                    }
                } else if (typeForm == "insert" && this.initData !== undefined) {
                    if (this.initData[field['id']] !== undefined) {
                        myVal = this.initData[field['id']];
                    }
                }
                if (_system.isNull(myVal) || _system.isUndefined(myVal)) myVal = "";

                var fieldIdName = field['id'];
                if (collectionIndex !== undefined) fieldIdName = collectionIndex + "-" + fieldIdName;
                if (collectionId !== undefined) fieldIdName = collectionId + "-" + fieldIdName;

                //VARCHAR
                if (field['type'] == "varchar") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-font"></i></div><input autocomplete=\"false\" value="' + myVal + '" type="text" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '" iskey="' + (field['key'] !== undefined ? field['key'] : false) + '" >';
                }

                //NUMBER
                if (field['type'] == "number") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-list-ol"></i></div><input autocomplete=\"off\" value="' + myVal + '" type="number" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '" iskey="' + (field['key'] !== undefined ? field['key'] : false) + '" >';
                }

                //DURATION
                if (field['type'] == "duration") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-clock-o"></i></div><input autocomplete=\"off\" value="' + (myVal / 60 / 1000) + '" type="number" class="form-duration form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">';
                }

                //EURO
                if (field['type'] == "euro") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-eur"></i></div><input value="' + myVal + '" type="number" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">';
                }

                //PASSWORD
                if (field['type'] == "password") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-lock"></i></div><input autocomplete=\"false\" type="password" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">';
                }

                //TEL
                if (field['type'] == "tel") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-phone"></i></div><input value="' + myVal + '" type="text" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">';
                }

                //MAIL
                if (field['type'] == "mail") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-envelope-o"></i></div><input value="' + myVal + '" type="text" class="form-control pull-right" id="' + fieldIdName + '" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">';
                }

                //FILE
                if (field['type'] == "file") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-cloud-upload"></i></div><input type="hidden" id="' + fieldIdName + '" value="' + (myVal != "" ? myVal : "") + '" /><input type="file" upload="file" class="form-control pull-right image_uploader" id="' + fieldIdName + '_uploader" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">' + (myVal != "" ? "<div class='area-preview doc'><i class=\"fa fa-trash doc remove\" aria-hidden=\"true\"></i> <a href='" + myVal + "' target='_blank'><i class=\"fa fa-download\" aria-hidden=\"true\"></i> Download</a></div>" : "");
                }

                //IMAGE
                if (field['type'] == "image") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-cloud-upload"></i></div><input type="hidden" id="' + fieldIdName + '" value="' + (myVal != "" ? myVal : "") + '" /><input type="file" upload="image" accept=".jpg,.png,.gif" class="form-control pull-right file_uploader" id="' + fieldIdName + '_uploader" maxlength="' + (field['length'] > 0 ? field['length'] : "") + '">' + (myVal != "" ? "<div class='area-preview'><img src='" + myVal + "' class='preview' /><div class='icon remove'><i class='fa fa-trash' aria-hidden='true'></i></div></div>" : "");
                }

                //TEXTAREA
                if (field['type'] == "text") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-font"></i></div><textarea class="form-control pull-right" id="' + fieldIdName + '" rows="2">' + myVal + '</textarea>';
                }

                //TEXTAREA
                if (field['type'] == "bigtext") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-font"></i></div><textarea class="form-control pull-right" id="' + fieldIdName + '" rows="10">' + myVal + '</textarea>';
                }

                //HTML
                if (field['type'] == "html") {
                    htmlForm += '<textarea class="form-control pull-right html" style="width: 100%" id="' + fieldIdName + '" rows="5">' + myVal + '</textarea>';
                }

                //DATE
                if (field['type'] == "date") {
                    myVal = myVal + "";
                    if (myVal.indexOf("/") == -1 && !_system.isNull(myVal)) myVal = _system.dateFromUnix(myVal);
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-calendar"></i></div><input value="' + myVal + '" type="text" class="form-control pull-right datepicker-input" id="' + fieldIdName + '">';
                }

                //DATE RANGE
                if (field['type'] == "daterange") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-calendar"></i></div><input value="' + myVal + '" type="text" class="form-control pull-right datepicker-range-input" id="' + fieldIdName + '">';
                }

                //TIME
                if (field['type'] == "time") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-clock-o"></i></div><input value="' + _system.timeFromUnix(new Date(myVal).getTime()) + '" type="time" class="form-control pull-right" id="' + fieldIdName + '">';
                }

                //COLOR
                if (field['type'] == "color") {
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-paint-brush"></i></div><input value="' + myVal + '" type="text" class="form-control pull-right colorpicker-input" id="' + fieldIdName + '">';
                }

                //CHECK
                if (field['type'] == "check") {
                    htmlForm += '<input type="checkbox" ' + (myVal == true ? "checked" : "") + ' class="flat-red" id="' + fieldIdName + '"> ' + _system.label(field['label']);
                }

                //HIDDEN
                if (field['type'] == "hidden") {
                    htmlForm += '<input type="hidden" value="' + myVal + '" id="' + fieldIdName + '">';
                }

                //SELECT
                if (field['type'] == "select") {
                    var optionSelect = "";
                    var paramsSelect = "";
                    if (field['values'] !== undefined) {
                        optionSelect = "<option></option>";
                        for (var j = 0; j < field['values'].length; j++) optionSelect += "<option value='" + field['values'][j]['value'] + "' " + (myVal == field['values'][j]['value'] ? "selected" : "") + ">" + field['values'][j]['label'] + "</option>";
                    }
                    if (field['services'] !== undefined) {
                        if (field['services'] != "") {
                            paramsSelect = " serviceVal='" + myVal + "' serviceUrl='" + field['services']['get'] + "' serviceId='" + field['services']['id'] + "' serviceTitle='" + field['services']['label'] + "' ";
                        }
                    }
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-list"></i></div><select ' + paramsSelect + ' style="width: 100%" class="form-control pull-right select" id="' + fieldIdName + '">' + optionSelect + '</select>';
                }

                //SELECT
                if (field['type'] == "select_static") {
                    if (field['services'] !== undefined) {
                        if (field['services'] != "") {
                            paramsSelect = " serviceVal='" + myVal + "' serviceUrl='" + field['services']['get'] + "' serviceId='" + field['services']['id'] + "' serviceTitle='" + field['services']['label'] + "' ";
                            htmlForm += '<div class="input-group-addon"><i class="fa fa-lock"></i></div><input type="text" class="form-control pull-right" style="background: #eee" id="static-' + fieldIdName + '" /><input ' + paramsSelect + ' value="' + myVal + '" type="hidden" class="form-control pull-right select-static" id="' + fieldIdName + '">';
                        }
                    }
                }

                //MULTIPLE
                if (field['type'] == "multiple") {
                    var optionSelect = "";
                    for (var j = 0; j < field['values'].length; j++) optionSelect += "<option  " + (myVal == field['values'][j] ? "selected" : "") + ">" + field['values'][j] + "</option>";
                    htmlForm += '<div class="input-group-addon"><i class="fa fa-list"></i></div><select multiple style="width: 100%" class="form-control pull-right select-multiple" id="' + fieldIdName + '">' + optionSelect + '</select>';
                }

                //COLLECTION
                if (field['type'] == "collection") {
                    for (var c = 0; c < field['length']; c++) {
                        htmlForm += this.generateFormFields(field['fields'], typeForm, isConfig, field['id'], c, field['length']);
                    }
                }

                if (field['type'] == "collection" && field['length'] > 1) {
                    htmlForm += "<button type='button' class='btn btn-primary collection-add'><i class='fa fa-plus' aria-hidden='true'></i> " + _system.label("Add other...") + "</button>";
                }
                htmlForm += '</div></div>';
            }
        }
        if (!_system.isNull(collectionId)) {
            htmlForm += "<div class='clear'></div></div>";
        }
        return htmlForm + "<div class='clear'></div>";
    },

    setContent: function(content) {
        $('#formModal .modal-body').html(content);
        $('.colorpicker-input').colorpicker();
        $('textarea.html').froalaEditor({
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontSize', 'color', 'paragraphFormat', '|', 'formatOL', 'formatUL', '|', 'align', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertVideo', 'insertTable', 'insertHR', '|', 'clearFormatting', 'html', '|', 'undo', 'redo'],
            imageMaxSize: 1 * 1024 * 1024,
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            videoMaxSize: 20 * 1024 * 1024,
            toolbarSticky: false,
            colorsHEXInput: true
        }).on('froalaEditor.image.beforeUpload', function(e, editor, images) {
            var storageRef = firebase.storage().ref(Number(new Date()).toString());
            var ext = images[0]['name'].toLowerCase().split(".");
            ext = ext[ext.length - 1];
            console.log("Original image: ", images[0].size);
            var uploadTask;
            var options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            var resolveFile = function(file) {
                uploadTask = storageRef.put(file);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {}, function(error) {}, function() {
                    editor.image.insert(uploadTask.snapshot.downloadURL);
                });
            }
            if (ext !== 'jpg' && ext !== 'png') {
                resolveFile(images[0]).then(function(noImageFile) {
                    return noImageFile;
                });
            } else {
                imageCompression(images[0], options)
                    .then(function(compressedFile) {
                        console.log("compressedFile: ", compressedFile.size);
                        resolveFile(compressedFile);
                    })
            }

            return false;
        }).on('froalaEditor.video.beforeUpload', function(e, editor, videos) {
            var storageRef = firebase.storage().ref(Number(new Date()).toString());
            var uploadTask = storageRef.put(videos[0]);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {}, function(error) {}, function() {
                editor.video.insert("<video src='" + uploadTask.snapshot.downloadURL + "' width='480' height='320' controls>");
            });
            return false;
        });

        $('.datepicker-range-input').daterangepicker({
            locale: {
                format: 'DD/MM/YYYY'
            },
            autoclose: true
        });
        $('.datepicker-input').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        $('.timepicker-input').timepicker({
            timeFormat: 'HH:mm',
            showInputs: true
        });
        $('.select-multiple').select2();
        this.checkSelectServices();
        this.checkSelectStatic();
    },

    checkSelectServices: function() {
        $('select[serviceUrl]').each(function() {
            var idSelect = $(this).attr('id');
            var url = $(this).attr("serviceUrl");
            var fieldId = $(this).attr("serviceId");
            var fieldTitle = $(this).attr("serviceTitle");
            var myVal = $(this).attr("serviceVal");
            if (idSelect == "project_parent_id") {
                _form.initSelectProjectsActive(idSelect, url, fieldId, fieldTitle, myVal);
            } else {
                _form.initSelectServices(idSelect, url, fieldId, fieldTitle, myVal);
            }
        });
    },

    initSelectServices: function(idSelect, url, fieldId, fieldTitle, myVal) {
        $('#' + idSelect).html("<option value=''>Loading...</option>");
        _system.database.ref('/' + url + '/').once('value').then(function(data) {
            var items = data.val();
            $('#' + idSelect).html("<option></option>");

            if (idSelect == "sections_id" && fieldId == "sections_articles") {
                $('#' + idSelect).append(_form.createSelectSectionArticles(items, myVal, '', 0));
            } else if (idSelect == "sections_id") {
                $('#' + idSelect).append(_form.createSelectSection(items, myVal, '', 0));
            } else {
                if (url == "users") {
                    var users = [];
                    fieldId = "__id";
                    for (key in items) {
                        var user = items[key];
                        user['__id'] = key;
                        user['name'] = (items[key]['lastname'] + " " + items[key]['firstname']).toUpperCase();
                        //console.log(user);
                        users.push(user);
                    }
                    users.sort(function(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                    items = users;
                }

                for (var i in items) {
                    if (url == "users") {
                        var label = items[i]['name'] + " (" + items[i]['email'] + ")";
                        var value = items[i]['__id'];
                    } else {
                        var label = items[i][fieldTitle];
                        if (fieldTitle.indexOf("-") > 0) {
                            label = items[i][fieldTitle.split("-")[0]][fieldTitle.split("-")[1]];
                        }
                        var value = items[i][fieldId];
                    }
                    if (fieldId.indexOf("-") > 0) {
                        value = items[i][fieldId.split("-")[0]][fieldId.split("-")[1]];
                    }
                    $('#' + idSelect).append("<option value='" + (_system.isNull(fieldId) ? i : value) + "' " + (myVal == (_system.isNull(fieldId) ? i : value) ? "selected" : "") + ">" + label + "</option>")
                }
            }
        });
    },

    checkSelectStatic: function() {
        $('.select-static').each(function() {
            var idSelect = $(this).attr('id');
            var url = $(this).attr("serviceUrl");
            var fieldId = $(this).attr("serviceId");
            var fieldTitle = $(this).attr("serviceTitle");
            var myVal = $(this).attr("serviceVal");
            _form.initSelectStatic(idSelect, url, fieldId, fieldTitle, myVal);
        });
    },

    initSelectStatic: function(idSelect, url, fieldId, fieldTitle, myVal) {
        $('#static-' + idSelect).val("Loading...");
        _system.database.ref('/' + url + '/' + myVal).once('value').then(function(data) {
            var item = data.val();
            $('#' + idSelect).html("<option></option>");

            if (url == "users") {
                $('#static-' + idSelect).val((item['lastname'] + " " + item['firstname']).toUpperCase() + " (" + item['email'] + ")");
            } else {
                //(item, fieldTitle);
                if (fieldTitle.indexOf("-") > 0) {
                    var value = item[fieldTitle.split("-")[0]][fieldTitle.split("-")[1]];
                } else {
                    value = item[fieldId];
                }
                $('#static-' + idSelect).val(value);
            }

        });
    },

    initSelectProjectsActive: function(idSelect, url, fieldId, fieldTitle, myVal) {
        $('#' + idSelect).html("<option value=''>Loading...</option>");
        _system.database.ref('/' + url + '/').orderByChild("is_active").equalTo(true).once('value').then(function(data) {
            var items = data.val();
            $('#' + idSelect).html("<option></option>");
            for (var i in items) {
                var label = items[i][fieldTitle];
                if (fieldTitle.indexOf("-") > 0) {
                    label = items[i][fieldTitle.split("-")[0]][fieldTitle.split("-")[1]];
                }
                var value = items[i][fieldId];
                if (fieldId.indexOf("-") > 0) {
                    value = items[i][fieldId.split("-")[0]][fieldId.split("-")[1]];
                }
                $('#' + idSelect).append("<option value='" + (_system.isNull(fieldId) ? i : value) + "' " + (myVal == (_system.isNull(fieldId) ? i : value) ? "selected" : "") + ">" + label + "</option>")
            }
        });
    },

    createSelectSection: function(items, myVal, idSectionOf, level) {
        var htmlReturn = "";
        for (var i in items) {
            var item = items[i];
            if ((item['sections_id'] == idSectionOf) || (idSectionOf == "" && item['sections_id'] === undefined)) {
                var levelString = "";
                for (j = 0; j < level; j++) levelString += "---";
                htmlReturn += "<option value='" + i + "' " + (myVal == i ? "selected" : "") + ">" + levelString + item['section'] + "</option>";
                htmlReturn += this.createSelectSection(items, myVal, i, level + 1);
            }
        }
        return htmlReturn;
    },

    createSelectSectionArticles: function(items, myVal, idSectionOf, level) {
        var htmlReturn = "";
        for (var i in items) {
            var item = items[i];
            if ((item['sections_id'] == idSectionOf) || (idSectionOf == "" && item['sections_id'] === undefined)) {
                var levelString = "";
                if (item['is_articles'] == true || item['sections_id'] === undefined) {
                    for (j = 0; j < level; j++) levelString += "---";
                    htmlReturn += "<option value='" + i + "' " + (myVal == i ? "selected" : "") + ">" + levelString + item['section'] + "</option>";
                }
                htmlReturn += this.createSelectSectionArticles(items, myVal, i, level + 1);
            }
        }
        return htmlReturn;
    },

    setTitle: function(title) {
        this.title = title;
        $('#formModal .modal-title').text(title);
    },

    setType: function(id, type) {
        $('#formModal').attr("form", id);
        $('#formModal').attr("type", type);
    },

    setResetPassword: function(status) {
        if (status == true) {
            $('#formModal #user-pass-reset').show();
        } else {
            $('#formModal #user-pass-reset').hide();
        }
    },

    setDelete: function(status, action) {
        if (status == true) {
            $('#formModal .btn-danger').show();
        } else {
            $('#formModal .btn-danger').hide();
        }
        if (action !== undefined) {
            $('#formModal .btn-danger').attr("onclick", action);
        }
    },

    setRemimber: function(status) {
        if (status == true) {
            $('#formModal .btn-remimber').show();
        } else {
            $('#formModal .btn-remimber').hide();
        }
    },

    setDuplicate: function(status, action) {
        if (status == true) {
            $('#formModal .btn-info').show();
        } else {
            $('#formModal .btn-info').hide();
        }
        if (action !== undefined) {
            $('#formModal .btn-info').attr("onclick", action);
        }
    },

    show: function() {
        $("#formModal").modal();
    },

    check: function(resourse, indexGrid, field, id, status) {
        if (status != true && status != false) return;
        if (resourse === undefined || id === undefined || field === undefined) return;
        if (resourse === null || id === null || field === null) return;
        if (resourse === "" || id === "" || field === "") return;
        if (firebase.auth().currentUser === null || _config.admin === null) return;

        _system.database.ref(resourse + '/' + id + '/' + field).set(status);
        if (_grid.data[id] !== undefined) _grid.data[id][field] = status;
        _system.logAdmin(resourse, id, "CHECK");
    },

    delete: function(resourse, id) {
        if (resourse === undefined || resourse === null || resourse == "") return;
        if (id === undefined || id === null || id == "") return;
        if (firebase.auth().currentUser === null || _config.admin === null) return;
        if (confirm("Sicuro di voler procedere alla cancellazione?")) {
            _system.database.ref(resourse + '/' + id).remove(function() {
                if (resourse == "sections") {
                    _section.sections();
                }
                if (resourse == "transactions") {
                    _form.saveCallback();
                }
            });
            _system.logAdmin(resourse, id, "DELETE");
        }
    },

    remimberTransaction: function() {
        if (firebase.auth().currentUser === null || _config.admin === null) return;
        if (confirm("Sicuro di voler procedere all'invio del sollecito?")) {
            _system.database.ref('transactions/' + _form.idLastEdit).once('value').then(function(data) {
                var transaction = data.val();
                _system.database.ref('configs').once('value').then(function(data) {
                    var config = data.val();
                    _system.database.ref('mails/reminderPendingInv').once('value').then(function(data) {
                        var mail = data.val();
                        //console.log(mail);
                        //console.log(transaction);
                        var oMail = {
                            title: mail.title.it,
                            message: mail.message.it,
                        }
                        var daysBack = _system.dateDayDiff(transaction.created_at) * -1;
                        if (daysBack > 14) {
                            oMail.message = oMail.message.replace("{firstname}", transaction.user.firstname);
                            oMail.message = oMail.message.replace("{lastname}", transaction.user.lastname);
                            oMail.message = oMail.message.replace("{email}", transaction.user.email);
                            oMail.message = oMail.message.replace("{title}", transaction.project.title);
                            oMail.message = oMail.message.replace("{amount}", transaction.amount);
                            oMail.message = oMail.message.replace("{days_custom}", daysBack - 14);
                            oMail.message = oMail.message.replace("{link}", _config.apiCheck + "pdf/?idT=" + _form.idLastEdit + "&sID=" + CryptoJS.MD5("PDF" + _form.idLastEdit).toString());

                            oMail.message = config.mail.template.replace("{content}", oMail.message);
                            oMail.message = oMail.message.replace("{logo}", config.logo);

                            $.ajax({
                                type: 'POST',
                                url: _config.apiCheck + "mail/index.php",
                                data: {
                                    email: transaction.user.email,
                                    title: oMail.title,
                                    object: oMail.message,
                                    sid: "d9saj09dkj8qunij3mrqpf4w0av89u8yandi4jSDAF4rqdeij891DAdqf.123deafa024p5tmgb"
                                },
                                success: function(data) {
                                    //console.log(data);   
                                    _system.database.ref('transactions/' + _form.idLastEdit + "/reminders").once('value').then(function(data) {
                                        var reminders = data.val();
                                        var tot = 0;
                                        for (key in reminders) tot++;
                                        _system.database.ref('transactions/' + _form.idLastEdit + "/reminders/" + (tot)).set({
                                            "email": transaction.user.email,
                                            "date": new Date().getTime()
                                        }).then(function(data) {
                                            $('#formModal').modal("hide");
                                            alert("Sollecito inviato!");
                                        });
                                    });
                                }
                            });
                        } else {
                            alert("Attenzione! Non sono ancora passagi 14 giorni dall'investimento");
                        }
                    });
                });
            })
        }
    },

    duplicate: function() {
        $('#formModal').attr("type", "post");
        this.save();
    },

    save: function() {
        var typeOperation = $('#formModal').attr("type");
        var data = this.saveGenerateDataArray(this.saveGenerateFieldsArray(), typeOperation);
        if (data) {
            if (_dataForms[_form.id] !== undefined) {
                data = _form.addFieldUpdate(typeOperation, data);
                _form.saveData(typeOperation, data);
            }
        } else {
            this.showMessage("errorAllFields");
        }
    },

    saveData: function(typeOperation, data) {
        if (_form.id == "users") {
            _form.saveUser(typeOperation, data);
        } else {
            _form.saveOnServer(typeOperation, data);
        }
    },

    saveUser: function(typeOperation, data) {
        if (firebase.auth().currentUser === null || _config.admin === null) return;
        if (typeOperation == "post") {
            _system.auth.createUserWithEmailAndPassword(data.email, data.password).then(function(userRecord) {
                _system.log("Successfully created new user");
                data.password = "";
                _form.saveOnServer(typeOperation, data, userRecord.uid);
            }).catch(function(error) {
                _system.log(error);
                _form.showMessage("errorSaveUser");
                return false;
            });
        } else if (typeOperation == "put") {
            /*
            if (data.password != "") {
                _system.auth.sendPasswordResetEmail(data.email).then(function(userRecord) {
                    _system.log("Successfully update pass user");
                    data.password = "";
                    _form.saveOnServer(typeOperation, data);
                }).catch(function(error) {
                    _system.log(error);
                    _form.showMessage("errorSaveUser");
                    return false;
                });
            } else {
            */
            _form.saveOnServer(typeOperation, data);
            //}
        } else {
            this.showMessage("errorGeneralSaveData");
            return false;
        }
    },



    saveOnServer: function(typeOperation, data, id) {
        if (firebase.auth().currentUser === null || _config.admin === null) return;
        var idRecord = (id === undefined ? _form.createOrRequestRecordId(typeOperation) : id);
        if ($('input[iskey="true"]').length) idRecord = $('input[iskey="true"]').val();
        console.log(data);
        if (typeOperation == "post" || typeOperation == "put") {
            _system.database.ref(_form.id + '/' + idRecord).set(data);
            _form.saveCallback();

            _system.logAdmin(_form.id, idRecord, typeOperation.toUpperCase());
        }
        //} else if (typeOperation == "put") {
        //    _system.database.ref(_form.id + '/' + idRecord).update(data);
        //}
    },

    addFieldUpdate: function(typeOperation, data) {
        var now = new Date().getTime();
        data['updated_at'] = now;
        if (typeOperation == "post") {
            data['created_at'] = now;
            data['system_logs'] = {};
        } else if (typeOperation == "put") {
            var latest = _form.requireFieldVal(_grid.data, _form.indexLastEdit, "created_at");
            data['created_at'] = (latest === undefined ? now : latest);
        }
        return data;
    },

    checkInitNode: function(dataCheck) {
        /*
        if (_system.isNull(dataCheck.val())) {
            _system.database.ref(_form.id).set("");
        }
        */
    },

    createOrRequestRecordId: function(typeOperation) {
        if (typeOperation == "put") {
            var newPostKey = _form.idLastEdit;
        } else if (typeOperation == "post") {
            //var newPostKey = _system.database.ref().child(_form.id).push().key;
            var newPostKey = _system.key((_form.id == "sections" ? "asc" : ""));
        }
        return newPostKey;
    },

    latLonFromAddress: function(address, city, country, callback, callbackError) {
        if (country === null) country = "Italy";
        geocoder = new google.maps.Geocoder(),
            geocoder.geocode({
                'address': address + ", " + city
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lon = results[0].geometry.location.lng();
                    callback({ lat: lat, lon: lon });
                } else {
                    callbackError();
                }
            });
    },

    saveCallback: function() {
        $('#formModal').modal('hide');
        if (_form.id == "sections") {
            _section.sections();
        } else {
            if (_section.gridFilters[_form.id] !== undefined) {
                if (_section.gridFilters[_form.id]['filterField'] != null) {
                    _section.grid(_form.id, _section.gridFilters[_form.id]['filterField'], _section.gridFilters[_form.id]['filterValue']);
                    return;
                } else if (_section.gridFilters[_form.id]['limit'] != null) {
                    _section.grid(_form.id, null, null, _section.gridFilters[_form.id]['limit']);
                    return;
                }
            }
            _section.grid(_form.id);
        }
        return;
    },

    saveGenerateFieldsArray: function() {
        var fields = [];
        //if (!_system.isNull(_dataForms[_form.id].fields[0]['id'])) {
        //    fields = _dataForms[_form.id].fields;
        //} else {
        for (j in _dataForms[_form.id].fields) {
            if (_system.isUndefined(_dataForms[_form.id].fields[j]['id'])) {
                for (index in _dataForms[_form.id].fields[j]) {
                    for (i in _dataForms[_form.id].fields[j][index]) {
                        if (_system.isUndefined(_dataForms[_form.id].fields[j][index][i]['id'])) {
                            for (k in _dataForms[_form.id].fields[j][index][i]) {
                                if (_system.isUndefined(_dataForms[_form.id].fields[j][index][i][k]['id'])) {
                                    for (z in _dataForms[_form.id].fields[j][index][i][k]) {
                                        fields.push(_dataForms[_form.id].fields[j][index][i][k][z]);
                                    }
                                } else {
                                    fields.push(_dataForms[_form.id].fields[j][index][i][k]);
                                }
                            }
                        } else {
                            fields.push(_dataForms[_form.id].fields[j][index][i]);
                        }
                    }
                }
            } else {
                fields.push(_dataForms[_form.id].fields[j]);
            }

        }
        //}
        var fieldsFromCollections = [];
        var totFields = fields.length;
        for (var f = 0; f < totFields; f++) {
            if (fields[f]['type'] == "collection") {
                var prefix = fields[f]['id'];
                var indextoSave = 0;
                for (var j = 0; j < fields[f]['length']; j++) {
                    for (var k = 0; k < fields[f]['fields'].length; k++) {
                        if ($("#" + prefix + "-" + j + "-" + fields[f]['fields'][0]['id']).val() != "") {
                            var newId = fields[f]['fields'][k]['id'];
                            var newField = JSON.stringify(fields[f]['fields'][k]);
                            newField = JSON.parse(newField);
                            newField['id'] = prefix + "-" + j + "-" + newId;
                            newField['id_save_forced'] = prefix + "-" + indextoSave + "-" + newId;
                            fieldsFromCollections.push(newField);
                        }
                    }
                    if ($("#" + prefix + "-" + j + "-" + fields[f]['fields'][0]['id']).val() != "") {
                        indextoSave++;
                    }
                }
            }
        }
        fields = fields.concat(fieldsFromCollections);
        return fields;
    },

    saveGenerateDataArray: function(fields, typeOperation) {
        var data = [];
        var mandatoryError = false;
        for (var i in fields) {
            var field = fields[i];
            var id = field.id;
            var idToSave = (field.id_save_forced !== undefined ? field.id_save_forced : null);
            var value = $('#' + id).val();

            var sendData = true;
            //if (field.type == "html") value = CKEDITOR.instances[id].getData();
            if (field.type == "check") value = ($('#' + id).is(":checked") ? true : false);
            if (field.type == "time" && value != "") value = $('#' + id).val().split(":")[0] * 60 * 60 * 1000 + $('#' + id).val().split(":")[1] * 60 * 1000;
            if (field.type == "date" && value != "") value = _system.dateToEpoch(_system.dateStandard(value) + " 12:00");
            if (field.type == "duration" && value != "") value = $('#' + id).val().split(":") * 60 * 1000;
            if (field.type == "password" && typeOperation == "put" && value == "") value = _form.requireFieldVal(_grid.data, _form.indexLastEdit, "password");
            if (field.type == "password" && typeOperation == "put" && value != "") value = CryptoJS.SHA512(value).toString();
            //if (field.type == "password" && typeOperation == "post") value = CryptoJS.SHA512(value).toString();
            if (field.type == "collection") sendData = false;

            var mandatory = field.mandatory;
            if (mandatory && value == "") mandatoryError = true;
            if (sendData == true) {
                if (idToSave != null) id = idToSave;
                if (id.indexOf('-') >= 0) {
                    var nestedName = id.split("-");
                    if (nestedName.length == 2) {
                        if (data[nestedName[0]] === undefined) data[nestedName[0]] = [];
                        data[nestedName[0]][nestedName[1]] = value;
                    }
                    if (nestedName.length == 3) {
                        if (data[nestedName[0]] === undefined) data[nestedName[0]] = [];
                        if (data[nestedName[0]][nestedName[1]] === undefined) data[nestedName[0]][nestedName[1]] = [];
                        data[nestedName[0]][nestedName[1]][nestedName[2]] = value;
                    }
                } else {
                    data[id] = value;
                }
            }
        }
        if (mandatoryError) {
            return false;
        } else {
            return data;
        }
    },

    showMessage: function(msgCode) {
        clearTimeout(this.timerShowMessageForm);
        $('#formModal .alert').html(_system.msgCode(msgCode)).removeClass("hide");
        this.timerShowMessageForm = setTimeout(function() {
            $('#formModal .alert').addClass("hide");
        }, 5000);
    }

}