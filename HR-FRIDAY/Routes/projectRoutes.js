const express = require('express');
const projectController = require('../Controllers/projectController');

const router = express.Router();

router.post('/create', projectController.createProject);
router.get('/fetch', projectController.getAllProjects);
router.get('/fetch/:id', projectController.getProjectById);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);

module.exports = router;
