const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

//middleware
router.param('id', tourController.checkID);
/**
 * Create a checkBox middleware
 * Check if body contains the price and name
 * if not, send back 400 (bad reques)
 * Add it to post handler stack
 */

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); // before creating they check body first
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
