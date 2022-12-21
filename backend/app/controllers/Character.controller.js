const db = require("../models");
const Character = db.Characters;

// Create and Save a new Character
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Character
  const Character = new Character({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Character in the database
  Character
    .save(Character)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Character."
      });
    });
};

// Retrieve all Characters from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Character.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Characters."
      });
    });
};

// Find a single Character with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Character.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Character with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Character with id=" + id });
    });
};

// Update a Character by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Character.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Character with id=${id}. Maybe Character was not found!`
        });
      } else res.send({ message: "Character was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Character with id=" + id
      });
    });
};

// Delete a Character with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Character.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Character with id=${id}. Maybe Character was not found!`
        });
      } else {
        res.send({
          message: "Character was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Character with id=" + id
      });
    });
};

// Delete all Characters from the database.
exports.deleteAll = (req, res) => {
  Character.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Characters were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Characters."
      });
    });
};

// Find all published Characters
exports.findAllPublished = (req, res) => {
  Character.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Characters."
      });
    });
};
