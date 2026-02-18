import express from 'express';
import { body } from 'express-validator';
import { login, verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login',
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Le nom d\'utilisateur est requis')
      .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères'),
    body('password')
      .notEmpty().withMessage('Le mot de passe est requis')
      .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
  ],
  login
);

router.get('/verify', authMiddleware, verifyToken);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin.id,
      username: req.admin.username
    }
  });
});

export default router;
