console.log("Background script loaded");

// chrome.runtime.onMessage.addListener(receiver);
// function receiver(request,sender,sendResponse){
// 	console.log(request.link);
// 	window.link=request.link;
// console.log(request.link);
// window.link=request.link;
// }

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

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var data = JSON.parse(request.responseText);
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
        console.log("XMLHttp Request Perfect");
        console.log(clickbait);

        window.percent_data = {
          cb_percentage: clickbait
        };
        console.log("data added");
      }
    };
    // window.percent_data= {
    // 	click_bait_precentage : data.clickbaitiness
    // }

    window.msg = {
      link_url: clickData.linkUrl,
      page_url: clickData.pageUrl
    };

    request.open(
      "GET",
      "http://localhost:5000/?headline=" + clickData.linkUrl,
      false
    );
    request.send();

    // chrome.storage.local.set({'link_url':clickData.link_url});
  }
});
