function setup(){
	noCanvas();
	let bgpage=chrome.extension.getBackgroundPage();
	
	/*let link=bgpage.link;
	createP(link);*/

	let msg=bgpage.msg;
	createP("Context Selected Link: "+msg.link_url);
	createP("Page URL: "+msg.page_url)
}