const SousEnsemble = require('../models/sousEnsembles.model');

exports.getAll = async (req, res) => {
  try {
    const sousEnsembles = await SousEnsemble.findAll();
    res.status(200).json(sousEnsembles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByDesignationAndEnginId = async (req, res) => {
  try {
    const {designation,enginId}= req.params;
    const sous_ensemble = await SousEnsemble.findByDesignationAndEnginId(designation,enginId);
    res.status(200).json(sous_ensemble);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await SousEnsemble.findAllDesignation();
    res.status(200).json(designations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.genererPlaning = async (req, res) => {
  try {
    const planing = await SousEnsemble.genererPlanning();
    res.status(200).json(planing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sousEnsemble = await SousEnsemble.findById(req.params.id);
    if (sousEnsemble) {
      res.status(200).json(sousEnsemble);
    } else {
      res.status(404).json({ message: 'Sous-ensemble non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByEnginId = async (req, res) => {
  try {
    const sousEnsembles = await SousEnsemble.findByEnginId(req.params.enginId);
    res.status(200).json(sousEnsembles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const createdSousEnsemble = await SousEnsemble.create(req.body);
    res.status(201).json(createdSousEnsemble);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await SousEnsemble.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Sous-ensemble non trouvé' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await SousEnsemble.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Sous-ensemble non trouvé' });
    } else {
      res.status(200).json({ message: 'Sous-ensemble supprimé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Méthodes KPI
exports.getDisponibilityRate = async (req, res) => {
  try {
    const rate = await SousEnsemble.calculateDisponibilityRate(req.params.id);
    res.status(200).json({ rate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRevisionOccupationRate = async (req, res) => {
  try {
    const rate = await SousEnsemble.calculateRevisionOccupationRate(req.params.id);
    res.status(200).json({ rate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTotalMaintenanceCost = async (req, res) => {
  try {
    const cost = await SousEnsemble.calculateTotalMaintenanceCost(req.params.id);
    res.status(200).json({ cost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPerformanceRatio = async (req, res) => {
  try {
    const ratio = await SousEnsemble.calculatePerformanceRatio(req.params.id);
    res.status(200).json({ ratio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTimeToNextRevision = async (req, res) => {
  try {
    const estimation = await SousEnsemble.estimateTimeToNextRevision(req.params.id);
    res.status(200).json(estimation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSafetyStockNeed = async (req, res) => {
  try {
    const stock = await SousEnsemble.calculateSafetyStockNeed(req.params.id);
    res.status(200).json({ stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getROI = async (req, res) => {
  try {
    const roi = await SousEnsemble.calculateROI(req.params.id);
    res.status(200).json({ roi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};