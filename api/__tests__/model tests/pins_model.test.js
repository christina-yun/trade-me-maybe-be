const db = require("../../data/db-config");
const Pins = require("../../pins/pins_model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("testing all the pin model functions", () => {
  describe("findPinById(pin_id)", () => {
    let res;

    const pin = {
      pin_id: 1,
      maker: "pastel-shooting-star",
      imgurl:
        "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/",
    };

    beforeEach(async () => {
      res = await Pins.findById(pin.pin_id);
    });

    it("finds the correct pin by pin_id", () => {
      expect(res.maker).toBe(pin.maker);
      expect(res.imgurl).toBe(pin.imgurl);
    });

    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findByMaker(maker)", () => {
    let res;
    beforeEach(async () => {
      res = await Pins.findByMaker("pastel-shooting-star");
    });
    it("returns correct # of pins by that maker", () => {
      expect(res).toHaveLength(2);
    });
    it("returns the correct pins", () => {
      expect(res[0].pin_id).toBe(1);
      expect(res[1].pin_id).toBe(5);
      expect(res[0].maker).toBe("pastel-shooting-star");
      expect(res[1].maker).toBe("pastel-shooting-star");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findUsersIsoPin", () => {
    let res;

    beforeEach(async () => {
      res = await Pins.findUsersIsoPin(3);
    });

    it("returns correct # of users ISO that pin", () => {
      expect(res).toHaveLength(2);
    });
    it("returns a list of users ISO that pin", () => {
      expect(res[0].username).toBe("princess_serenity");
      expect(res[1].username).toBe("rei_hino");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findUsersWhoHavePin", () => {
    let res;

    beforeEach(async () => {
      res = await Pins.findUsersWhoHavePin(4);
    });
    it("returns correct # users who have the pin FT", () => {
      expect(res).toHaveLength(2);
    });
    it("returns a list of users who have the pin FT", () => {
      expect(res[0].username).toBe("princess_serenity");
      expect(res[1].username).toBe("minako_aino");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findByTag(tag_name)", () => {
    let res;

    beforeEach(async () => {
      res = await Pins.findByTag("princess-serenity");
    });
    it("returns correct number of pins with that tag", () => {
      expect(res).toHaveLength(3);
    });
    it("returns correct pins", () => {
      expect(res[0].maker).toBe("astral-pins");
      expect(res[1].maker).toBe("moon-rabbit-pins");
      expect(res[2].maker).toBe("nyxxi-pins");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("createPin(new_pin)", () => {
    let res;

    const new_pin = {
      maker: "disney-lagoon",
      imgurl:
        "https://www.instagram.com/p/CQjnfaOsYo9v8EFjjpZHNFTEMFkXsBNKaOgcDY0/",
    };

    beforeEach(async () => {
      res = await Pins.createPin(new_pin);
    });
    it("returns the newly-created pin", () => {
      expect(res.pin_id).toBe(6);
      expect(res.maker).toBe("disney-lagoon");
      expect(res.imgurl).toBe(
        "https://www.instagram.com/p/CQjnfaOsYo9v8EFjjpZHNFTEMFkXsBNKaOgcDY0/"
      );
    });
    it("adds a pin to the db", async () => {
      const all_pins = await db("pins");

      expect(all_pins).toHaveLength(6);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("updatePin(pin_id, updated_pin)", () => {
    let res;

    const updated_pin = {
      pin_id: 1,
      maker: "pastel-shooting-star",
      imgurl:
        "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/",
    };

    beforeEach(async () => {
      res = await Pins.updatePin(1, updated_pin);
    });
    it("returns updated pin", () => {
      expect(res.pin_id).toBe(updated_pin.pin_id);
      expect(res.maker).toBe(updated_pin.maker);
      expect(res.imgurl).toBe(updated_pin.imgurl);
    });
    it("finds the updated pin the db", async () => {
      let get_pin = await db("pins").where("pin_id", 1).first();

      expect(get_pin.maker).toBe(updated_pin.maker);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("removePin(pin_id)", () => {
    let res;

    const removed_pin = {
      pin_id: 4,
      maker: "nyxxi-pins",
      imgurl:
        "https://www.instagram.com/p/CV4SIHYMior9IXyDEmBh-UBfnfFnx6k4Qda2eY0/",
    };

    beforeEach(async () => {
      res = await Pins.removePin(removed_pin.pin_id);
    });
    it("returns removed pin", () => {
      expect(res.pin_id).toBe(4);
      expect(res.maker).toBe(removed_pin.maker);
      expect(res.imgurl).toBe(removed_pin.imgurl);
    });
    it("removes the correct pin", async () => {
      const removed = await db("pins")
        .where("pin_id", removed_pin.pin_id)
        .first();

      expect(removed).toBeUndefined();
    });
    it("removes pin from the db", async () => {
      const all_pins = await db("pins");

      expect(all_pins).toHaveLength(4);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("createTag(new_tag)", () => {
    let res;

    const new_tag = {
      tag_name: "serenity",
      pin_id: 2,
    };

    beforeEach(async () => {
      res = await Pins.createTag(new_tag);
    });

    it("returns newly-created tag", () => {
      expect(res.tags_id).toBe(11);
      expect(res.tag_name).toBe(new_tag.tag_name);
      expect(res.pin_id).toBe(new_tag.pin_id);
    });
    it("adds a tag to the db", async () => {
      const allPins = await db("pin_tags");

      expect(allPins).toHaveLength(11);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("removeTag(tags_id)", () => {
    let res;

    const removed_tag = {
      tags_id: 10,
      tag_name: "art-nouveau",
      pin_id: 4,
    };

    beforeEach(async () => {
      res = await Pins.removeTag(10);
    });
    it("returns the removed pin", () => {
      expect(res.tags_id).toBe(removed_tag.tags_id);
      expect(res.tag_name).toBe(removed_tag.tag_name);
      expect(res.pin_id).toBe(removed_tag.pin_id);
    });
    it("removes the correct pin", async () => {
      const checkPin = await db("pin_tags")
        .where("tags_id", removed_tag.tags_id)
        .first();

      expect(checkPin).toBeUndefined();
    });
    it("removes pin from the db", async () => {
      const allPins = await db("pin_tags");

      expect(allPins).toHaveLength(9);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe('addISO(new_iso)', () => {
    let res;

    const new_iso = {
      user_id: 1,
      pin_id: 2,
    };

    beforeEach(async () => {
      res = await Pins.addISO(new_iso);
    });

    it("returns newly-created iso", () => {
      expect(res.iso_id).toBe(5);
      expect(res.user_id).toBe(new_iso.user_id);
      expect(res.pin_id).toBe(new_iso.pin_id)
      expect(res.maker).toBe('astral-pins');
    });
    it("adds an iso to the db", async () => {
      const allISOs = await db("pins_iso");

      expect(allISOs).toHaveLength(5);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  })

  describe('addHave(new_have)', () => {
    let res;

    const new_have = {
      user_id: 2,
      pin_id: 2,
    };

    beforeEach(async () => {
      res = await Pins.addHave(new_have);
    });

    it("returns newly-created have", () => {
      expect(res.have_id).toBe(6);
      expect(res.user_id).toBe(new_have.user_id);
      expect(res.pin_id).toBe(new_have.pin_id);
      expect(res.maker).toBe('astral-pins')
    });
    it("adds a have to the db", async () => {
      const allHaves = await db("pins_have");

      expect(allHaves).toHaveLength(6);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  })

  describe('removeISO(iso_id)', () => {
    let res;

    const removed_iso = {
      iso_id: 4,
      user_id: 2,
      pin_id: 3,
      maker: 'moon-rabbit-pins',
      imgurl: 'https://www.instagram.com/p/CSiW5xiFs0H/'
    };

    beforeEach(async () => {
      res = await Pins.removeISO(4);
    });
    it("returns the removed ISO", () => {
      expect(res.iso_id).toBe(removed_iso.iso_id);
      expect(res.user_id).toBe(removed_iso.user_id);
      expect(res.pin_id).toBe(removed_iso.pin_id);
    });
    it("removes the correct ISO", async () => {
      const checkISO = await db("pins_iso")
        .where("iso_id", removed_iso.iso_id)
        .first();

      expect(checkISO).toBeUndefined();
    });
    it("removes ISO from the db", async () => {
      const allISOs = await db("pins_iso");

      expect(allISOs).toHaveLength(3);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  })

  describe('removeHave(have_id)', () => {
    let res;

    const removed_have = {
      have_id: 4,
      user_id: 3,
      pin_id: 1,
      maker: 'pastel-shooting-star',
      imgurl: 'https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/'
    };

    beforeEach(async () => {
      res = await Pins.removeHave(4);
    });
    it("returns the removed have", () => {
      expect(res.have_id).toBe(removed_have.have_id);
      expect(res.user_id).toBe(removed_have.user_id);
      expect(res.pin_id).toBe(removed_have.pin_id);
    });
    it("removes the correct have", async () => {
      const checkHave = await db("pins_have")
        .where("have_id", removed_have.have_id)
        .first();

      expect(checkHave).toBeUndefined();
    });
    it("removes have from the db", async () => {
      const allHaves = await db("pins_have");

      expect(allHaves).toHaveLength(4);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  })


});
