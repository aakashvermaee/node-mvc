"use strict";

const Models = require("../models");

module.exports.getNotes = async (request, reply) => {
  const result = await Models.Note.findAll({
    order: [["date", "DESC"]]
  });

  return reply.view('home', {
    data: {
      notes: result
    },
    page: "Home—Notes Board",
    description: "Welcome to my Notes Board"
  });
};
