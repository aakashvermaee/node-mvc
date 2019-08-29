"use strict";

const Hapi = require("@hapi/hapi");

const config = require("./config");

const Models = require('../lib/models');

let server = "";

async function init() {
  try {
    server = Hapi.server({
      port: config.port,
      host: config.host
    });

    // This code is going to synchronize the models to our database and,
    // once that is done, the server will be started
    await Models.sequelize.sync();

    await server.start();
    console.log(`Server running on: ${server.info.uri}`);
  } catch (err) {
    console.error(err);
  }
}

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

exports.server = server;
