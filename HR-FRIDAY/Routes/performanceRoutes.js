const express = require('express');
const performanceController = require('../Controllers/performanceController');

const router = express.Router();

router.post('/', performanceController.createPerformance);
router.get('/', performanceController.getAllPerformances);
router.get('/:id', performanceController.getPerformanceById);
router.put('/:id', performanceController.updatePerformance);
router.delete('/:id', performanceController.deletePerformance);

module.exports = router;
