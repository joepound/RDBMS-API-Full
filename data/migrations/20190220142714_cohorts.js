exports.up = (knex, Promise) => {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.increments();
    tbl
      .text("name")
      .notNullable()
      .unique();
    tbl.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists("cohorts");
};
