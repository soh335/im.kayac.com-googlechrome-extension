chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        var handle = onHandle[request.name];
        if ( handle ) {
            handle.apply(this, arguments);
        }
        else {
            console.log("invalid request.name :", request.name);
        }
    }
);

var onHandle;

(function() {

    onHandle = {
        send: send,
        setting: setting
    };

    function send(request, sender, sendResponse) {
    }

    function setting(request, sender, sendResponse) {
        localStorage["type"] = request.type;
        localStorage["value"] = request.value;
        localStorage["user"] = request.user;
    }

})();

