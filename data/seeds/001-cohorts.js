exports.seed = (knex, Promise) => {
  const webFullTimeCohorts = Array(19)
    .fill()
    .map((row, i) => ({ name: `web${i + 1}` }));
  const webPartTimeCohorts = Array(4)
    .fill()
    .map((row, i) => ({ name: `webPT${i + 1}` }));

  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("cohorts").insert([
        ...webFullTimeCohorts,
        ...webPartTimeCohorts
      ]);
    });
};
