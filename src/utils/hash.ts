import uniqid from 'uniqid'
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const hash = async (password: string) => {
  return bcrypt.hash(password, 8);
};

export const compare = async (input: string, original: string) => {
  return bcrypt.compare(input, original);
};

export const getToken = async (id: string) => {
  return jwt.sign({ id }, JWT_SECRET || 'Test', {
    expiresIn: 60 * 60 * 60 * 60,
  });
};

export const getUnique = async (str: string) => uniqid(str)
