import db from '../../models/index.js';

const getAllUsersWithInvestments = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        is_obsolate: false,
        role: 'investor'
      },
      include: [
        {
          model: db.Investment,
          as: 'investments',
          attributes: ['capital', 'interest'],
        },
      ],
    });

    const usersWithTotal = users.map(user => {
      const totalCapital = user.investments.reduce((sum, investment) => sum + investment.capital, 0);
      const totalInterest = user.investments.reduce((sum, investment) => sum + investment.interest, 0);
      
      return {
        id: user.id,
        username: user.username,
        mobile_no: user.mobile_no,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        gender : user.gender,
        age: user.age,
        status: user.status,
        config: user.config,
        totalCapital: totalCapital || 0,
        totalInterest: totalInterest || 0,
      };
    });

    res.json(usersWithTotal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getAllUsersWithInvestments}
