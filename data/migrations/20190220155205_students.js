exports.up = (knex, Promise) => {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();
    tbl
      .text("name")
      .notNullable()
      .unique();
    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
  tbl.timestamps(true, true);
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists("students");
};
