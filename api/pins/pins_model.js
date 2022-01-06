const db = require("../data/db-config");

function findPinById(pin_id){}

function findPinsByMaker(){}

function findUsersIsoPin(){}

function findUsersWhoHavePin(){}

function findPinsByTag(){}

function create(new_pin){}

function update(pin_id, updated_pin){}

function removePin(){}

module.exports = { 
    findPinById,
    findPinsByMaker,
    findUsersIsoPin,
    findUsersWhoHavePin,
    findPinsByTag,
    create,
    update,
    removePin
};
