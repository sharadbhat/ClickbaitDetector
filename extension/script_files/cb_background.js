console.log("Background script loaded");

var contextMenuItem = {
  id: "Clickbait",
  title: "Check if clickbait or not",
  contexts: ["link"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == "Clickbait") {
    console.log("Context Selection taken place");
    console.log("Link Url: " + clickData.linkUrl);
    console.log("Page Url: " + clickData.pageUrl);
    var request_contextlink = new XMLHttpRequest();
    request_contextlink.onreadystatechange = function() {
      if (request_contextlink.readyState == 4) {
        var data = JSON.parse(request_contextlink.responseText);
        window.clickbait = data.percentage.toString();
        var alert_data = "Headline: " + data.headline;
        alert_data += "\nPercentage: " + data.percentage.toString();
        if (data.percentage > 70.0) {
          alert_data += "\nResult: Clickbait.";
        } else if (data.percentage > 50.0) {
          alert_data += "\nResult: Probably clickbait.";
        } else if (data.percentage > 30.0) {
          alert_data += "\nResult: Probably not clickbait.";
        } else {
          alert_data += "\nResult: Not clickbait.";
        }
        alert(alert_data);
      }
    };

    // window.msg = {
    //   link_url: clickData.linkUrl,
    //   page_url: clickData.pageUrl
    // };

    request_contextlink.open(
      "GET",
      "http://localhost:5000/?url=" + clickData.linkUrl,
      false
    );
    request_contextlink.send();
  }
});
