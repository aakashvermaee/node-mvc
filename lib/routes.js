const Home = require('../lib/controllers/home');

const root = {
  name: "routes",
  version: "1.0.0",
  register: async function(server, options) {
    server.route({
      method: "GET",
      path: "/",
      handler: (request, reply) => {
        return "Hello World!";
      }
    });
  }
};

const notes = [
  {
    name: "GET All Notes",
    version: "1.0.0",
    register: async function(server, options) {
      server.route({
        method: "GET",
        path: "/notes",
        handler: Home.getNotes
      });
    }
  },
  {
    name: "GET Note's Content",
    version: "1.0.0",
    register: async function(server, options) {
      server.route({
        method: "GET",
        path: "/notes/{slug}",
        handler: (request, reply) => {
          return "GET Note's Content";
        }
      });
    }
  },
  {
    name: "POST Notes",
    version: "1.0.0",
    register: async function(server, options) {
      server.route({
        method: "POST",
        path: "/notes",
        handler: (request, reply) => {
          return "POST Notes";
        }
      });
    }
  },
  {
    name: "Update Notes",
    version: "1.0.0",
    register: async function(server, options) {
      server.route({
        method: "PUT",
        path: "/notes/{slug}",
        handler: (request, reply) => {
          return "UPDATE Notes";
        }
      });
    }
  },
  {
    name: "Delete Notes",
    version: "1.0.0",
    register: async function(server, options) {
      server.route({
        method: "DELETE",
        path: "/notes/{slug}",
        handler: (request, reply) => {
          return "DELETE Notes";
        }
      });
    }
  }
];

module.exports = [].concat(root, notes);
