const Hapi = require("hapi");
const mongoose = require("mongoose");
const Boom = require("boom");
const glob = require("glob");
const path = require("path");

// Access environment variables.
require("dotenv").config();


// Define the server.
const server = new Hapi.Server({ port: process.env.PORT, routes: { cors: true } });


/* 
Define all the routes from all subdirectories.
*/
const register_routes = async () => {
  
  // Recursively find all routes.
  await glob
    .sync("src/**/routes/*.js", {
      root: __dirname
    })
    .forEach(file => {
          
      // __dirname is the current directory. We join all files found
      // and place them under this directory.
      const route = require(path.join(__dirname, file));
      server.route(route);

    });
}


/* 
Server definitions.
*/
const init = async() => { 
  
  // Register all the routes.
  register_routes();

  
  await server.start();

  return server;

}


// Start the server.
init().then(server => {
  
  console.log("Server running at:", server.info.uri);

  // Connect to the database.
  mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(() => { 
    console.log("Connected to Mongo server"); 
  }, err => { 
    throw Boom.badRequest(err);
  });

}).catch(err => {
  throw Boom.badRequest(err);
});
