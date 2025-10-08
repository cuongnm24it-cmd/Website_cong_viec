const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Jobs',
      key: 'id',
    },
    allowNull: false,
  },
  candidateId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
  coverLetter: {
    type: DataTypes.TEXT,
  },
  resumeUrl: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  interviewDate: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'Applications',
  timestamps: false,
});

Application.associate = (models) => {
  Application.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
  Application.belongsTo(models.User, { foreignKey: 'candidateId', as: 'candidate' });
};

module.exports = Application;