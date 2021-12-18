const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// api routes should go here

// error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    mess: err.message,
  });
});

module.exports = server;
