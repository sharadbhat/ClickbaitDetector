function setup(){
	noCanvas();
	let bgpage=chrome.extension.getBackgroundPage();
	
	/*let link=bgpage.link;
	createP(link);*/
	
	let msg=bgpage.msg;
	let percent_data=bgpage.percent_data;

	// const fs = require('fs');
	// fs.writeFileSync('../data_files/page_urls.txt',msg);

	createP("Context Selected Link: "+msg.link_url);
	createP("Page URL: "+msg.page_url)
	createP("Percent: "+ percent_data.cb_percentage);

	if(percent_data.cb_percentage<40){
		createP("It's not Clickbait")
	}
	else{
		createP("It's a Clickbait")
	}

}