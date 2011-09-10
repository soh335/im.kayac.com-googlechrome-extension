var mes;

window.onload = function() {
  mes = document.getElementById("message");
  var type = localStorage["type"];
  var user = localStorage["user"];
  if ( !type || !user ) {
    message("don't have setting");
  }
  else {
    request(user, type);
  }
}

function request(user, type) {
  chrome.tabs.getSelected(null, function(tab) {
    log(tab.url);
    var xhr = new XMLHttpRequest();
    try {
      xhr.open('POST', "http://im.kayac.com/api/post/" + user, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var json = JSON.parse(xhr.responseText);

          if (json.result == 'posted') {
            message("Success!");
          }
          else {
            message(json.error);
          }
        }
      };
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      var params = {
        message: tab.url,
        handler: tab.url
      };

      switch( type ) {
        case "password":
          password(params);
        break;
        case "secretkey":
          secretkey(params);
        break;
        case "no":
          break;
        default:
          break;
      }

      xhr.send(buildQuery(params));
    }
    catch(e) {
      console.log(e);
    }
  });
}

function password(params) {
  params.password = localStorage["value"];
}

function secretkey(params) {
  params.sig = CybozuLabs.SHA1.calc(params.message + localStorage["value"]);
}

function buildQuery(hash) {
  var res = [];
  
  for (var key in hash) {
    res.push(key + "=" + encodeURIComponent(hash[key]));
  }
  
  return res.join("&");
}

function message(msg) {
  mes.innerHTML = msg;
}
