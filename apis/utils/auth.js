import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import appConfig from '../config/appconfig';
import { BadRequestError } from './appErrors';
import logger from './logger';
import db from '../../models/index.js';

const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.replace('Bearer ', '');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      const loginRecord = await db.Login.findOne({
        where: {
          userId: user.id,
          verified: true
        },
        order: [['created_at', 'DESC']]
      });
  
      if (!loginRecord) {
        return res.status(401).json({ error: 'Session expired. Please log in again.' });
      }
  
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };

const createNewToken = (data) => {
  const accessToken = jwt.sign(data, appConfig.auth.jwt_secret, {
    expiresIn: appConfig.auth.jwt_expiresin,
  });
  const refreshToken = jwt.sign(data, appConfig.auth.refresh_token_secret, {
    expiresIn: appConfig.auth.refresh_token_expiresin,
  });
  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, appConfig.auth.jwt_secret);
    return decoded;
  } catch (error) {
    logger.error(`error: ${error}`);
    return false;
  }
};

const hashValue = (value) => {
  try {
    const salt = bcrypt.genSaltSync(15);
    const stringValue = String(value);
    return bcrypt.hashSync(stringValue, salt);
  } catch (error) {
    throw new BadRequestError('Error in hashValue:', error);
  }
};

const createTemporaryToken = (data) => {
  const tempToken = jwt.sign(data, appConfig.auth.temp_token, {
    expiresIn: appConfig.auth.temp_token_expires,
  });
  return {
    tempToken,
  };
};

export { createNewToken, auth, verifyToken, hashValue, createTemporaryToken };
