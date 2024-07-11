import { sign, verify } from 'jsonwebtoken';
import { JwtPayloadType } from '../types/JwtPayload';

export const createToken = (
  payload: object,
  secretKey: string,
  expiresIn: string,
): string => {
  return sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (
  token: string,
  secretKey: string,
): JwtPayloadType | null => {
  try {
    return verify(token, secretKey) as JwtPayloadType;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (
  token: string,
  secretKey: string,
): JwtPayloadType | null => {
  try {
    return verify(token, secretKey) as JwtPayloadType;
  } catch (error) {
    return null;
  }
};
