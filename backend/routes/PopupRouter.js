import express from 'express';

import { createPopupForm, getAllPopupForms, getPopupFormById } from '../controller/PopupController.js';

const router = express.Router();

// Create a new popup form
router.post('/popupForms', createPopupForm);
// Get all popup forms
router.get('/popupForms', getAllPopupForms);
// Get a single popup form by id
router.get('/popupForms/:id', getPopupFormById);

export default router;