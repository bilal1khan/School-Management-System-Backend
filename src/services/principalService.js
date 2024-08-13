// src/services/principalService.js
const {PrismaClient } =  require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const createTeacher = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'TEACHER',
    },
  });

  const teacher = await prisma.teacher.create({
    data: {
      userId: user.id,
      name: name
    },
  });

  return {...user, teacher};
};

const createStudent = async (email, password, classroomId, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const student = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'STUDENT',
    },
  });

  const student1 = await prisma.student.create({
    data: {
      userId: student.id,
      name: name,
      classroomId
    }
  })

  return {...student, student: student1};
};

const createClassroom = async (name, startTime, endTime, days) => {
  return await prisma.classroom.create({
    data: {
      name,
      startTime,
      endTime,
      days,
    },
  });
};

const assignTeacherToClassroom = async (teacherId, classroomId) => {
  await prisma.classroom.update({
    where: { id: parseInt(classroomId) },
    data: { teacherId: parseInt(teacherId) },
  });
  return await prisma.teacher.update({
    where: { id: parseInt(teacherId) },
    data: { classroomId: parseInt(classroomId) },
  });
};

const teachers = async () => {
  return await prisma.teacher.findMany({
    select: {
      name: true,
      classroomId: true,
      userId: true,
      id: true,
      user: {
        select: {
          email: true        
        }
      },
    }
  });
};

const students = async () => {
  return await prisma.student.findMany({
    select: {
      name: true,
      classroomId: true,
      userId: true,
      id: true,
      user: {
        select: {
          email: true        
        }
      },
    }
  });
};

const classrooms = async () => {
  return await prisma.classroom.findMany();
};


const assignStudentsToClassroom = async (classroomId, studentIds) => {
  // Update students with the classroomId

  // Update classroom's students array
  const updatedClassroom = await prisma.classroom.update({
      where: { id: classroomId },
      data: {
          students: {
              connect: studentIds.map(id => ({ id })),
          },
      },
      include: {
          students: true,
      },
  });

  const updatedStudents = await prisma.student.updateMany({
    where: {
        id: {
            in: studentIds,
        },
    },
    data: {
        classroomId,
        teacherId: updatedClassroom.teacherId
    },
  });

  return updatedClassroom;
};

const studentsWithNullClassroom = async () => {
  return await prisma.student.findMany({
    where: { classroomId: null }
  });
};

const getPrincipalTimetables = async (classroomId) => {

  const timetables = await prisma.timetable.findMany({
    where: {
      classroomId: Number(classroomId),
    },
    include: {
      // Include any related models if necessary
      classroom: true, 
      teacher: true
    },
  });
  return timetables;
};

const updateTimetable = async (timetableId, data) => {
  const updatedTimetable = await prisma.timetable.update({
    where: { id: timetableId },
    data,
  });
  return updatedTimetable;
};


const deleteStudent = async (studentId) => {
  await prisma.student.delete({
    where: { id: parseInt(studentId) },
  });
};

// Delete a teacher
const deleteTeacher = async (teacherId) => {
  await prisma.teacher.delete({
    where: { id: parseInt(teacherId) },
  });
};

// Update a student
const updateStudent = async (studentId, data) => {
  return await prisma.student.update({
    where: { id: parseInt(studentId) },
    data,
  });
};

// Update a teacher
const updateTeacher = async (teacherId, data) => {
  return await prisma.teacher.update({
    where: { id: parseInt(teacherId) },
    data,
  });
};


module.exports = {
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
  deleteStudent,
  deleteTeacher,
  updateStudent,
  updateTeacher,
};
