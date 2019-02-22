require("dotenv").config();

const port = process.env.PORT || 5000;

const server = require("./server");
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
