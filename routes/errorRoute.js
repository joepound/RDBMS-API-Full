module.exports = function(req, res) {
  res.status(400).send(`
    <h1>Code 400</h1>
    <p>Invalid request.</p>
  `);
};
