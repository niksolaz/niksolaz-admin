var _system = {

    database: null,
    storage: null,
    logSource: null,

    logAdmin: function(ref, id, action) {
        var key = _system.key();
        _system.logSource.ref("users/" + _system.dateNow().substr(0, 7) + "/" + firebase.auth().currentUser.uid + "/" + key).set({
            ref: ref,
            id: id,
            action: action,
            date: _system.dateNow() + "T" + _system.timeNow(),
            dateunix: new Date().getTime(),
            user: firebase.auth().currentUser.uid
        });
        if (id !== "") {
            _system.logSource.ref("ref/" + _system.dateNow().substr(0, 7) + "/" + ref + "/" + id + "/" + key).set({
                ref: ref,
                id: id,
                action: action,
                date: _system.dateNow() + "T" + _system.timeNow(),
                dateunix: new Date().getTime(),
                user: firebase.auth().currentUser.uid
            });
        }
    },

    getUrlVars: function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    },

    interface: function() {
        _section.welcome();
    },

    label: function(label) {
        if (label.indexOf("img:") >= 0) return "<div class='icon " + label.replace("img:", "") + "'>&nbsp;</div>";
        if (_config.language == "en") return label;
        return (_dataLabels[_config.language][label] !== undefined ? _dataLabels[_config.language][label] : label);
    },

    msgCode: function(code) {
        return _dataMessages[_config.language][code];
    },

    message: function(message) {
        if (navigator.notification) {
            _system.log("Call message(): navigator.notification.alert() ");
            setTimeout(function() {
                navigator.notification.alert(message);
            }, 100);
        } else {
            _system.log("Call message(): alert()");
            setTimeout(function() {
                alert(message);
            }, 100);
        }
    },

    numberFormat: function(number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },

    key: function(asc) {
        if (asc) {
            return (parseInt((new Date().getTime()))) + "" + Math.floor((Math.random() * 800 + 100));
        } else {
            return (parseInt(new Date("2100-01-01").getTime()) - parseInt((new Date().getTime()))) + "" + Math.floor((Math.random() * 800 + 100));
        }
    },

    htmlEncode: function(value) {
        return $('<div/>').text(value).html();
    },

    width: function() {
        return $(document).width();
    },

    height: function() {
        return $(document).height();
    },

    isNull: function(str) {
        if (str == "" || str == undefined || str == "undefined" || str == null || typeof(str) == "null" || str == "null") {
            return true;
        } else {
            return false;
        }
    },

    isUndefined: function(str) {
        if (str == undefined) {
            return true;
        } else {
            return false;
        }
    },

    isSmartphone: function() {
        if ((navigator.userAgent.indexOf("iPod") > -1) || (navigator.userAgent.indexOf("iPhone") > -1)) {
            return true;
        } else {
            return false;
        }
    },

    isOSX: function() {
        if ((navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1) || (navigator.userAgent.indexOf("iPod") > -1)) {
            return true;
        } else {
            return false;
        }
    },

    isAndroid: function() {
        if (navigator.userAgent.indexOf("Android") > -1) {
            return true;
        } else {
            return false;
        }
    },

    isWinPhone: function() {
        return false;
    },

    isMobile: function() {
        if ((navigator.userAgent.indexOf("Android") > -1) || (navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1) || (navigator.userAgent.indexOf("iPod") > -1)) {
            return true;
        } else {
            return false;
        }
    },

    divExist: function(id) {
        if (id.indexOf("#") != 0) id = "#" + id;
        if ($(id).length > 0) {
            return true;
        } else {
            return false;
        }
    },

    loader: function(message, addCSSClass) {
        if (this.isNull(message)) message = "Loading..."
        return "<div class='loader generic " + (!this.isNull(addCSSClass) ? addCSSClass : "") + "'>" + message + "</div>";
    },

    loaderAdd: function(elementId) {
        $('#' + elementId).addClass("loader");
    },

    loaderRemove: function(elementId) {
        $('#' + elementId).removeClass("loader");
    },

    convertStringAscii: function(str) {
        stringAscii = 0;
        for (i = 0; i < str.length; i++) {
            stringAscii += parseInt(str.charCodeAt(i));
        }
        return stringAscii;
    },

    checkConnection: function() {
        if (navigator.onLine == true) {
            return true;
        } else {
            return false;
        }
    },

    currentPosition: function() {
        var options = {
            timeout: 5000
        };
        navigator.geolocation.getCurrentPosition(function(position) {
            _config.userLastLat = position.coords.latitude;
            _config.userLastLon = position.coords.longitude;
            _config.userLastAccuracy = position.coords.accuracy;
            _system.log("Call currentPosition()");
            _config.userGeoError = false;
        }, function() {
            //_config.userLastLat = null;
            //_config.userLastLon = null;
            //_config.userLastAccuracy = null;
            _config.userGeoError = true;
        }, options);
    },

    log: function(message) {
        if (_config.debugMode) {
            console.log(_system.timeNow(), "-->", message);
        }
    },

    showError: function(id, title, message, type) {
        $(id).html("<div class='content-message " + type + "'><h1>" + title + "</h1><div>" + message + "</div></div>");
    },

    dateDayDiff: function(date) {
        return Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24);
    },

    dateTimeDiff: function(datetime, element) {
        var datetime = typeof datetime !== 'undefined' ? datetime : this.dateNow() + " ".this.timeNow();
        var datetime = new Date(datetime).getTime();
        var now = new Date().getTime();
        if (isNaN(datetime)) {
            return "";
        }
        if (datetime < now) {
            var milisec_diff = now - datetime;
        } else {
            var milisec_diff = datetime - now;
        }
        var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
        var date_diff = new Date(milisec_diff);
        if (element == "hours") {
            return date_diff.getHours();
        } else if (element == "minutes") {
            return date_diff.getMinutes();
        } else {
            return date_diff.getSeconds();
        }
    },

    dateDay: function(dateToConvert) {
        var date = new Date(dateToConvert);
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '/' + month + '/' + year;
    },

    dateToShow: function(date) {
        return date[8] + date[9] + "/" + date[5] + date[6] + "/" + date[0] + date[1] + date[2] + date[3];
    },

    timeToShow: function(date) {
        return date[11] + date[12] + ":" + date[14] + date[15];
    },

    dateStandard: function(date) {
        return date[6] + date[7] + date[8] + date[9] + "-" + date[3] + date[4] + "-" + date[0] + date[1];
    },

    isValidDate: function(s) {
        var bits = s.split('-');
        var d = new Date(bits[0], bits[1] - 1, bits[2]);
        return d && (d.getMonth() + 1) == bits[1];
    },

    dateBack: function(days, modal) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        if (modal == "epoch") {
            return date.getTime();
        } else {
            return _system.dateStandard(_system.dateFromUnix(date.getTime()));
        }
    },

    dateNow: function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = yyyy + '-' + mm + '-' + dd;
        return today;
    },

    dateFromUnix: function(date, format) {
        var date = new Date(date * 1);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yy = date.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (format == "system") {
            return yy + '-' + mm + '-' + dd;
        } else {
            return dd + '/' + mm + '/' + yy;
        }
    },

    dateUTCToLocal: function(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    },

    dateLocalToUTC: function(date) {
        return new Date(date).toISOString();
    },

    timeFromUnix: function(date) {
        var date = new Date(date * 1);
        var hh = date.getHours();
        var mm = date.getMinutes();
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        return hh + ':' + mm;
    },

    timeNow: function(secondsBack) {
        var d = new Date();
        if (secondsBack > 0) {
            d.setSeconds(d.getSeconds() - secondsBack);
        }
        var curr_hour = d.getHours();
        var curr_minutes = d.getMinutes();
        var curr_seconds = d.getSeconds();
        if (curr_hour < 10) curr_hour = "0" + curr_hour;
        if (curr_minutes < 10) curr_minutes = "0" + curr_minutes;
        if (curr_seconds < 10) curr_seconds = "0" + curr_seconds;
        return (curr_hour + ":" + curr_minutes + ":" + curr_seconds);
    },

    dateToEpoch: function(datestring) {
        if (_system.isNull(datestring)) return "";
        var parts = datestring.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
        //return (Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]));
        //return Date(Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]));
        return Date.UTC(+parts[1], parts[2] - 1, +parts[3], +parts[4], +parts[5]);
    },

    dateDiff: function(date1, date2, interval) {
        var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
        date1 = new Date(date1);
        date2 = new Date(date2);
        var timediff = date2 - date1;
        if (isNaN(timediff)) return NaN;
        switch (interval) {
            case "years":
                return date2.getFullYear() - date1.getFullYear();
            case "months":
                return (
                    (date2.getFullYear() * 12 + date2.getMonth()) -
                    (date1.getFullYear() * 12 + date1.getMonth())
                );
            case "weeks":
                return Math.floor(timediff / week);
            case "days":
                return Math.floor(timediff / day);
            case "hours":
                return Math.floor(timediff / hour);
            case "minutes":
                return Math.floor(timediff / minute);
            case "seconds":
                return Math.floor(timediff / second);
            default:
                return undefined;
        }
    },

    dateConvertToShow: function(date, format) {
        //log("dateConvertToShow(): "+date+" format: "+format);
        if (_system.isNull(date)) {
            return "";
        } else {

            if (this.isNull(format)) format = "day dd month yyyy";

            var days_labels = ['Domenica', 'Luned&igrave;', 'Marted&igrave;', 'Mercoled&igrave;', 'Gioved&igrave;', 'Venerd&igrave;', 'Sabato'];
            var months_labels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

            var d = new Date(date.substr(0, 10));
            var curr_day = d.getDay();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() * 1 + 1;
            var curr_year = d.getFullYear();

            if (curr_date < 10) curr_date = "0" + curr_date;
            if (curr_month < 10) curr_month = "0" + curr_month;
            //Nel caso la conversione non vada a buon fine ritorno stringa vuota!
            if (date == "0000-00-00") return "";
            //Altrimenti converto nel formato richiesto
            if ((format == "day dd mounth yyyy") || (format == "day dd month yyyy")) {
                return (days_labels[parseInt(curr_day)] + " " + curr_date + " " + months_labels[curr_month * 1 - 1] + " " + curr_year);
            } else if (format == "dd mounth yyyy") {
                return (curr_date + " " + months_labels[curr_month * 1 - 1] + " " + curr_year);
            } else if (format == "dd/mm/yyyy") {
                return (curr_date + "/" + curr_month + "/" + curr_year);
            } else if (format == "mm/dd/yyyy") {
                return (curr_month + "/" + curr_date + "/" + curr_year);
            } else if (format == "yyyy/mm/dd") {
                return (curr_year + "/" + curr_month + "/" + curr_date);
            } else if (format == "dd") {
                return (curr_date);
            } else if (format == "mm") {
                return (curr_month);
            } else if (format == "yyyy") {
                return (curr_year);
            } else {
                return date;
            }
        }

    },

    validEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    stringForTag: function(tag) {
        if (tag == "confirmed" || tag == "live" || tag == "verified" || tag == "qea" || tag == "SUCCEEDED") {
            if (tag == "qea") tag = "Q&A";
            if (tag == "confirmed" || tag == "SUCCEEDED") tag = "CONFERMATO";
            if (tag == "live") tag = "ACCETTATO"; //"PUBBLICATO";
            if (tag == "verified") tag = "VERIFICATO";
            return "<small class='label pull-center bg-green'>" + tag.toUpperCase() + "</small>";
        } else if (tag == "pending" || tag == "submitted" || tag == "CREATED") {
            if (tag == "pending" || tag == "CREATED") tag = "IN ATTESA";
            if (tag == "submitted") tag = "IN VALIDAZIONE";
            return "<small class='label pull-center bg-yellow'>" + tag.toUpperCase() + "</small>";
        } else if (tag == "failed" || tag == "rejected" || tag == "notfunded" || tag == "unverified" || tag == "FAILED") {
            if (tag == "failed" || tag == "FAILED") tag = "ANNULLATO";
            if (tag == "notfunded") tag = "CHIUSO SENZA SUCCESSO";
            if (tag == "rejected") tag = "RIFIUTATO";
            return "<small class='label pull-center bg-red'>" + tag.toUpperCase() + "</small>";
        } else if (tag == "created" || tag == "private") {
            if (tag == "created") tag = "IN CREAZIONE";
            if (tag == "private") tag = "PRIVATO";
            return "<small class='label pull-center bg-gray'>" + tag.toUpperCase() + "</small>";
        } else if (tag == "preapproval" || tag == "funded") {
            if (tag == "preapproval") tag = "PRE-ADESIONE";
            if (tag == "funded") tag = "CHIUSO CON SUCCESSO";
            return "<small class='label pull-center bg-aqua'>" + tag.toUpperCase() + "</small>";
        } else if (tag == "company") {
            if (tag == "company") tag = "AZIENDA";
            return "<small class='label pull-center bg-black'>" + tag.toUpperCase() + "</small>";
        } else {
            return "<small class='label pull-center bg-blue'>" + tag.toUpperCase() + "</small>";
        }
    }

}