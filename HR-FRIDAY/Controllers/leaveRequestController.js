const Leave = require("../models/leaveRequest");

// Create Leave Request
exports.createLeaveRequest = async (req, res, next) => {
  try {
    const requiredFields = [
      "companyID",
      "employeeID",
      "name",
      "department",
      "leaveDate",
      "status",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: ` ${missingFields.join(", ")} Required!`,
      });
    }

    // Create leave request if all fields are present
    const leave = await Leave.create(req.body);
    res.status(201).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};

// Get All Leave Requests
exports.getLeaveRequests = async (req, res, next) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json({ success: true, data: leaves });
  } catch (err) {
    next(err);
  }
};
// Get Leave Request by ID
exports.getLeaveRequestById = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res.status(200).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};

// Update Leave Request
exports.updateLeaveRequest = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body);
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res.status(200).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};

// Delete Leave Request
exports.deleteLeaveRequest = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res.status(200).json({ success: true, message: "Leave request deleted" });
  } catch (err) {
    next(err);
  }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status)
    const leave = await Leave.findByIdAndUpdate(id, {status:status},{ new : true});

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    res.status(200).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};