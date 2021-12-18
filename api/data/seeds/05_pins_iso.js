exports.seed = function (knex, Promise) {
  return knex("pins_iso").insert([
    {
      user_id: 2,
      pin_id: 2,
    },
    {
      user_id: 1,
      pin_id: 3,
    },
    {
      user_id: 3,
      pin_id: 4,
    },
    {
      user_id: 2,
      pin_id: 3,
    },
  ]);
};
