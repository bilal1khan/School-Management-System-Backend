// src/services/studentService.js
const {PrismaClient } =  require("@prisma/client");
const prisma = new PrismaClient();

const getStudentById = async (studentId) => {
  return await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      user: true,
      classroom: {
        include: {
          timetable: true,
        },
      },
    },
  });
};

const updateStudent = async (studentId, data) => {
  return await prisma.student.update({
    where: { id: studentId },
    data,
  });
};

const deleteStudent = async (studentId) => {
  return await prisma.student.delete({
    where: { id: studentId },
  });
};

const getStudentTimetable = async (studentId) => {
  const student = await prisma.student.findUnique({
    where: { userId: studentId },
    include: {
      classroom: {
        include: { timetable: true },
      },
    },
  });
  return student.classroom.timetable;
};

const getClassmatesService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId: userId },
    include: { classroom: true },
  });

  if (!student || !student.classroom) {
    throw new Error('Classroom not found for the user');
  }

  const classmates = await prisma.student.findMany({
    where: {
      classroomId: student.classroomId,
      NOT: { userId: userId }, // Exclude the logged-in user
    },
    include: { user: true },
  });

  return classmates;
};

module.exports = {
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentTimetable,
  getClassmatesService
};
