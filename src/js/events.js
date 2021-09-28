$(document).ready(function() {
    _auth.init();
    _system.interface();
});

$(document).on("click", "a", function() {
    var action = $(this).attr("action");
    if (action !== undefined && action != "#") {
        eval(action);
    }
});

$(document).on("click", ".grid.toggle", function() {
    _form.check($(this).parents("table").attr("id"), $(this).parents("indexData").attr("id"), $(this).attr("field"), $(this).parents("tr").attr("iddata"), ($(this).hasClass('on') ? false : true));
    $(this).toggleClass("on");
});

$(document).on("click", ".grid.action.custom", function() {
    var action = $(this).attr("custom-action");
    var id = $(this).parents("tr").attr("iddata");
    var index = $(this).parents("tr").attr("indexdata");
    if (action == "preview") {
        _grid.preview(_grid.id, id);
    } else if (action == "transactions") {
        _section.grid('transactions', 'projects_id', id);
    } else if (action == "payout") {
        _section.payout(id);
    } else if (action == "transactions-user") {
        _section.grid('transactions', 'users_id', id);
    } else if (action == "mifids-user") {
        _section.grid('mifids', 'users_id', id);
    } else if (action == "mifids-investments") {
        _section.grid('mifids', 'users_id', _grid.data[index].users_id);
    } else if (action == "logs-user") {
        _section.grid('logs/actions', 'users_id', id);
    } else if (action == "transactions-pdf") {
        _grid.pdf(id);
    }
    return false;
});

$(document).on("click", ".section.action.preview", function() {
    var id = $(this).attr("sectionId");
    _grid.preview("sections", id);
    return false;
});

$(document).on("click", ".grid.action.delete", function() {
    if (confirm(_system.msgCode("confirmDelete"))) {
        _form.delete($(this).parents("table").attr("id"), $(this).parents("tr").attr("iddata"));
        $(this).parents("tr").hide();
    }
    return false;
});

$(document).on("click", "#user-pass-reset", function() {
    _form.resetPassword();
});

$(document).on("click", ".section.action.delete", function() {
    if (confirm(_system.msgCode("confirmDelete"))) {
        _form.delete("sections", $(this).attr("sectionId"));
    }
    return false;
});

$(document).on("click", ".grid.action.modify", function() {
    _form.modalEdit($(this).parents("table").attr("id"), $(this).parents("tr").attr("iddata"), $(this).parents("tr").attr("indexdata"));
    return false;
});

$(document).on("click", ".section.action.modify", function() {
    _form.modalEdit("sections", $(this).attr("sectionId"), $(this).attr("sectionId"));
    return false;
});

$(document).on("click", "button.add", function() {
    if ($(this).attr('form') !== undefined) {
        _form.create($(this).attr('form'));
    }
});

$(document).on("click", "button.export", function() {
    _grid.export();
});

$(document).on("click", ".section.action.add", function() {
    var sectionId = $(this).attr("sectionId");
    var dataInit = {};
    if (!_system.isNull(sectionId)) dataInit = {
        sections_id: sectionId
    };
    _form.create("sections", dataInit);
    return false;
});

