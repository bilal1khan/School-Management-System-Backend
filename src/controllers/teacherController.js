// src/controllers/teacherController.js
const { createTimetable, studentsTeacherService, timetablesForClassroom, getClassrooms, getTeachers, getTeacherTimetable, updateTimetable } = require('../services/teacherService');

const createTimetableHandler = async (req, res) => {
  const { classroomId, day, periods } = req.body;
  try {
    const timetables = await createTimetable(parseInt(classroomId), day, periods);
    res.status(201).json(timetables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const timetablesHandler = async (req, res) => {
  const { classroomId } = req.params;
  try {
    const timetables = await timetablesForClassroom(classroomId);
    res.status(200).json(timetables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const studentsTeacherHandler = async (req, res) => {
  const user = req.user;
  try {
    const students = await studentsTeacherService(user.id);
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClassroomsHandler = async (req, res) => {
  try {
    const classrooms = await getClassrooms();
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeachersHandler = async (req, res) => {
  const user = req.user;
  try {
    const teachers = await getTeachers(user.id);
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacherTimetableHandler = async (req, res) => {
  const { userId } = req.user; // Assuming userId is extracted from JWT
  try {
    const timetable = await getTeacherTimetable(userId);
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateTimetableHandler = async (req, res) => {
  const { timetableId } = req.params;
  const data = req.body;

  try {
    const updatedTimetable = await updateTimetable(timetableId, data);
    res.status(200).json(updatedTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { createTimetableHandler, studentsTeacherHandler,timetablesHandler , getTeachersHandler, getClassroomsHandler, getTeacherTimetableHandler, updateTimetableHandler};
