'use strict';

const Models = require('../models');
const Slugify = require('slug');
const path = require('path');
const Pug = require('pug');

module.exports = {
  create: async (request, reply) => {
    const result = await Models.Note.create({
      date: new Date(),
      title: request.payload.noteTitle,
      slug: Slugify(request.payload.noteTitle, { lower: true }),
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    });

    const newNote = Pug.renderFile(
      path.join(__dirname, '../views/components/note.pug'),
      {
        note: result
      });

    return (newNote);
  },
  read: async (request, reply) => {
    const result = await Models.Note.findAll();

    return reply.view('note', {
      note: result,
      page: `${result.title}-Notes Board`,
      description: result.description
    });
  },
  update: (request, reply) => {
    const value = {
      title: request.payload.noteTitle,
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    };

    const options = {
      where: { slug: request.params.slug }
    };

    Models.Note.update(values, options).then(() => {
      Models.Note.findOne(options).then((result) => reply(result));
    });
  },
  delete: (request, reply) => {
    Models.Note.destroy({
      where: {
        slug: request.params.slug
      }
    }).then(() => reply.redirect('/'));
  }
}