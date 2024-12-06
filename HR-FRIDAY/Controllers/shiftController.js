const Shift = require('../models/shift'); // Update the path to your model

// Create a Shift
const createShift = async (req, res) => {
  try {
    const { companyId, shiftName, shiftId, shiftStartingTime, shiftEndingTime } = req.body;

    const shift = new Shift({
      companyId,
      shiftName,
      shiftId,
      shiftStartingTime,
      shiftEndingTime,
    });

    await shift.save();
    res.status(201).json({ message: 'Shift created successfully', data: shift });
  } catch (error) {
    res.status(400).json({ message: 'Error creating shift', error: error.message });
  }
};

// Get All Shifts
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json({ data: shifts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shifts', error: error.message });
  }
};

// Get a Shift by ID
const getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    res.status(200).json({ data: shift });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shift', error: error.message });
  }
};

// Update a Shift
const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const shift = await Shift.findByIdAndUpdate(id, updatedData, { new: true });
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    res.status(200).json({ message: 'Shift updated successfully', data: shift });
  } catch (error) {
    res.status(400).json({ message: 'Error updating shift', error: error.message });
  }
};

// Delete a Shift
const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await Shift.findByIdAndDelete(id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shift', error: error.message });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};
