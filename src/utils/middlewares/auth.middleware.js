import jwt from 'jsonwebtoken';
import { authCookieName } from '../../modules/auth/auth.cookie.js';

const getCookieToken = (req) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const tokenCookie = cookieHeader
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${authCookieName}=`));

  return tokenCookie?.split('=')[1] || null;
};

export const jwtAuth = (req, res, next) => {
  try {
    const token = getCookieToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const optionalJwtAuth = (req, res, next) => {
  try {
    const token = getCookieToken(req);

    if (!token) {
      return next();
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
