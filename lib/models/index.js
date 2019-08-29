"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// const { config } = require("../../config");

// Database settings for the current environment
const dbConfig = {
  dialect: process.env.DIALECT || "sqlite",
  storage: process.env.STORAGE || ":memory:"
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig
);

const db = {};

// Read all the files in this directory and import them as models
fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
