import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { pool } from '../config/database.js';

export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT id, username, password, created_at FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants invalides' 
      });
    }

    const admin = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants invalides' 
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await pool.query(
      'UPDATE admins SET last_login = NOW() WHERE id = $1',
      [admin.id]
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (err) {
    console.error('❌ Erreur lors de la connexion:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la connexion' 
    });
  }
}

export async function verifyToken(req, res) {
  res.json({
    success: true,
    message: 'Token valide',
    admin: {
      id: req.admin.id,
      username: req.admin.username
    }
  });
}
