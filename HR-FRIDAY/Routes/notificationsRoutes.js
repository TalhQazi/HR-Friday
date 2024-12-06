const express = require('express');
const notificationController = require('../Controllers/notificationController');

const router = express.Router();

router.post('/', notificationController.createNotification); // Create a notification
router.get('/', notificationController.getAllNotifications); // Get all notifications
router.get('/:id', notificationController.getNotificationById); // Get notification by ID
router.put('/:id', notificationController.updateNotification); // Update a notification
router.delete('/:id', notificationController.deleteNotification); // Delete a notification

module.exports = router;
