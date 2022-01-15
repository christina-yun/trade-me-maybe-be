const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../secrets/index");
const { tokenBuilder } = require("../auth/tokenBuilder");

const Users = require("../users/users_model");

//access middleware

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: "Token required!" });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: "Token invalid!" });
    }

    req.decodedToken = decodedToken;
    return next();
  });
};

//validation middleware
const checkUserExists = async (req, res, next) => {
  const validUsername = await Users.findUser({ username: req.body.username });

  if (!validUsername) {
    next({ status: 404, message: "That user doesn't exist" });
  } else {
      next();
  }
};

const validateUsername = async (req, res, next) => {
  const { username } = req.body;
  const usernameTaken = username
    ? await Users.findUser({ username: username })
    : null;

  if (!username || username.trim().length < 1) {
    next({ status: 401, message: "Username required" });
  } else if (usernameTaken) {
    next({ status: 401, message: "That username is already taken" });
  } else {
    next();
  }
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password || password.trim() < 1) {
    next({ status: 401, message: "Password required" });
  } else if (password.trim().length < 12) {
    next({ status: 401, message: "Password must be at least 12 characters" });
  } else {
    next();
  }
};

const checkPasswordCorrect = async (req, res, next) => {
  let { username, password } = req.body;

  const validUser = await Users.findUserHashedPW(username);

  if (validUser && bcrypt.compareSync(password, validUser.password)) {
    const token = tokenBuilder(validUser);
    req.token = token;
    next();
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
};

const validateContact = async (req, res, next) => {
  const { contact_info } = req.body;
  const contactExists = contact_info
    ? await Users.findUser({ contact_info: contact_info })
    : null;

  if (!contact_info || contact_info.trim() < 1) {
    next({ status: 401, message: "Contact information required" });
  } else if (contactExists) {
    next({
      status: 401,
      message: "A user with that contact information already exists",
    });
  } else {
    next();
  }
};

const hashThePassword = (req, res, next) => {
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(req.body.password, rounds);

  req.body.password = hash;
  next();
};

module.exports = {
  restricted,
  checkUserExists,
  validateUsername,
  validatePassword,
  checkPasswordCorrect,
  validateContact,
  hashThePassword,
};
