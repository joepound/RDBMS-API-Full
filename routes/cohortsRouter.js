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
      console.log("Cohort POST attempt finished.");
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: "Name not supplied."
    });
    console.log("Cohort POST attempt finished.");
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
        errorInfo: `Cohort with ID [${id}] not found.`
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
    if (students.length) {
      res.status(200).json(students);
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: `Cohort with ID [${id}] not found.`
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(
    `\nAttempting to PUT information updates for cohort with ID [${id}]...`
  );

  const infoUpdate = req.body;

  console.log(
    "Checking if all required fields were supplied and update is valid..."
  );
  if (infoUpdate.id) {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: "ID updates are not allowed."
    });
    console.log(`Finished PUT attempt for cohort with ID [${id}]`);
  } else if (infoUpdate.name) {
    console.log(`Proceeding to update cohort with ID [${id}]...`);
    try {
      const updatedCohort = await db("cohorts")
        .where({ id })
        .update(infoUpdate);
      if (updatedCohort) {
        res.sendStatus(204);
      } else {
        const code = 404;
        res.status(code).json({
          success: false,
          code,
          errorInfo: `Cohort with ID [${id}] not found.`
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
      console.log(`Finished PUT attempt for cohort with ID [${id}]`);
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: "Name not supplied."
    });
    console.log(`Finished PUT attempt for cohort with ID [${id}]`);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to DELETE cohort with ID [${id}]...`);
  try {
    const deletedCohort = await db("cohorts")
      .where({ id })
      .del();
    if (deletedCohort) {
      res.sendStatus(204);
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: `Cohort with ID [${id}] not found.`
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
    console.log(`Finished DELETE attempt for cohort with ID [${id}]`);
  }
});

module.exports = router;
