const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");

router.get("/", async (req, res) => {
  console.log("\nAttempting to GET all cohorts...");
  try {
    const cohorts = await db("cohorts");
    res.status(200).json({
      success: true,
      cohorts
    })
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_ALL_ACTIONS_FAILURE
    });
  } finally {
    console.log("GET all cohorts attempt finished.");
  }
});

module.exports = router;
