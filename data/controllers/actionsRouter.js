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

module.exports = router;
