exports.seed = function (knex, Promise) {
  return knex("pins_have").insert([
    {
      user_id: 1,
      pin_id: 2,
    },
    {
      user_id: 3,
      pin_id: 3,
    },
    {
      user_id: 1,
      pin_id: 4,
    },
    {
      user_id: 3,
      pin_id: 1,
    },
    {
      user_id: 3,
      pin_id: 4,
    },
  ]);
};
