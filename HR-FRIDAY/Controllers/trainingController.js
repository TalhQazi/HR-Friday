const Training = require('../Models/training'); // Update the path to your model

// Create Training
const createTraining = async (req, res) => {
  try {
    const { companyId, employeeName, title, description, startingDate, deadlineDate } = req.body;

    const training = new Training({
      companyId,
      employeeName,
      title,
      description,
      startingDate,
      deadlineDate,
      status: 'PENDING', // Default status
    });

    await training.save();
    res.status(201).json({ message: 'Training created successfully', data: training });
  } catch (error) {
    res.status(400).json({ message: 'Error creating training', error: error.message });
  }
};

// Get All Trainings
const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json({ data: trainings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainings', error: error.message });
  }
};

// Get Training by ID
const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Training not found' });

    res.status(200).json({ data: training });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching training', error: error.message });
  }
};

// Update Training
const updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const training = await Training.findByIdAndUpdate(id, updatedData, { new: true });
    if (!training) return res.status(404).json({ message: 'Training not found' });

    res.status(200).json({ message: 'Training updated successfully', data: training });
  } catch (error) {
    res.status(400).json({ message: 'Error updating training', error: error.message });
  }
};

// Delete Training
const deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await Training.findByIdAndDelete(id);
    if (!training) return res.status(404).json({ message: 'Training not found' });

    res.status(200).json({ message: 'Training deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting training', error: error.message });
  }
};

// Update Training Status
const updateTrainingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Ensure the status value is valid
    if (!['COMPLETED', 'PENDING', 'UPCOMING'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const training = await Training.findByIdAndUpdate(id, { status }, { new: true });
    if (!training) return res.status(404).json({ message: 'Training not found' });

    res.status(200).json({ message: 'Training status updated successfully', data: training });
  } catch (error) {
    res.status(400).json({ message: 'Error updating training status', error: error.message });
  }
};

const getCompanyTrainings = async (req, res) => {
  try {
    const { companyId } = req.params;
    const trainings = await Training.find({ companyId });
    res.status(200).json({ data: trainings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company trainings', error: error.message });
  }
};

module.exports = {
  createTraining,
  getAllTrainings,
  getCompanyTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
  updateTrainingStatus,
};
