import express from 'express';
import userRoutes from '../routes/user.js';
import investmentRoutes from '../routes/investment.js';
import transactionRoutes from '../routes/transaction.js';
import authRoutes from '../routes/auth.js';
import investorRoutes from '../routes/investor.js';
import {auth} from '../../middleware/auth.js';

const app = express();

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/investor',auth, investorRoutes);
app.use('/investments', auth, investmentRoutes);
app.use('/transactions', auth, transactionRoutes);

export default app;