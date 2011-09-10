chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
       if (request.name == "setting") {
           localStorage["type"] = request.type;
           localStorage["value"] = request.value;
           localStorage["user"] = request.user;
       }
    }
);
