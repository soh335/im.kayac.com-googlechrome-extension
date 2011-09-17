(function(){

    var orig = imKayac.send;
    imKayac.send = send;

    function send(req) {
        var user = localStorage.user;
        var type = localStorage.type;
        var value = localStorage.value;

        console.log(user, type, value);
        if ( ! user || ! type ) {
            notify("don't have setting");
        }
        else {
            imKayac.user = user;
            imKayac.type = type;
            imKayac.value = value;
            req.onSuccess = onSuccess;
            req.onError = onError;
            orig.call(imKayac, req);
        }
    }

    function onSuccess() {
        notify("success !");
    }

    function onError(error) {
        notify(error);
    }

    function notify(message) {
        var notification = webkitNotifications.createNotification(
            "48.png",
            "im.kayac.com",
            message
        );
        notification.show();
        setTimeout(function() {
            notification.cancel();
        }, 5000);
    }
})();
