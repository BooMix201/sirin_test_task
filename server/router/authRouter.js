import express from 'express';
import { body } from 'express-validator'
import { UserController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const router = new express.Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  UserController.registration
);

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users',authMiddleware, UserController.getUsers);
