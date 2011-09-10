var selected = document.evaluate("//input[@name='auth' and @checked]", document, null, 7, null).snapshotItem(0)

var field = {};

if ( selected.value == "password" || selected.value == "secretkey" ) {
    field = document.getElementById("id_" + selected.value);
}

var userTag = document.evaluate("//ul[@id='menu']/li", document, null, 7, null).snapshotItem(0);

var user = userTag.innerText.match(/^\w+/);

chrome.extension.sendRequest(
    {
      name: "setting",
      type: selected.value,
      value: field.value || "",
      user: user[0]
    }
);
