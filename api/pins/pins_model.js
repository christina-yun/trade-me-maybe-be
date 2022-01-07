const db = require("../data/db-config");

function findById(pin_id) {
  return db("pins").where("pin_id", pin_id).first();
}

function findByMaker(maker) {
  return db("pins").where("maker", maker);
}

function findUsersIsoPin() {}

function findUsersWhoHavePin() {}

function findByTag() {}

function create(new_pin) {}

function update(pin_id, updated_pin) {}

function remove() {}

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
