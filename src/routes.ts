import { Router } from 'express';
import { SurveysController } from '../src/controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

// Users
router.post("/users", userController.create);

// Surveys
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

// Sendmail
router.post("/sendMail", sendMailController.execute);

export { router };