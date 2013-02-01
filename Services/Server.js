var http = require("http");
var url = require("url");

exports.start = function(route) {
	var server = http.createServer(function(req, res) {
		
		var pathName = url.parse(req.url).pathname;
		
		var handler = route[pathName];
		
		if (handler) {
			
			console.log("Through path:" + pathName + ":" + new Date().getTime());
			
			handler(res);
			
		} else {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end();
		}
	});

	server.listen(10086);
};