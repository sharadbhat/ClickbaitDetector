console.log("Background script loaded")

chrome.runtime.onMessage.addListener(receiver);
function receiver(request,sender,sendResponse){
	console.log(request.link);
	window.link=request.link;
}