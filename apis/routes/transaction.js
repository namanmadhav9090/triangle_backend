import { Router } from 'express';
const router = Router();
import {addtransaction,getAllTransaction,getTransactionById,updateTransaction,deleteTranSaction,totalTransaction,monthlyTransaction} from '../Controllers/transactionController.js'
import { auth } from '../../middleware/auth.js';

// Routes
router.use(auth);
router.post('/', addtransaction);
router.get('/', getAllTransaction);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTranSaction);
router.get('/total/', totalTransaction);
router.get('/monthly/', monthlyTransaction);


export default router;
