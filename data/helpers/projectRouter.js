const express = require('express');
const router = express.Router();
router.use(express.json());
const Action = require('./actionModel');
const Project = require('./projectModel');

router.post("/", (req, res) => {
    const { name, description } = req.body;
    console.log(req.body);
    if (!name || !description) {
      res.status(400).json({ errorMessage: "Please provide name and description for the project."});
    } else {
      Project.insert({ name, description })
      .then(({ id }) => {
        Project.get(id)
          .then(proj => {
            res.status(201).json(proj);
          })
          .catch(err => {
            console.log("error", err);
            res.status(500).json({ error: "There was an error while saving the project to the database."});
          });
      });
    }
  });


router.get("/", (req, res) => {
    Project.get()
      .then(proj => {
        res.status(200).json({ proj });
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry" });
      });
  })

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    Project.get(id)
      .then(proj => {
          if(proj) {
        res.status(200).json(proj);
          } else {
              res.status(404).json({message: "ID does not exist."});
          }
      })
      .catch(err => {
        res.status(500).json({ error: "The project with the specified ID does not exist" });
      });
  });

  router.delete("/:id", (req, res) => {
    const {id} = req.params;
    Project.remove(id)
    .then(deleted => {
        console.log(deleted);
        if (deleted) {
          res.status(204).end();
        } else {
          res
            .status(404)
            .json({ message: "The project with the specified ID does not exist." });
        }
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ error: "The project could not be removed." });
      });
  });

  router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    Project.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "did not update" });
      });
  });



module.exports = router;