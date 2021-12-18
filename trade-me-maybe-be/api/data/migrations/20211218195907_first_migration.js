exports.up = async (knex) => {
    await knex.schema
  
      .createTable("users", (users) => {
        users.increments("user_id");
        users.string("username", 200).notNullable().unique();
        users.string("password", 200).notNullable();
        users.string("collections", 200);
        users.string("contact_info", 200).notNullable();
      })
      .createTable("pins", (pins) => {
        pins.increments("pin_id");
        pins.string("maker", 200).notNullable();
        pins.string("tags", 200).notNullable();
        pins.string("imgURL", 200).notNullable();
      })
      .createTable("pins_have", (pins) => {
        pins.increments("have_id");
        pins
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("user_id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        pins
          .integer("pin_id")
          .unsigned()
          .notNullable()
          .references("pin_id")
          .inTable("pins")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
      .createTable("pins_iso", (pins) => {
        pins.increments("iso_id");
        pins
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("user_id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        pins
          .integer("pin_id")
          .unsigned()
          .notNullable()
          .references("pin_id")
          .inTable("pins")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("pins_iso");
    await knex.schema.dropTableIfExists("pins_have");
    await knex.schema.dropTableIfExists("pins");
    await knex.schema.dropTableIfExists("users");
  };
  