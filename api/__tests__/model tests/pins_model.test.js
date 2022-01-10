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
      maker: "pastel shooting star",
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
      res = await Pins.findByMaker("pastel shooting star");
    });
    it("returns correct # of pins by that maker", () => {
      expect(res).toHaveLength(2);
    });
    it("returns the correct pins", () => {
      expect(res[0].pin_id).toBe(1);
      expect(res[1].pin_id).toBe(5);
      expect(res[0].maker).toBe("pastel shooting star");
      expect(res[1].maker).toBe("pastel shooting star");
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
      res = await Pins.findByTag("princess serenity");
    });
    it("returns correct number of pins with that tag", () => {
      expect(res).toHaveLength(3);
    });
    it("returns correct pins", () => {
      expect(res[0].maker).toBe("astral pins");
      expect(res[1].maker).toBe("moon rabbit pins");
      expect(res[2].maker).toBe("nyxxi pins");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("create(new_pin)", () => {
    it.todo("returns the newly-created pin");
    it.todo("adds a pin to the db");
    it.todo("returns data in the correct shape");
  });

  describe("update(pin_id, updated_pin)", () => {
    it.todo("returns updated pin");
    it.todo("finds the updated pin the db");
    it.todo("returns data in the correct shape");
  });

  describe("remove(pin_id)", () => {
    it.todo("removes the correct pin");
    it.todo("returns removed pin");
    it.todo("removes pin from the db");
    it.todo("returns data in the correct shape");
  });
});
