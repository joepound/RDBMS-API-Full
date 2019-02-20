/* Server imports */

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const rootRoute = require("./routes/rootRoute");
const errorRoute = require("./routes/errorRoute");

// server setup
const server = express();

// built-in middleware
server.use(express.json());

// third party middleware
server.use(helmet());
server.use(morgan("dev"));

// custom routing middleware
server.use("/", rootRoute); // routing for root URL
server.use(errorRoute); // routing for URL's resolving to bad queries

module.exports = server;
