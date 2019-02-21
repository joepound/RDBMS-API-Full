const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");

router.post("/", async (req, res) => {
  console.log("\nAttempting to POST new cohort...");

  const cohortInfo = req.body;

  console.log("Checking if name was supplied...");
  if (cohortInfo.name) {
    console.log("Proceeding to add the new cohort...");
    try {
      await db("cohorts").insert(cohortInfo);
      res.sendStatus(201);
    } catch (err) {
      const code = 500;
      res.status(code).json({
        success: false,
        code,
        errorInfo: err
      });
    } finally {
      console.log("Action POST attempt finished.");
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: err
    });
    console.log("Action POST attempt finished.");
  }
});

router.get("/", async (req, res) => {
  console.log("\nAttempting to GET all cohorts...");
  try {
    const cohorts = await db("cohorts");
    res.status(200).json({
      success: true,
      cohorts
    });
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: err
    });
  } finally {
    console.log("GET all cohorts attempt finished.");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to GET cohort with ID [${id}]...`);
  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    if (cohort) {
      res.status(200).json({
        success: true,
        cohort
      });
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: err
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: err
    });
  } finally {
    console.log("GET attempt for cohort ID [${id}] finished.");
  }
});

router.get("/:id/students", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to GET all students in cohort with ID [${id}]...`);
  try {
    const students = await db("cohorts")
      .join("students", {
        "cohorts.id": "students.cohort_id"
      })
      .where({ "cohorts.id": id });
    res.status(200).json(students);
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: err
    });
  } finally {
    console.log("GET attempt for cohort ID [${id}] finished.");
  }
});

module.exports = router;
