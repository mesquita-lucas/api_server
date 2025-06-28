import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuarios } from '../models/usuarios.js';

export function register(req, res) {
    const { username, password } = req.body;
    if (usuarios.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }
    const hash = bcrypt.hashSync(password, 8);
    usuarios.push({ username, password: hash });
    res.json({ message: 'Usuário registrado com sucesso' });
}

export function login(req, res) {
    const { username, password } = req.body;
    const user = usuarios.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Login inválido!' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    res.json({
        message: `Login efetuado pelo usuário ${username}`,
        jwt: token
    });
}
