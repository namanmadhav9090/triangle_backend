// models/index.js
import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
import UserModel from '../logs/user.js';
import InvestmentModel from './investment.js';
import TransactionModel from './transaction.js';
import LoginModel from './login.js';
import OtpModal from './otps.js';

db.User = UserModel(sequelize);
db.Investment = InvestmentModel(sequelize);
db.Transaction = TransactionModel(sequelize);
db.Login = LoginModel(sequelize);
db.OTP = OtpModal(sequelize);

// Define relationships
db.User.associate(db);
db.Investment.associate(db);
db.Transaction.associate(db);
db.Login.associate(db);

export default db;
