const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('candidate', 'employer'),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  skills: {
    type: DataTypes.JSON,
  },
  experience: {
    type: DataTypes.TEXT,
  },
  education: {
    type: DataTypes.TEXT,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  companySize: {
    type: DataTypes.STRING,
  },
  industry: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'Users',
  timestamps: false,
});

User.associate = (models) => {
  User.belongsToMany(models.Job, {
    through: 'UserSavedJobs',
    as: 'savedJobs',
    foreignKey: 'userId',
  });
};

module.exports = User;