const express = require("express");
const {
  createLeaveRequest,
  getLeaveRequests,
  updateLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestById,
  updateRequestStatus,
} = require("../controllers/leaveRequestController");

const router = express.Router();

router.route("/").post(createLeaveRequest).get(getLeaveRequests);
router
  .route("/:id")
  .get(getLeaveRequestById)
  .put(updateLeaveRequest)
  .delete(deleteLeaveRequest);


  router.put("/updateStatus/:id", updateRequestStatus);

module.exports = router;
