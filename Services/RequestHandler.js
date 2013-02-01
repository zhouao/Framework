function sleep(milliSecond) {
	
	var startTime = new Date().getTime();
	
	console.log(startTime);
	
	while(new Date().getTime() <= milliSecond + startTime) {
		
	}
	
	console.log(new Date().getTime());
}
exports.hello = function(res) {
    sleep(2000000);
	res.writeHead(200, {"Content-Type": "text/plain"});
		
	res.write("say hello.");
		
	res.end();
};

exports.upload = function(res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	
	res.write("upload");
	
	res.end();
};