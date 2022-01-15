exports.seed = function (knex, Promise) {
  return knex("users").insert([
    // for test login purposes, all passwords are 123123123123
    {
      username: "princess_serenity",
      password: "$2a$08$KMGoYyY1p.uLwPNvTUXBNubAYaMAybc8/VvmQQqX1JX5q9pzd9RVG",
      contact_info: "@serenity",
    },
    {
      username: "rei_hino",
      password: "$2a$08$/8C3OnEu/BvkCC2qVb4JROUm4L5hhzGRMGkEXjY7qHpzdlWj0mE5W",
      contact_info: "sailor_mars",
    },
    {
      username: "minako_aino",
      password: "$2a$08$j/0.JGXgrvnb6AoNjFtC..6ELpWTYF.S5KKRP9TRPGz9zPGhrMCOW",
      contact_info: "sailor_v",
    },
  ]);
};
