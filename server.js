const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const projectsRouter = require("./data/controllers/projectsRouter");
const actionsRouter = require("./data/controllers/actionsRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Projects API</h2>
    <p>Welcome to the Lambda Projects API</p>
    <p>Greeting: ${process.env.GREETING}</p>
  `);
});

module.exports = server;
