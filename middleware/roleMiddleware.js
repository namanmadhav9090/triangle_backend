import db from '../models/index.js';

export const requireInvestorRole = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(userId, "userId");

    const user = await db.User.findByPk(userId);

    if (user && (user.role === 'investor' || user.role === 'admin')) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied. You must be an investor or admin to access this resource.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
