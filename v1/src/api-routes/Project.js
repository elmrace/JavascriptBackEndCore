const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/ProjectController');
const validate = require('../middlewares/validate');
const authenticaToken = require('../middlewares/authenticate');
const schemas = require('../validations/Project');

router.route('/').get(authenticaToken, index);
router.route('/:id').get(authenticaToken, show);
router.route('/').post(authenticaToken, validate(schemas.createValidation), store);
router.route('/:id').put(authenticaToken, update);
router.route('/:id').delete(authenticaToken, destroy);

module.exports = router;