function setup(){
	noCanvas();
	let bgpage=chrome.extension.getBackgroundPage();
	
	/*let link=bgpage.link;
	createP(link);*/
	
	let msg=bgpage.msg;

	// const fs = require('fs');
	// fs.writeFileSync('../data_files/page_urls.txt',msg);

	createP("Context Selected Link: "+msg.link_url);
	createP("Page URL: "+msg.page_url)

	let random_percent = Math.random(0,1);
	createP("Percent: "+random_percent*100)

	if((random_percent*100)<40){
		createP("It's not Clickbait")
	}
	else{
		createP("It's a Clickbait")
	}

}