const express = require('express');
const router = express.Router();
router.use(express.json());

const Action = require('./actionModel');


router.post('/', (req, res) => {
    const {project_id} = req.params;
    const notes = req.body.notes;
    const description = req.body.description;

    if(!notes || !description || description.length > 128) {
        res.status(400).json({message: "Notes must be included and description is capped at 128 characters max."});
    } else {
        Action.insert({description, notes, project_id})
        .then(({ id }) => {
            Action.get(id)
              .then(act => {
                res.status(201).json(act);
              })
              .catch(err => {
                console.log("error", err);
                res.status(500).json({ error: "There was an error while saving the action to the database."});
              });
          });
        }
      });


router.get("/", (req, res) => {
    Action.get()
      .then(act => {
        res.status(200).json(act);
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry, not valid" });
      });
  });

  router.get("/:id", (req, res) => {
    const {id} = req.params;
    Action.get(id)
      .then(act => {
        res.status(200).json(act);
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry, not valid" });
      });
  });

  router.delete("/:id", (req, res) => {
    const {id} = req.params;
    Action.remove(id)
      .then(act => {
        res.status(200).json(act);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unsuccessful delete" });
      });
  });

  router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    Action.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "Did not update" });
      });
  });


module.exports = router;    