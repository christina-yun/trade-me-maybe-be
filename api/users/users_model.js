const db = require("../data/db-config");

function findUser(user_id) {
    return db("users")
        .select("user_id", "username", "contact_info")
        .where("user_id", user_id)
        .first()
}

function findUserIso(user_id) {
    return  db("users as u")
        .leftJoin("pins_iso as iso", "u.user_id", "iso.user_id")
        .leftJoin("pins as p", "iso.pin_id", "p.pin_id")
        .select("p.imgurl", "p.maker", "u.user_id", "u.username")
        .where("u.user_id", user_id)
}

function findUserHave(user_id) {
    return  db("users as u")
        .leftJoin("pins_have as have", "u.user_id", "have.user_id")
        .leftJoin("pins as p", "have.pin_id", "p.pin_id")
        .select("p.imgurl", "p.maker", "u.user_id", "u.username")
        .where("u.user_id", user_id)
}

async function create(newUser) {
    return db('users')
        .insert(newUser, 'user_id')
        .returning("user_id", "username", "contact_info")

    // return db('users')
    //     .select("user_id", "username", "contact_info")
    //     .where("user_id", newUser.user_id)
    //     .first()
}

function update() {}

function removeUser() {}

module.exports = {
  findUser,
  findUserIso,
  findUserHave,
  create,
  update,
  removeUser,
};
