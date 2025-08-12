const express = require('express');
const router = express.Router();
const respoController = require('../controllers/responsable.controller');

router.get('',respoController.getAll);
router.post('/',respoController.create);

router.get('/:nom',respoController.getEmailByNom);
router.put('/:nom',respoController.update);
router.delete('/:nom',respoController.delete);

module.exports = router;