$(document).on("change", ".file_uploader, .image_uploader", function(objEvent) {
    var timestamp = Number(new Date());
    var storageRef = firebase.storage().ref(timestamp.toString());
    var file_data = $(this).prop('files')[0];
    var ext = file_data['name'].toLowerCase().split(".");
    ext = ext[ext.length - 1];

    /**
     * testing upload e risize image
     */
    var uploadTask;
    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };
    var _this = $(this);
    var resolveFile = function(file) {
        console.log('FILE: ', file);
        uploadTask = storageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                _system.log('Upload change state: ' + snapshot.state);
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        _system.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        _system.log('Upload is running');
                        break;
                }
            },
            function(error) {
                _this.parents(".input-group").find("i").removeClass("fa-spinner").removeClass("fa-spin");
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                _this.parents(".input-group").find("i").removeClass("fa-spinner").removeClass("fa-spin");
                var downloadURL = uploadTask.snapshot.downloadURL;
                _system.log(downloadURL);
                _this.parents('.input-group').find('input[type="hidden"]').val(downloadURL);
                if (_this.attr("upload").indexOf("image") >= 0) {
                    if (_this.parents('.input-group').find('img').length >= 1) {
                        _this.parents('.input-group').find('img').attr("src", downloadURL);
                    } else {
                        _this.parents('.input-group').append("<div class='area-preview'><img class='preview' src='" + downloadURL + "' /><div class='icon remove'><i class='fa fa-trash' aria-hidden='true'></i></div></div>");
                    }
                } else {
                    var htmlPreview = "<div class='area-preview doc'><i class=\"fa fa-trash doc remove\" aria-hidden=\"true\"></i> <a href='" + downloadURL + "' target='_blank'><i class=\"fa fa-download\" aria-hidden=\"true\"></i> Download</a></div>";
                    _this.parents('.input-group').find('.area-preview').remove();
                    _this.parents('.input-group').append(htmlPreview);
                }
            });
    }
    if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png') {
        resolveFile(file_data).then(function(noImageFile) {
            console.log('FILE 1 SIZE: ', noImageFile.size);
            return noImageFile;
        });
    } else {
        imageCompression(file_data, options)
            .then(function(compressedFile) {
                console.log('FILE 2 SIZE: ', compressedFile.size);
                resolveFile(compressedFile);
            })
    }

});

// $(document).on("change", ".file_uploader, .image_uploader", function(objEvent) {

//     var timestamp = Number(new Date());
//     var file_data = $(this).prop('files')[0];
//     var ext = file_data['name'].toLowerCase().split(".");
//     ext = ext[ext.length - 1];
//     var name = timestamp.toString() + (file_data['name'].indexOf(".") > 0 ? "." + ext : "");
//     var storageRef = firebase.storage().ref(name);
//     var uploadTask = storageRef.put(file_data);
//     var _this = $(this);

//     _this.parents(".input-group").find("i").addClass("fa-spinner").addClass("fa-spin");

//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//         function(snapshot) {
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             _system.log('Upload change state: ' + snapshot.state);
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED: // or 'paused'
//                     _system.log('Upload is paused');
//                     break;
//                 case firebase.storage.TaskState.RUNNING: // or 'running'
//                     _system.log('Upload is running');
//                     break;
//             }
//         },
//         function(error) {
//             _this.parents(".input-group").find("i").removeClass("fa-spinner").removeClass("fa-spin");
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     // User doesn't have permission to access the object
//                     break;
//                 case 'storage/canceled':
//                     // User canceled the upload
//                     break;
//                 case 'storage/unknown':
//                     // Unknown error occurred, inspect error.serverResponse
//                     break;
//             }
//         },
//         function() {
//             // Upload completed successfully, now we can get the download URL
//             _this.parents(".input-group").find("i").removeClass("fa-spinner").removeClass("fa-spin");
//             var downloadURL = uploadTask.snapshot.downloadURL;
//             _system.log(downloadURL);
//             _this.parents('.input-group').find('input[type="hidden"]').val(downloadURL);
//             if (_this.attr("upload").indexOf("image") >= 0) {
//                 if (_this.parents('.input-group').find('img').length >= 1) {
//                     _this.parents('.input-group').find('img').attr("src", downloadURL);
//                 } else {
//                     _this.parents('.input-group').append("<div class='area-preview'><img class='preview' src='" + downloadURL + "' /><div class='icon remove'><i class='fa fa-trash' aria-hidden='true'></i></div></div>");
//                 }
//             } else {
//                 var htmlPreview = "<div class='area-preview doc'><i class=\"fa fa-trash doc remove\" aria-hidden=\"true\"></i> <a href='" + downloadURL + "' target='_blank'><i class=\"fa fa-download\" aria-hidden=\"true\"></i> Download</a></div>";
//                 _this.parents('.input-group').find('.area-preview').remove();
//                 _this.parents('.input-group').append(htmlPreview);
//             }
//         });
// });

$(document).on("click", ".area-preview .remove", function() {
    $(this).parents(".input-group").find('input[type="hidden"]').val("");
    $(this).parents(".area-preview").remove();
});

$(document).on("click", ".form-collection-group  .remove.group", function() {
    $(this).parents(".form-collection-group").find("input, select, textarea").val("");
    $(this).parents(".form-collection-group").hide();
});

