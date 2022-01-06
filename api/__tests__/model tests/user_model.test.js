const db = require("../../data/db-config");
const Users = require("../../users/users_model");

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

describe("testing all the user models", () => {
  describe("findUser(user_id)", () => {
    let res;
    beforeEach(async () => {
      res = await Users.findUser(1);
    });
    it("finds the correct user by user_id", () => {
      expect(res.username).toBe("princess_serenity");
      expect(res.user_id).toBe(1);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findUserIso(user_id)", () => {
    let res;
    beforeEach(async () => {
      res = await Users.findUserIso(2);
    });

    it("returns the correct # of ISOs", () => {
      expect(res).toHaveLength(2);
    });

    it("returns the correct ISOs", () => {
      expect(res[0].maker).toBe("Astral Pins");
      expect(res[1].maker).toBe("Moon Rabbit Pins");
    });

    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("findUserHave(user_id)", () => {
    let res;
    beforeEach(async () => {
      res = await Users.findUserHave(1);
    });
    it("returns the correct # of pins a user has", () => {
      expect(res).toHaveLength(2);
    });
    it("returns the correct pins they have", () => {
      expect(res[0].maker).toBe("Astral Pins");
      expect(res[1].maker).toBe("Nyxxi Pins");
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("create(user)", () => {
    let res;
    const newProfile = {
      username: "yuki_miaka",
      password: "abc123",
      contact_info: "miaka77cfns",
    };
    beforeEach(async () => {
      res = await Users.create(newProfile);
    });
    it("returns newly-create profile", () => {
      expect(res.username).toBe("yuki_miaka");
      expect(res.contact_info).toBe("miaka77cfns");
    });
    it("adds a profile to the database", async () => {
      const getAll = await db("users");
      expect(getAll).toHaveLength(4);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("update(user)", () => {
    it.todo("returns updated user");
    it.todo("filler");
    it.todo("filler");
  });

  describe("removeUser(user_id)", () => {
    it.todo("filler");
    it.todo("filler");
    it.todo("filler");
  });
});
