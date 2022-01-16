exports.seed = function (knex, Promise) {
  return knex("pins").insert([
    {
      pin_name: "Summertime Usagi Pop",
      maker: "pastel-shooting-star",
      imgurl:
        "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/",
    },
    {
      pin_name: "Astral Serenity",
      maker: "astral-pins",
      imgurl:
        "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/",
    },
    {
      pin_name: "Art Nouveau Serenity Pastel Variant",
      maker: "moon-rabbit-pins",
      imgurl: "https://www.instagram.com/p/CSiW5xiFs0H/",
    },
    {
      pin_name: "Sailor Moon NOUVEAU Usagi",
      maker: "nyxxi-pins",
      imgurl:
        "https://www.instagram.com/p/CV4SIHYMior9IXyDEmBh-UBfnfFnx6k4Qda2eY0/",
    },
    {
      pin_name:"Pin on Pin Egyptian Goddess Bast",
      maker: "pastel-shooting-star",
      imgurl:
        "https://cdn.shopify.com/s/files/1/0557/3594/3342/products/20210707_162003_1024x1024@2x.jpg?v=1626969050",
    },
  ]);
};
