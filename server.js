const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Projects API</h2>
    <p>Welcome to the Lambda Projects API</p>
    <p>Greeting: ${process.env.GREETING}</p>
  `);
});

module.exports = server;
