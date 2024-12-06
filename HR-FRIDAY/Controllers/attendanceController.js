const Attendance = require("../models/attendance");

// Create Attendance Record
exports.createAttendance = async (req, res, next) => {
  try {
    // List of required fields for attendance
    const requiredFields = [
      "companyID",
      "employeeID",
      "employeeName",
      "jobTitle",
      "comeTime",
      "comeLocation",
      "comeLat",
      "comeLong",
      "offTime",
      "offLocation",
      "offLat",
      "offLong",
      "status",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} Required`,
      });
    }

    // Create attendance record if all fields are present
    const attendance = await Attendance.create(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceRecords = async (req, res, next) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};
exports.getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

// Update Attendance Record
exports.updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

// Delete Attendance Record
exports.deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Attendance record deleted" });
  } catch (err) {
    next(err);
  }
};
