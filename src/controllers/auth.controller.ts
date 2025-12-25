import { Request, Response } from 'express';
import user from '../models/user';
import jwt from '../utils/jwt';
import bscrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });
        const newUser = new user({ email, password });
        await newUser.save();
        const token = jwt.generateToken({ id: newUser._id });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: 'Credenciais inválidas' });
        const isMatch = await bscrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });
        const token = jwt.generateToken({ id: existingUser._id });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};