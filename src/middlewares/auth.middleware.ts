import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';
import User from '../models/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};