// src/controllers/studentController.js
const { getStudentById, updateStudent, deleteStudent, getStudentTimetable,getClassmatesService } = require('../services/studentService');

const getStudentHandler = async (req, res) => {
  const studentId = req.user.studentId;  // Assuming `studentId` is set in `req.user` during authentication
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudentHandler = async (req, res) => {
  const studentId = req.user.studentId;
  const data = req.body;
  try {
    const updatedStudent = await updateStudent(studentId, data);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudentHandler = async (req, res) => {
  const studentId = req.user.studentId;
  try {
    await deleteStudent(studentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStudentTimetableHandler = async (req, res) => {
  const { id } = req.user;
  try {
    const timetable = await getStudentTimetable(id);
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassmatesHandler = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is obtained from authentication middleware
  try {
    const classmates = await getClassmatesService(userId);
    res.status(200).json(classmates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
  getStudentTimetableHandler,
  getClassmatesHandler
};
