// src/services/teacherService.js
const {PrismaClient } =  require("@prisma/client");
const prisma = new PrismaClient();

const createTimetable = async (classroomId, day, periods) => {
  return await prisma.$transaction(
    periods.map(period => {
      return prisma.timetable.create({
        data: {
          classroomId,
          day,
          subject: period.subject,
          startTime: period.startTime,
          endTime: period.endTime,
          teacherId: parseInt(period.teacherId)
        }
      });
    })
  );
};

const timetablesForClassroom = async (classroomId) => {
  return await prisma.timetable.findMany({
    where: { classroomId },
    include: { teacher: true }
  });
};


const getClassrooms = async () => {
  return await prisma.classroom.findMany();
};

const getTeachers = async (id) => {
  return await prisma.teacher.findMany({
    where:{
      userId: id
    }
  });
};

const studentsTeacherService = async (id) => {
  // Find the teacher by user ID
  const teacher = await prisma.teacher.findUnique({
    where: {
      userId: id,
    },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // Find the classroom by teacher's ID and select the students with their associated user email
  const classroom = await prisma.classroom.findUnique({
    where: {
      teacherId: teacher.id,
    },
    select: {
      name: true,
      students: {
        select: {
          id: true, // Include student ID
          name: true, // Include student name
          user: {
            select: {
              email: true, // Include the email from the User table
            },
          },
        },
      },
    },
  });

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  const students = classroom.students.map(student => ({
    id: student.id,
    name: student.name,
    email: student.user.email, // Access the email from the nested user relation
  }));

  return {students, classroomName : classroom.name};
};

const getTeacherTimetable = async (teacherId) => {
  const timetable = await prisma.timetable.findMany({
    where: { teacherId },
    include: { classroom: true },
  });
  return timetable;
};

const updateTimetable = async (timetableId, data) => {
  const updatedTimetable = await prisma.timetable.update({
    where: { id: timetableId },
    data,
  });
  return updatedTimetable;
};




module.exports = {
  createTimetable,
  studentsTeacherService,
  timetablesForClassroom, 
  getClassrooms,
  getTeachers,
  getTeacherTimetable,
  updateTimetable
};
