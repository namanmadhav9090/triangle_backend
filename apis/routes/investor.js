import { Router } from 'express';
const router = Router();
import { getAllUsersWithInvestments } from '../Controllers/investorController.js';
import { auth } from '../../middleware/auth.js';

// Routes
router.use(auth);
router.get('/', getAllUsersWithInvestments);

export default router;
