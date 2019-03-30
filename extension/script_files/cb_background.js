console.log("Background script loaded")

chrome.runtime.onMessage.addListener(receiver);
function receiver(request,sender,sendResponse){
	console.log(request.link);
	window.link=request.link;
}

var contextMenuItem = {

	"id": "Clickbait",
	"title": "Check if Clickbait or Not",
	"contexts": ["link"]	
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "Clickbait"){
		console.log("Context Selection taken place")
		console.log("Link Url: "+clickData.linkUrl)
		console.log("Page Url: "+clickData.pageUrl)
		
		window.msg= {
			link_url : clickData.linkUrl,
			page_url : clickData.pageUrl
		}
	}
});