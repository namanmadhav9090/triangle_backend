import { Router } from 'express';
const router = Router();
import { addInvestment, getAllInvestment,getInvestmentByUserId, getInvestmentById , updateInvestment, deleteInvestment} from '../Controllers/investmentController.js';
import { auth } from '../../middleware/auth.js';
import { requireInvestorRole } from '../../middleware/roleMiddleware.js';

// Routes
router.use(auth);
// router.use(requireInvestorRole);

router.post('/', addInvestment);
router.get('/', getAllInvestment);
router.get('/:id', getInvestmentById);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);
router.get('/user/:uid', getInvestmentByUserId);

export default router;
