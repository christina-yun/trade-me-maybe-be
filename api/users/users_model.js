const db = require("../data/db-config");

function findUser(filter) {
  return db("users")
    .select("user_id", "username", "contact_info")
    .where(filter)
    .first();
}

function findUserHashedPW(username) {
  return db("users")
    .select("user_id", "username", "password")
    .where("username", username)
    .first();
}
//TODO combine and optimize ISO and Have functions
async function findUserIso(user_id) {
  const isoArray = await db("pins_iso").where("user_id", user_id).first();

  if (isoArray) {
    return db("users as u")
      .leftJoin("pins_iso as iso", "u.user_id", "iso.user_id")
      .leftJoin("pins as p", "iso.pin_id", "p.pin_id")
      .select(
        "p.pin_id",
        "p.pin_name",
        "p.imgurl",
        "p.maker",
        "u.user_id",
        "u.username"
      )
      .where("u.user_id", user_id);
  } else {
    return { message: "This user has no pins they're in search of" };
  }
}

async function findUserHave(user_id) {
  const haveArray = await db("pins_have").where("user_id", user_id).first();

  if (haveArray) {
    return db("users as u")
      .leftJoin("pins_have as have", "u.user_id", "have.user_id")
      .leftJoin("pins as p", "have.pin_id", "p.pin_id")
      .select(
        "p.pin_id",
        "p.pin_name",
        "p.imgurl",
        "p.maker",
        "u.user_id",
        "u.username"
      )
      .where("u.user_id", user_id);
  } else {
    return { message: "This user has no pins for trade" };
  }
}

async function create(newUser) {
  const new_user_id = await db("users")
    .insert(newUser, "user_id")
    .returning("user_id");

  return db("users")
    .select("user_id", "username", "contact_info")
    .where("user_id", parseInt(new_user_id))
    .first();
}

async function update(user_id, user) {
  await db("users").update(user).where("user_id", user_id);

  return db("users")
    .select("user_id", "username", "contact_info")
    .where("user_id", user_id)
    .first();
}

// Should make a separate thing for updating password as opposed to other information as pw info should never be displayed on the screen?
//function updatePW(){}

async function removeUser(user_id) {
  const removed_user = await db("users")
    .select("user_id", "username", "contact_info")
    .where("user_id", user_id)
    .first();

  await db("users").where("user_id", user_id).del();

  return removed_user;
}

module.exports = {
  findUser,
  findUserHashedPW,
  findUserIso,
  findUserHave,
  create,
  update,
  //   updatePW,
  removeUser,
};
