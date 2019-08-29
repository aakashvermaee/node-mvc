const { server } = require("./config");

server.register(require("./lib/routes"));
