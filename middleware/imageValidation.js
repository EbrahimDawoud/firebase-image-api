const { body } = require('express-validator');

exports.createImageValidation = [
  body('title')
  .notEmpty().withMessage('Title is required')
  .isLength({ min: 3, max: 50 }).withMessage('Title must be between 3 and 50 characters')
  .matches(/^(?!.*[_.\-]{2})[a-zA-Z0-9][a-zA-Z0-9 _.\\-]{1,48}[a-zA-Z0-9]$/)
  .withMessage('Title can only contain letters, numbers, spaces, underscores, hyphens, and periods, without consecutive special characters'),
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Must be a valid URL'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description can be up to 200 characters'),
];

exports.updateImageValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Title must be between 3 and 50 characters'),
  body('url')
    .optional()
    .isURL()
    .withMessage('Must be a valid URL'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description can be up to 200 characters'),
];

exports.shortenURLValidation = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Must be a valid URL'),
];
