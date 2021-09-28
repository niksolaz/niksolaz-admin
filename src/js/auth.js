var _auth = {

    init: function() {
        var app = firebase.initializeApp(_config);
        _system.database = app.database();
        _system.storage = app.storage();
        _system.auth = app.auth();

        //var log = firebase.initializeApp(_configLog, "[LOG]");
        //_system.logSource = log.database();

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _auth.check();
            }
        });
    },

    login: function() {

        var email = $('#login-email').val();
        var password = $('#login-password').val();
        _system.auth.onAuthStateChanged(function(user) {
            if (user) {
                _system.log("logged");
                _auth.me({email: email, name: email});
            } else {
                _system.log("NOT logged");
            }
        });
        _system.auth.signInWithEmailAndPassword(email, password).then(function(user) {
                $('.alert-nolog').addClass("hide").text("");
                var userId = user.uid;
                _system.database.ref("/users/" + user.uid).once('value').then(function(data) {
                    if (data !== null) {
                        var user = data.val()
                        if (user['is_admin'] && user['is_active']) {
                            _auth.me({
                                id: userId,
                                email: email,
                                name: email
                            });
                        } else {
                            $('.alert-nolog').text("Admin not active!").removeClass("hide");
                        }
                    } else {
                        $('.alert-nolog').text("Admin not active!").removeClass("hide");
                    }
                    console.log(data);
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (error) {
                    $('.alert-nolog').text(errorMessage).removeClass("hide");
                }
            });
    },

    me: function(data) {
        _config.admin = data;
        _config.admin.role = "UserAdmin";
        localStorage.setItem("__admin", JSON.stringify(_config.admin));
        $('.user-admin').html('<i class="fa fa-user-circle-o" aria-hidden="true"></i> ' + data['name']);
        _menu.init();
        $('.login-box').fadeOut(function() {
            $('.wrapper').fadeIn(function() {
                _dashboard.render();
            });
        });
    },

    check: function() {
        if (firebase.auth().currentUser !== undefined) {
            firebase.auth().currentUser.getIdToken(true)
                .then(function(idToken) {
                    if (localStorage.getItem("__admin") !== null) {
                        _config.admin = JSON.parse(localStorage.getItem("__admin"));
                        if (_config.admin.id == firebase.auth().currentUser.uid) {
                            _config.admin.id = firebase.auth().currentUser.uid;
                            _auth.me(_config.admin);
                        }
                    }
                }).catch(function(error) {});
        } else {
            localStorage.clear();
        }
    },

    logout: function() {
        firebase.auth().signOut().then(function() {
            localStorage.clear();
            location.reload();
        });
    },

}