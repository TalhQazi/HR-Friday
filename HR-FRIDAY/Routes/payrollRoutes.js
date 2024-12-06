const express = require('express');
const router = express.Router();
const payrollController = require('../Controllers/payrollController'); // Update the path as necessary

// Payroll routes
router.post('/create', payrollController.createPayroll);
router.get('/getPayrolls', payrollController.getAllPayrolls);
router.get('/getPayrollById/:id', payrollController.getPayrollById);
router.put('/updatePayroll/:id', payrollController.updatePayroll);
router.delete('/delete/:id', payrollController.deletePayroll);
router.put('/updateStatus/:id', payrollController.updatePayrollStatus);

module.exports = router;
