function setup(){
	noCanvas();
	let bgpage=chrome.extension.getBackgroundPage();
	let link=bgpage.link;
	createP(link);
}