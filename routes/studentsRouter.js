const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");

router.post("/", async (req, res) => {
  console.log("\nAttempting to POST new student...");

  const studentInfo = req.body;

  console.log("Checking if all required fields were supplied...");
  if (!studentInfo.name) {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: "Name not supplied."
    });
    console.log("Student POST attempt finished.");
  } else if (!studentInfo.cohort_id) {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: "Cohort ID not supplied."
    });
    console.log("Student POST attempt finished.");
  } else {
    console.log(
      `Checking if cohort with supplied ID [${studentInfo.cohort_id}] exists...`
    );
    try {
      const cohort = await db("cohorts")
        .where({ id: studentInfo.cohort_id })
        .first();
      if (cohort) {
        console.log("Proceeding to add the new student...");
        try {
          await db("students").insert(studentInfo);
          res.sendStatus(201);
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: err
          });
        }
      } else {
        const code = 400;
        res.status(code).json({
          success: false,
          code,
          errorInfo: "Cohort ID does not belong to any existing cohort."
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
      console.log("Student POST attempt finished.");
    }
  }
});

module.exports = router;
