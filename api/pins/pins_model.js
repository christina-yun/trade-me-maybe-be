const db = require("../data/db-config");

//Pin-specific functions
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

async function createPin(new_pin) {
  const new_pin_id = await db("pins")
    .insert(new_pin, "pin_id")
    .returning("pin_id");

  return db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", parseInt(new_pin_id))
    .first();
}

async function updatePin(pin_id, updated_pin) {
  await db("pins").update(updated_pin).where("pin_id", pin_id);

  return db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();
}

async function removePin(pin_id) {
  const removed_pin = await db("pins")
    .select("pin_id", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();

  await db("pins").where("pin_id", pin_id).del();

  return removed_pin;
}

// ISO and Have functions

// Tag functions

function findByTag(tag_name) {
  return db("pins as p")
    .leftJoin("pin_tags as tags", "p.pin_id", "tags.pin_id")
    .select("p.pin_id", "p.maker", "p.imgurl", "tags.tag_name")
    .where("tags.tag_name", tag_name);
}

async function createTag(new_tag) {
  const new_tag_id = await db("pin_tags")
    .insert(new_tag, "tags_id")
    .returning("tags_id");

  return db("pin_tags")
    .select("tags_id", "tag_name", "pin_id")
    .where("tags_id", parseInt(new_tag_id))
    .first();
}

async function removeTag(tags_id) {
  const removed_tag = await db("pin_tags")
  .select("tags_id", "tag_name", "pin_id")
  .where("tags_id", tags_id)
  .first();

  await db('pin_tags').where('tags_id', tags_id).del()

  return removed_tag
}

module.exports = {
  findById,
  findByMaker,
  findUsersIsoPin,
  findUsersWhoHavePin,
  findByTag,
  createPin,
  updatePin,
  removePin,
  createTag,
  removeTag,
};
