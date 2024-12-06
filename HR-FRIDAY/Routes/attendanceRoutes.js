const express = require("express");
const {
  createAttendance,
  getAttendanceRecords,
  updateAttendance,
  deleteAttendance,
  getAttendanceById,
} = require("../Controllers/attendanceController");

const router = express.Router();

router.route("/").post(createAttendance).get(getAttendanceRecords);
router
  .route("/:id")
  .get(getAttendanceById)
  .put(updateAttendance)
  .delete(deleteAttendance);

module.exports = router;
