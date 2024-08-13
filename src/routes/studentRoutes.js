// src/routes/studentRoutes.js
const express = require('express');
const { getStudentHandler, updateStudentHandler, deleteStudentHandler, getStudentTimetableHandler, getClassmatesHandler } = require('../controllers/studentController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo(['STUDENT']));

router.get('/me', getStudentHandler);
router.patch('/me', updateStudentHandler);
router.delete('/me', deleteStudentHandler);
router.get('/timetable', getStudentTimetableHandler);
router.get('/classmates', getClassmatesHandler);

module.exports = router;
