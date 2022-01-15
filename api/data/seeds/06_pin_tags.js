exports.seed = function (knex, Promise) {
  return knex("pin_tags").insert([
    {
      tag_name: "sailor-moon",
      pin_id: 2,
    },
    {
      tag_name: "princess-serenity",
      pin_id: 2,
    },
    {
      tag_name: "sailor-moon",
      pin_id: 1,
    },
    {
      tag_name: "summertime",
      pin_id: 1,
    },
    {
      tag_name: "art-nouveau",
      pin_id: 3,
    },
    {
      tag_name: "pastel",
      pin_id: 3,
    },
    {
      tag_name: "princess-serenity",
      pin_id: 3,
    },
    {
      tag_name: "pop",
      pin_id: 4,
    },
    {
      tag_name: "princess-serenity",
      pin_id: 4,
    },
    {
      tag_name: "art-nouveau",
      pin_id: 4,
    },
  ]);
};
