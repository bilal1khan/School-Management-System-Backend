// src/controllers/principalController.js
const {
    createTeacher,
    createStudent,
    createClassroom,
    assignTeacherToClassroom,
    teachers,
    students,
    classrooms,
    assignStudentsToClassroom,
    studentsWithNullClassroom,
    getPrincipalTimetables,
    updateTimetable,
    deleteStudent, deleteTeacher, updateStudent, updateTeacher
  } = require('../services/principalService');
  
  const createTeacherHandler = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const teacher = await createTeacher(email, password, name);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const createStudentHandler = async (req, res) => {
    const { email, password, classroomId, name} = req.body;
    try {
      const student = await createStudent(email, password, classroomId, name);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const createClassroomHandler = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    try {
      const classroom = await createClassroom(name, startTime, endTime, days);
      res.status(201).json(classroom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const assignTeacherToClassroomHandler = async (req, res) => {
    const { teacherId, classroomId } = req.body;
    try {
      const updatedTeacher = await assignTeacherToClassroom(teacherId, classroomId);
      res.status(200).json(updatedTeacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const teachersHandler = async (req, res) => {
    try {
      const teachersData = await teachers();
      res.status(200).json(teachersData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const studentsHandler = async (req, res) => {
    try {
      const studentsData = await students();
      res.status(200).json(studentsData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const classroomsHandler = async (req, res) => {
    try {
      const classroomsData = await classrooms();
      res.status(200).json(classroomsData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const assignStudentsToClassroomHandler = async (req, res) => {
    try {
        const { classroomId, studentIds } = req.body;
        const updatedClassroom = await assignStudentsToClassroom(parseInt(classroomId), studentIds.map(id => parseInt(id)));
        res.status(200).json(updatedClassroom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

 const studentsWithNullClassroomHandler = async (req, res) =>{
  try {
    const studentsData = await studentsWithNullClassroom();
    res.status(200).json(studentsData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
 };

 const getPrincipalTimetablesHandler = async (req, res) => {

  const { classroomId } = req.query;
  try {
    const timetables = await getPrincipalTimetables(classroomId);
    res.status(200).json(timetables);
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


const deleteStudentHandler = async (req, res) => {
  const { studentId } = req.params;
  try {
    await deleteStudent(studentId);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher
const deleteTeacherHandler = async (req, res) => {
  const { teacherId } = req.params;
  try {
    await deleteTeacher(teacherId);
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
const updateStudentHandler = async (req, res) => {
  const { studentId } = req.params;
  const data = req.body;
  try {
    const updatedStudent = await updateStudent(studentId, data);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher
const updateTeacherHandler = async (req, res) => {
  const { teacherId } = req.params;
  const data = req.body;
  try {
    const updatedTeacher = await updateTeacher(teacherId, data);
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  module.exports = {
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
    updateTeacherHandler,
  };
  