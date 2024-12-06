const Employee = require("../Models/employee");

// Create Employee
exports.createEmployee = async (req, res, next) => {
  try {
    const requiredFields = [
      "companyID",
      "employeeName",
      "CNIC",
      "phoneNumber",
      "email",
      "password",
      "address",
      "employeeID",
      "employeeType",
      "shift",
      "joiningDate",
      "jobTitle",
      "department",
      "seniorityLevel",
      "branch",
      "baseSalary",
      "totalPackage",
      "overTime",
      "commission",
      "benefits",
      "taxRate",
      "numberOfPaidLeave",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: ` ${missingFields.join(", ")} Required!`,
      });
    }

    const existingEmployee = await Employee.findOne({
      $or: [{ CNIC: req.body.CNIC }, { email: req.body.email }],
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee with the same CNIC or email already exists",
      });
    }

    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// Get All Employees
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// Update Employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (err) {
    next(err);
  }
};
