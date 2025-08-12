// controllers/engins.controller.js
const Engin = require('../models/engin.model');

exports.getAll = async (req, res) => {
  try {
    const engins = await Engin.findAll();
    console.log(engins);
    res.json(engins);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving engins."
    });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const engin = await Engin.findById(id);
    if (engin) {
      res.json(engin);
    } else {
      res.status(404).send({
        message: `Engin with id=${id} not found.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Engin with id=${id}`
    });
  }
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.modele || !req.body.designation) {
    return res.status(400).send({
      message: "engin_id and designation are required fields."
    });
  }

  try {
    const result = await Engin.create(req.body);
    res.status(201).send({
      message: "Engin was created successfully.",
      data: result
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Engin."
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  
  if (!req.body.designation) {
    return res.status(400).send({
      message: "designation is a required field."
    });
  }

  try {
    const result = await Engin.update(id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: `Engin with id=${id} not found.`
      });
    } else {
      res.send({
        message: "Engin was updated successfully."
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Engin with id=${id}`
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Engin.delete(id);
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: `Engin with id=${id} not found.`
      });
    } else {
      res.send({
        message: "Engin was deleted successfully."
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Engin with id=${id}`
    });
  }
};