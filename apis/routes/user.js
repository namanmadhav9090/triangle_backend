import { Router } from 'express';
const router = Router();
import { createUser,createBulkUsers, getAllUsers,verifyLead, getUserById, updateUserById, deleteUserById, getUsersByRole } from '../Controllers/UserController.js';
import { auth } from '../../middleware/auth.js';

// Routes
router.post('/', createUser);
router.use(auth);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/verify/:id', auth, verifyLead);
router.post('/import', auth , createBulkUsers)
router.get('/role/:role', getUsersByRole);

export default router;