$(document).on("click", ".action.active", function(e) {
    var sectionId = $(this).attr("sectionId");
    var node = $(this).parents(".section-status");
    var dataNodeId = $(this).parents(".list-group-item").attr("data-nodeid");
    if (node.hasClass("active")) {
        var value = false;
        $('.list-group-item[data-nodeid="' + dataNodeId + '"] .section-status').removeClass("active")
    } else {
        var value = true;
        $('.list-group-item[data-nodeid="' + dataNodeId + '"] .section-status').addClass("active");
    }
    _form.check("sections", null, "is_active", sectionId, value);
    _section.sections();
    e.preventDefault();
    return false;
});

$(document).on("click", ".action.up, .action.down", function(e) {
    var sectionId = $(this).attr("sectionId");
    var sectionOf = _section.tree[sectionId]['sections_id'];
    var orderId = (_section.tree[sectionId]['order_id'] == undefined ? 0 : _section.tree[sectionId]['order_id']);
    var groupSection = [];
    for (key in _section.tree) {
        if (_section.tree[key]['sections_id'] == sectionOf) {
            groupSection.push({ key: key, section: _section.tree[key]['section'], order_id: (_section.tree[key]['order_id'] === undefined ? 0 : _section.tree[key]['order_id'] * 1) });
        }
    }
    groupSection.sort(function(a, b) { return (a.order_id < b.order_id) ? 1 : ((b.order_id < a.order_id) ? -1 : 0); });
    var mySectionIndex = 0;
    for (var i = 0; i < groupSection.length; i++) {
        groupSection[i]['order_id'] = groupSection.length - i;
        if (groupSection[i]['key'] == sectionId) mySectionIndex = i;
    }
    if ($(this).hasClass("up")) {
        if (mySectionIndex > 0) {
            var tempOrderId = groupSection[mySectionIndex]['order_id'];
            groupSection[mySectionIndex]['order_id'] = groupSection[mySectionIndex - 1]['order_id'];
            groupSection[mySectionIndex - 1]['order_id'] = tempOrderId;
        } else {
            return false;
        }
    } else if ($(this).hasClass("down")) {
        if (mySectionIndex < groupSection.length - 1) {
            var tempOrderId = groupSection[mySectionIndex]['order_id'];
            groupSection[mySectionIndex]['order_id'] = groupSection[mySectionIndex + 1]['order_id'];
            groupSection[mySectionIndex + 1]['order_id'] = tempOrderId;
        } else {
            return false;
        }
    } else {
        return false;
    }
    for (var i = 0; i < groupSection.length; i++) {
        _system.database.ref('sections/' + groupSection[i]['key'] + '/order_id').set(groupSection[i]['order_id']);
    }
    _section.sections();
});

$(document).on("click", ".collection-add", function() {
    var foundNext = false;
    var foundNextActual = false;
    $(this).parents(".form-collection").find(".form-collection-group ").each(function() {
        if ($(this).hasClass("hide") && !foundNext) {
            $(this).removeClass("hide");
            foundNext = true;
        }
        if ($(this).hasClass("hide") && foundNext) {
            foundNextActual = true;
        }
    });
    if (!foundNextActual) $(this).hide();
    return false;
});

$(document).on("change", "#address-address, #address-city", function() {
    var address = $('#address-address').val();
    var city = $('#address-city').val();
    if (address != "" && city != "") {
        _form.latLonFromAddress(address, city, null,
            function(data) {
                var lat = data['lat'];
                var lon = data['lon'];
                $('#maps-lat').val(lat);
                $('#maps-lon').val(lon);
            },
            function() {
                console.errore("GMAP ERROR");
            }
        );
    }
});

$(document).on("change", "#investor_type", function() {
    if ($('#investor_type').val() == "private") {
        $('.nav.nav-tabs li').eq(2).hide();
        $('.nav.nav-tabs li').eq(1).show();
    }
    if ($('#investor_type').val() == "company") {
        $('.nav.nav-tabs li').eq(1).hide();
        $('.nav.nav-tabs li').eq(2).show();
    }
});

$(document).on("change", ".filer-range-map", function() {
    _dashboard.initMapInvestors()
});