exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "web1" },
        { name: "web2" },
        { name: "web3" },
        { name: "web4" },
        { name: "web5" },
        { name: "web6" },
        { name: "web7" },
        { name: "web8" },
        { name: "web9" },
        { name: "web10" },
        { name: "web11" },
        { name: "web12" },
        { name: "web13" },
        { name: "web14" },
        { name: "web15" },
        { name: "web16" },
        { name: "web17" },
        { name: "web18" },
        { name: "web19" },
        { name: "webPT1" },
        { name: "webPT2" },
        { name: "webPT3" },
        { name: "webPT4" }
      ]);
    });
};
