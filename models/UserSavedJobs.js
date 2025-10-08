const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserSavedJobs = sequelize.define('UserSavedJobs', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Jobs',
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'UserSavedJobs',
  timestamps: false,
});

module.exports = UserSavedJobs;