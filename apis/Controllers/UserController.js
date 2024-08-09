import db from '../../models/index.js';

const createUser = async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const createBulkUsers = async (req, res) => {
  try {
    const users = await db.User.bulkCreate(req.body);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        is_obsolate: false,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateUserById = async (req, res) => {
  try {
    const [updated] = await db.User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await db.User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteUserById = async (req, res) => {
  try {
    const [deleted] = await db.User.update({is_obsolate: true}, {
      where: { id: req.params.id,
        is_obsolate: false
       }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUsersByRole = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { role: req.params.role, is_obsolate: false }
    });
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found with this role' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const verifyLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value } = req.body;

    const lead = await db.User.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    switch (type) {
      case 'nominee_verified':
        lead.nominee_verified = value;
        break;
      case 'ekyc_verified':
        lead.ekyc_verified = value;
        break;
      case 'bank_verified':
        lead.bank_verified = value;
        break;
      default:
        return res.status(400).json({ error: 'Invalid verification type' });
    }

    await lead.save();
    await lead.checkAndUpdateRole();

    res.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { createUser,createBulkUsers, getAllUsers,verifyLead, getUserById, getUsersByRole, updateUserById, deleteUserById}
