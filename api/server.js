const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require('./auth/authRouter');
const userRouter = require("./users/userRouter");
const pinRouter = require("./pins/pinRouter");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// api routes should go here
server.use('/auth', authRouter)
server.use('/users', userRouter);
server.use('/pins', pinRouter);

// error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    mess: err.message,
  });
});

module.exports = server;
