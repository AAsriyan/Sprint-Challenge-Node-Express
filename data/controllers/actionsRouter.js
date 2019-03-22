const express = require("express");

const Actions = require("../helpers/actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving the projects.: ${error}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);

    action
      ? res.status(200).json(action)
      : res.status(404).json({
          message: `The action with the id #${req.params.id} does not exist.`
        });
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

router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "The action has been deleted."
      });
    } else {
      res.status(404).json({
        message: `The action with the id #${req.params.id} could not be found`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The action could not be removed."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { project_id, notes, description } = req.body;
    const { id } = req.params;

    if (!project_id) {
      res.status(404).json({
        message: `The project does not exist`
      });
    }

    if (!notes || !description) {
      res.status(400).json({
        message: "Please provide notes and a description for this action"
      });
    } else {
      const action = await Actions.update(id, req.body);
      res.status(200).json(action);
    }
  } catch (error) {
    res.status({
      error: `The action information could not be updated. ${error}`
    });
  }
});

module.exports = router;
