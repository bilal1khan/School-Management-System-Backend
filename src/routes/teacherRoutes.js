// src/routes/teacherRoutes.js
const express = require('express');
const { createTimetableHandler, studentsTeacherHandler, timetablesHandler, getClassroomsHandler, getTeachersHandler, getTeacherTimetableHandler, updateTimetableHandler } = require('../controllers/teacherController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo(['TEACHER']));

router.post('/create-timetable', createTimetableHandler);
router.get('/students', studentsTeacherHandler);
router.get('/timetables/:classroomId', timetablesHandler);

router.get('/teachers', getTeachersHandler);
router.get('/classrooms', getClassroomsHandler);
router.get('/view-timetable', getTeacherTimetableHandler);
router.put('/update-timetable/:timetableId', updateTimetableHandler);


module.exports = router;