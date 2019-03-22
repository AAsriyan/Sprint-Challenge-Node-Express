const express = require("express");

const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ err }));

  // Async await not working for some reason??

  // try {
  //   const projects = await Projects.get(req.body);
  //   console.log(projects);
  //   res.status(200).json(projects);
  // } catch (error) {
  //   res.status(500).json({ error: `Error retrieving the projects. ${error}` });
  // }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);

    if (!project) {
      res.status(404).json({
        message: `The project with the id #${req.params.id} does not exist.`
      });
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json({
      error: `The project information could not be found. ${error}`
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({
        error: "Please provide a name and description for you project."
      });
    } else {
      const project = await Projects.insert(req.body);
      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the project to the database."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    await actions.forEach(async action => {
      await Actions.remove(action.id);
    });
    const count = await Projects.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "The project has been deleted."
      });
    } else {
      res.status(404).json({
        message: `The project with the id #${req.params.id} could not be found`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The project could not be removed."
    });
  }
});

module.exports = router;
