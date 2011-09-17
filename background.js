chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if ( request.name == "setting" ) {
            localStorage["type"] = request.type;
            localStorage["value"] = request.value;
            localStorage["user"] = request.user;
        }
        else {
            console.log("invalid request.name :", request.name);
        }
    }
);

(function() {

    var id = chrome.contextMenus.create({
        title: "im.kayac.com",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        title: "link",
        contexts: ["link"],
        parentId: id,
        onclick: function(info, tab) {
            imKayac.send({
                message: info.selectionText,
                handler: info.linkUrl
            });
        }
    });

    chrome.contextMenus.create({
        title: "tab url",
        contexts: ["all"],
        parentId: id,
        onclick: function(info, tab) {
            imKayac.send({
                message: tab.title || tab.url,
                handler: tab.url,
            });
        }
    });

    chrome.contextMenus.create({
        title: "selection",
        contexts: ["selection"],
        parentId: id,
        onclick: function(info, tab) {
            imKayac.send({
                message: info.selectionText
            });
        }
    })

    chrome.contextMenus.create({
        title: "image url",
        contexts: ["image"],
        parentId: id,
        onclick: function(info, tab) {
            imKayac.send({
                message: info.srcUrl,
                handler: info.srcUrl
            });
        }
    })

    chrome.browserAction.onClicked.addListener(function(tab) {
        imKayac.send({
            message: tab.title || tab.url,
            handler: tab.url
        });
    });

})();

