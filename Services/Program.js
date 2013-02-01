var requestHandler = require("./requestHandler");
var server = require("./server");

var route = {
	"/hello": requestHandler.hello,
	"/upload": requestHandler.upload
};

server.start(route);