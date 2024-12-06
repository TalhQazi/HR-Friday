const Payroll = require('../models/payroll'); // Update the path as necessary
const Employee = require('../Models/employee'); // If you need to reference Employee data

// Create Payroll
const createPayroll = async (req, res) => {
  try {
    const { employeeId, baseSalary, overTime, commission, benefits, taxRate, previousPayoutDate, nextPayoutDate } = req.body;

    // Calculate total payable
    const totalPayable = baseSalary + overTime + commission + benefits - (baseSalary * taxRate / 100);

    const payroll = new Payroll({
      employeeId,
      baseSalary,
      overTime,
      commission,
      benefits,
      taxRate,
      totalPayable,
      previousPayoutDate,
      nextPayoutDate,
      status: 'UNPAID', // Default status
    });

    await payroll.save();
    res.status(201).json({ message: 'Payroll created successfully', data: payroll });
  } catch (error) {
    res.status(400).json({ message: 'Error creating payroll', error: error.message });
  }
};

// Get All Payrolls
const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employeeId', 'employeeName jobTitle'); // Populate employee details
    res.status(200).json({ data: payrolls });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payrolls', error: error.message });
  }
};

// Get Payroll by ID
const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('employeeId', 'employeeName jobTitle');
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    res.status(200).json({ data: payroll });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payroll', error: error.message });
  }
};

// Update Payroll
const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // If updating financials, recalculate totalPayable
    if (updatedData.baseSalary || updatedData.overTime || updatedData.commission || updatedData.benefits || updatedData.taxRate) {
      updatedData.totalPayable = updatedData.baseSalary +
        (updatedData.overTime || 0) +
        (updatedData.commission || 0) +
        (updatedData.benefits || 0) -
        (updatedData.baseSalary * updatedData.taxRate / 100);
    }

    const payroll = await Payroll.findByIdAndUpdate(id, updatedData, { new: true });
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    res.status(200).json({ message: 'Payroll updated successfully', data: payroll });
  } catch (error) {
    res.status(400).json({ message: 'Error updating payroll', error: error.message });
  }
};

// Delete Payroll
const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await Payroll.findByIdAndDelete(id);
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payroll', error: error.message });
  }
};

const updatePayrollStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payroll = await Payroll.findByIdAndUpdate(id, { status }, { new: true });
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    res.status(200).json({ message: 'Payroll status updated successfully', data: payroll });
  } catch (error) {
    res.status(400).json({ message: 'Error updating payroll status', error: error.message });
  }
};

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  updatePayrollStatus
};
