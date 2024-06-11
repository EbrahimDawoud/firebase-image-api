const express = require('express');
const { getAllImages, createImage, getImageById, updateImage, deleteImage, shortenLink } = require('../controllers/imageController');
const { validatorActivator } = require('../middleware/validation');
const { createImageValidation, updateImageValidation, shortenURLValidation } = require('../middleware/imageValidation');

const router = express.Router();

router.route('/')
  .get(getAllImages)
  .post(createImageValidation, validatorActivator, createImage);

router.route('/:id')
  .get(getImageById)
  .put(updateImageValidation, validatorActivator, updateImage)
  .delete(deleteImage);

router.route('/shorten')
  .post(shortenURLValidation, validatorActivator, shortenLink);

module.exports = router;
