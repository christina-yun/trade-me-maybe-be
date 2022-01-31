const db = require("../data/db-config");

async function checkIfUserExists(req, res, next) {
  const user_id = req.params.user_id;

  let userExists = await db("users").where("user_id", user_id).first();

  if (!userExists) {
    next({ message: "This user doesn't exist!" });
  } else {
    next();
  }
}

function checkIfLoggedInUser(req, res, next) {
  const loggedInUserId = req.decodedToken.subject;
  const lookedUpUserId = parseInt(req.params.user_id);

  if (loggedInUserId === lookedUpUserId) {
    next();
  } else {
    next({
      status: 401,
      message: "You cannot modify another user's information",
    });
  }
}

module.exports = {
  checkIfUserExists,
  checkIfLoggedInUser,
};
