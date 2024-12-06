const Performance = require('../Models/Performance');

// Create a new performance record
exports.createPerformance = async (req, res) => {
  try {
    const performance = new Performance(req.body);
    await performance.save();
    res.status(201).json(performance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all performance records
exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.find();
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single performance record by ID
exports.getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    if (!performance) return res.status(404).json({ error: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a performance record
exports.updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!performance) return res.status(404).json({ error: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a performance record
exports.deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);
    if (!performance) return res.status(404).json({ error: 'Performance not found' });
    res.json({ message: 'Performance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
