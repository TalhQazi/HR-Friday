const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController'); // Update the path to your controller

// Create a Shift
router.post('/create', shiftController.createShift);

// Get all Shifts
router.get('/getAll', shiftController.getAllShifts);

// Get a specific Shift by ID
router.get('/get/:id', shiftController.getShiftById);

// Update a Shift by ID
router.put('/update/:id', shiftController.updateShift);

// Delete a Shift by ID
router.delete('/delete/:id', shiftController.deleteShift);

module.exports = router;
