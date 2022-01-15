const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = {
  tokenBuilder,
};