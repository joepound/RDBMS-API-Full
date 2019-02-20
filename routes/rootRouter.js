const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send(`
    <h1>Lambda roster API</h1>
    <p>Welcome to the Lambda roster API!</p>
  `)
});

module.exports = router;