console.log("Background script loaded");

var contextMenuItem = {
  id: "Clickbait",
  title: "Check if Clickbait or Not",
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
		if (data.percentage < 50.0) {
			alert_data += "\nResult: Not a clickbait.";
		}
		else {
			alert_data += "\nResult: Clickbait.";
		}
        alert(alert_data);
      }
    };


    var request_pagelink = new XMLHttpRequest();
    request__pagelink.onreadystatechange = function() {
      if (request__pagelink.readyState == 4) {
        var data = JSON.parse(request__pagelink.responseText);
        window.clickbait = data.percentage.toString();
          window.percent_data = {
          cb_percentage: clickbait
        };
      }
    };
 

    window.msg = {
      link_url: clickData.linkUrl,
      page_url: clickData.pageUrl
    };

    
    request_contextlink.open(
      "GET",
      "http://localhost:5000/?headline=" + clickData.linkUrl,
      false
    );
    request_contextlink.send();

    request_pagelink.open(
      "GET",
      "http://localhost:5000/?headline=" + clickData.pageUrl,
      false
    );
    request_pagelink.send();

    // chrome.storage.local.set({'link_url':clickData.link_url});
  }
});
