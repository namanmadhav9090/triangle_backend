import { Router } from 'express';
const router = Router();
import { RequestOtp, verifyOtp, logout, addUser} from '../Controllers/authController.js';

router.post('/request-otp', RequestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);
router.post('/addUser', addUser);

// mobile routes
// router.post('/request/mobile/otp', mobileLogin);
// router.post('/verify/mobile/otp', verifyMobileOtp);

export default router;
