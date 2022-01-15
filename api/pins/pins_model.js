const db = require("../data/db-config");

function findById(pin_id) {
  return db("pins").where("pin_id", pin_id).first();
}

function findByMaker(maker) {
  return db("pins").where("maker", maker);
}

function findUsersIsoPin(pin_id) {
  return db("users as u")
    .leftJoin("pins_iso as iso", "u.user_id", "iso.user_id")
    .leftJoin("pins as p", "p.pin_id", "iso.pin_id")
    .select("p.pin_id", "u.username")
    .where("p.pin_id", pin_id);
}

function findUsersWhoHavePin(pin_id) {
  return db("users as u")
    .leftJoin("pins_have as have", "u.user_id", "have.user_id")
    .leftJoin("pins as p", "p.pin_id", "have.pin_id")
    .select("p.pin_id", "u.username")
    .where("p.pin_id", pin_id);
}

function findByTag(tag_name) {
  return db("pins as p")
    .leftJoin("pin_tags as tags", "p.pin_id", "tags.pin_id")
    .select("p.pin_id", "p.maker", "p.imgurl", "tags.tag_name")
    .where("tags.tag_name", tag_name);
}

//TODO createTag()

async function create(new_pin) {
  const new_pin_id = await db("pins")
    .insert(new_pin, "pin_id")
    .returning("pin_id");

  return db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", parseInt(new_pin_id))
    .first();
}

async function update(pin_id, updated_pin) {
  await db("pins").update(updated_pin).where("pin_id", pin_id);

  return db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();
}

async function remove(pin_id) {
  const removed_pin = await db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();

  await db("pins").where("pin_id", pin_id).del();

  return removed_pin;
}

module.exports = {
  findById,
  findByMaker,
  findUsersIsoPin,
  findUsersWhoHavePin,
  findByTag,
  create,
  update,
  remove,
};
