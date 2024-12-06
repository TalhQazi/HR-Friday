const express = require('express');
const router = express.Router();
const trainingController = require('../Controllers/trainingController'); // Update the path as necessary

// Training routes
router.post('/create', trainingController.createTraining); // Create a training
router.get('/getAll', trainingController.getAllTrainings); // Get all trainings
router.get('/getCompanyTraining/:companyId', trainingController.getAllTrainings); // Get all trainings
router.get('/:id', trainingController.getTrainingById); // Get a specific training
router.put('/update/:id', trainingController.updateTraining); // Update a training
router.delete('/delete/:id', trainingController.deleteTraining); // Delete a training
router.patch('/:id/status', trainingController.updateTrainingStatus); // Update training status

module.exports = router;
