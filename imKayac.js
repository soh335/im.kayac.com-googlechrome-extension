var imKayac;

imKayac || (function() {

    imKayac = {
        send: send,
        user: null,
        type: null,
        value: null
    };

    var paramFunc = {
        secretkey: secretkey,
        password: password
    };

    function send(req) {
        var user = this.user;
        var type = this.type;
        var onSuccess = req.onSuccess || function() {};
        var onError = req.onError || function() {};
        var params = {
            message: req.message
        };

        if (req.handler) {
            params.handler = req.handler;
        }

        var xhr = new XMLHttpRequest();
        try {
            xhr.open('POST', "http://im.kayac.com/api/post/" + user, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = JSON.parse(xhr.responseText);

                    if (json.result == 'posted') {
                        onSuccess();
                    }
                    else {
                        onError(json.error);
                    }
                }
            }
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            var func = paramFunc[type];
            func && func(params, this.value);

            console.log(params);
            xhr.send(buildQuery(params));
        }
        catch (e) {
            console.log(e);
        }
    }

    function password(params, value) {
        params.password = value;
    }

    function secretkey(params, value) {
        //params.sig = CybozuLabs.SHA1.calc(params.message + value, CybozuLabs.SHA1.BY_UTF16);
        params.sig = hex_sha1(params.message + value);
    }

    function buildQuery(hash) {
        var res = [];

        for (var key in hash) {
            res.push(key + "=" + encodeURIComponent(hash[key]));
        }

        return res.join("&");
    }

})();
