exports.seed = function (knex, Promise) {
  return knex("users").insert([
    {
      username: "princess_serenity",
      password: "123123",
      contact_info: "serenity",
    },
    {
      username: "rei_hino",
      password: "123123",
      contact_info: "sailor_mars",
    },
    {
      username: "minako_aino",
      password: "123123",
      contact_info: "sailor_v",
    },
  ]);
};
