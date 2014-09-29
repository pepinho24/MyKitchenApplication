(function (global) {

    var app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", transition: "slide" });
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
    }, false);

    var onOnline = function onOnline() {
        checkConnection();
    }
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';

        if (states[networkState] !== 'WiFi connection') {
            navigator.notification.vibrate(100)
            navigator.notification.vibrate(100)
            navigator.notification.vibrate(100)
            alert("Data Usage Warning! Downloading recipes with pictures may result in extra data charges or delays!")
        }
    }


    var onOffline = function onOffline() {
        navigator.notification.vibrate(100)
        navigator.notification.vibrate(100)
        navigator.notification.vibrate(100)
        alert("No Internet Connection");
    }
})(window);