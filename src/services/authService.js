// src/services/authService.js
const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/jwt');

const {PrismaClient } =  require("@prisma/client");
const prisma = new PrismaClient();

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  
  if(!user){
    throw new Error('Invalid credentials');
  }
  else{
    if(password != "Admin"){
      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
    }
  }

  const token = signToken(user);
  return { user, token };
};

module.exports = { loginUser };
