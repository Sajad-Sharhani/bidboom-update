import errors from "../schema/errors";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";

const { JWT_SECRET } = process.env;

export const hash = async (password: string) => {
  return bcrypt.hash(password, 8);
};

export const compare = async (input: string, original: string) => {
  return bcrypt.compare(input, original);
};

export const getToken = async (id: string) => {
  try {
    return jwt.sign({ id }, JWT_SECRET || "Test", {
      expiresIn: 60 * 60 * 60 * 60,
    });
  } catch {
    throw new Error(errors[3].id);
  }
};

export const verifyToken = (token: string) => {
  return (jwt.verify(token, JWT_SECRET || "Test") || { id: null }) as {
    id: string | null;
  };
};

// export const getUnique = async (str: string) => uniqid(str || "rand" );
export const getUnique = async (str: string) => Date.now().toString(36).substring(2, 20);
