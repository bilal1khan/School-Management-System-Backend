// src/routes/principalRoutes.js
const express = require('express');
const {
  createTeacherHandler,
  createStudentHandler,
  createClassroomHandler,
  assignTeacherToClassroomHandler,
  teachersHandler,
  studentsHandler,
  classroomsHandler,
  assignStudentsToClassroomHandler,
  studentsWithNullClassroomHandler,
  getPrincipalTimetablesHandler,
  updateTimetableHandler,
  deleteStudentHandler,
  deleteTeacherHandler,
  updateStudentHandler,
  updateTeacherHandler
  
} = require('../controllers/principalController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo(['PRINCIPAL']));

router.post('/create-teacher', createTeacherHandler);
router.post('/create-student', createStudentHandler);
router.post('/create-classroom', createClassroomHandler);
router.post('/assign-teacher', assignTeacherToClassroomHandler);
router.post('/assign-students', assignStudentsToClassroomHandler);
router.get('/available-students', studentsWithNullClassroomHandler);
router.get('/teachers', teachersHandler);
router.get('/students', studentsHandler);
router.get('/classrooms', classroomsHandler);
router.get('/view-timetables', getPrincipalTimetablesHandler);
router.put('/update-timetable/:timetableId', updateTimetableHandler);

router.delete('/delete-student/:studentId', deleteStudentHandler);
router.delete('/delete-teacher/:teacherId', deleteTeacherHandler);
router.put('/update-student/:studentId', updateStudentHandler);
router.put('/update-teacher/:teacherId', updateTeacherHandler);

module.exports = router;
