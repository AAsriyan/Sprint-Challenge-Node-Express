const express = require("express");

const Actions = require("../helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ err }));

  // Async await not working for some reason??

  // try {
  //   const actions = await Actions.get(req.query);
  //   console.log(actions);
  //   res.status(200).json(actions);
  // } catch (error) {
  //   res.status(500).json({ error: `Error retrieving the projects.: ${error}` });
  // }
});

router.get("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);

    if (!action) {
      res.status(404).json({
        message: `The action with the id #${req.params.id} does not exist.`
      });
    } else {
      res.status(200).json(action);
    }
  } catch (error) {
    res.status(500).json({
      error: `The action information could not be found. ${error}`
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { project_id, description, notes } = req.body;

    if (!project_id) {
      res.status(404).json({
        message: "This project id does not exist for this action"
      });
    }

    if (!notes || !description) {
      res.status(400).json({
        error: "Please provide a name and description for your action."
      });
    } else {
      const action = await Actions.insert(req.body);
      res.status(201).json(action);
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the action to the database."
    });
  }
});

module.exports = router;
