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

describe("testing all the user model functions", () => {
  describe("findUser(filter)", () => {
    let res;
    beforeEach(async () => {
      res = await Users.findUser({ user_id: 1 });
    });
    it("finds the correct user by user_id", () => {
      expect(res.username).toBe("princess_serenity");
      expect(res.user_id).toBe(1);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  //TODO write tests for findUserHashedPW(username)

  describe("findUserIso(user_id)", () => {
    let res;
    beforeEach(async () => {
      res = await Users.findUserIso(2);
    });

    it("returns the correct # of ISOs", () => {
      expect(res).toHaveLength(2);
    });

    it("returns the correct ISOs", () => {
      expect(res[0].maker).toBe("astral-pins");
      expect(res[1].maker).toBe("moon-rabbit-pins");
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
      expect(res[0].maker).toBe("astral-pins");
      expect(res[1].maker).toBe("nyxxi-pins");
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
    it("adds a profile to the db", async () => {
      const getAll = await db("users");
      expect(getAll).toHaveLength(4);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("update(user)", () => {
    let res;
    const oldProfile = {
      user_id: 1,
      username: "princess_serenity",
      password: "123123",
      contact_info: "serenity",
    };

    const updatedProfile = {
      user_id: 1,
      username: "neo_queen_serenity",
      password: "123123",
      contact_info: "@serenity",
    };

    beforeEach(async () => {
      res = await Users.update(oldProfile.user_id, updatedProfile);
    });

    it("returns updated user", () => {
      expect(res.username).toBe(updatedProfile.username);
      expect(res.contact_info).toBe(updatedProfile.contact_info);
    });

    it("finds the updated user in the db", async () => {
      let user = await db("users")
        .select("user_id", "username", "contact_info")
        .where("user_id", oldProfile.user_id)
        .first();

      expect(user.username).toBe(updatedProfile.username);
      expect(user.contact_info).toBe(updatedProfile.contact_info);
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });

  describe("removeUser(user_id)", () => {
    let res;
    const deletedProfile = {
      user_id: 3,
      username: "minako_aino",
      password: "123123",
      contact_info: "sailor_v",
    };
    beforeEach(async () => {
      res = await Users.removeUser(deletedProfile.user_id);
    });

    it("removes the correct user", async () => {
      const removed = await db("users")
        .where("user_id", deletedProfile.user_id)
        .first();

      expect(removed).toBeUndefined();
    });
    it("returns removed user", () => {
      expect(res.username).toBe(deletedProfile.username);
      expect(res.contact_info).toBe(deletedProfile.contact_info);
      expect(res.user_id).toBe(deletedProfile.user_id);
    });
    it("removes user from the db", async () => {
      const allUsers = await db('users')
      expect(allUsers).toHaveLength(2)
    });
    it("returns data in the correct shape", () => {
      expect(res).toMatchSnapshot();
    });
  });
});
