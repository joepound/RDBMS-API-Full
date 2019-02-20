exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Jordan Massingill", cohort_id: 14 },
        { name: "Katy Hollobaugh", cohort_id: 17 },
        { name: "Michael Trevino", cohort_id: 15 },
        { name: "Josh Zieger", cohort_id: 18 },
        { name: "Caitlin Giguere", cohort_id: 16 }
      ]);
    });
};
