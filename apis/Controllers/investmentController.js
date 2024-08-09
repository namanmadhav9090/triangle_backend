
import db from '../../models/index.js';

// Create a new investment
const addInvestment = async (req, res) => {
  console.log('api runs');
     return
  try {
    console.log('req.body',req.body);
    const investment = await db.Investment.create(req.body);
    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all investments
const getAllInvestment = async (req, res) => {
  try {
    const investments = await db.Investment.findAll(
      {
        where: {
          isObsolete: false,
        },
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['username', 'mobile_no'],
          },
        ],
      }
    );
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get investment by ID
const getInvestmentById =  async (req, res) => {
  try {
    const investment = await db.Investment.findByPk(req.params.id);
    if (investment) {
      res.json(investment);
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get investment by ID
const getInvestmentByUserId = async (req, res) => {
    try {
      const investments = await db.Investment.findAll({
        where: {
          userId: req.params.uid
        }
      });
      if (investments.length > 0) {
        res.json(investments);
      } else {
        res.status(404).json({ error: 'No investments found for this user' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update investment by ID 
const updateInvestment = async (req, res) => {
    try {
 
      const [updated] = await db.Investment.update(req.body,
        {
        where: { id: req.params.id }
      });
      if (updated) {
        const getupdatedInvestment = await db.Investment.findByPk(req.params.id);
        res.json(getupdatedInvestment);
      } else {
        res.status(404).json({ error: 'Investment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete investment by ID
const deleteInvestment = async (req, res) => {
  try {
    const deleted = await db.Investment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addInvestment, getAllInvestment,getInvestmentByUserId, getInvestmentById , updateInvestment, deleteInvestment}

