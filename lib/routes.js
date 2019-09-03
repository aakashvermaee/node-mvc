const path = require('path');

const Home = require('../lib/controllers/home');
const Note = require('../lib/controllers/notes');

const root =
{
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    return "Hello World!";
  }
};

const serveStaticFiles = {
  method: "GET",
  path: "/{param*}",
  handler: {
    directory: {
      path: path.join(__dirname, '../static/public')
    }
  }
};

const notes = [
  {
    method: "GET",
    path: "/notes",
    handler: Home.getNotes
  },
  {
    method: "GET",
    path: "/notes/{slug}",
    handler: Note.read
  },
  {
    method: "POST",
    path: "/notes",
    handler: Note.create
  },
  {
    method: "PUT",
    path: "/notes/{slug}",
    handler: Note.update
  },
  {
    method: "DELETE",
    path: "/notes/{slug}",
    handler: Note.delete
  }
];

exports.plugin = {
  name: 'routes',
  multiple: true,
  register: function (server, options) {
    const routes = [].concat(root, serveStaticFiles, notes);

    for (let route of routes) {
      server.route(route);
    }
  }
};