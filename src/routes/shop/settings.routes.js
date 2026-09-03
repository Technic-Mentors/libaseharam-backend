import { Router } from 'express';
import * as settingsController from '../../controllers/shop/settings.controller.js';

export const settingsRouter = Router();

settingsRouter.get('/', settingsController.getPublicSettings);
