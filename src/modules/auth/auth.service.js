import db from '../../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { User } = db;

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({
    where: { email },
  });
  

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  const userData = newUser.toJSON();
  delete userData.password;

  return userData;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    throw new Error('Invalid email or password');
  }
  const userData = user.toJSON();
  delete userData.password;
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { user: userData, token };
};

export const getProfile = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return null;
  }

  const userData = user.toJSON();
  delete userData.password;

  return userData;
};
