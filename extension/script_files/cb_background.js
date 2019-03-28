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

chrome.contextMenus.onClicked.addListener(function(selectLink){
	
})