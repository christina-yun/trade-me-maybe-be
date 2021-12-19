exports.seed = function (knex, Promise) {
  return knex("pins").insert([
    {
      maker: "Pastel Shooting Star",
      imgurl:
        "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/",
    },
    {
      maker: "Astral Pins",
      imgurl:
        "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/",
    },
    {
      maker: "Moon Rabbit Pins",
      imgurl: "https://www.instagram.com/p/CSiW5xiFs0H/",
    },
    {
      maker: "Nyxxi Pins",
      imgurl:
        "https://www.instagram.com/p/CV4SIHYMior9IXyDEmBh-UBfnfFnx6k4Qda2eY0/",
    },
  ]);
};
