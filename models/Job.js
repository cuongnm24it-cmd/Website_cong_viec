const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('fulltime', 'parttime', 'contract', 'internship'),
  },
  workMode: {
    type: DataTypes.ENUM('remote', 'onsite', 'hybrid'),
  },
  skills: {
    type: DataTypes.JSON,
  },
  description: {
    type: DataTypes.TEXT,
  },
  requirements: {
    type: DataTypes.TEXT,
  },
  benefits: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  featured: {
    type: DataTypes.BOOLEAN,
  },
  applicants: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
  employerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  tableName: 'Jobs',
  timestamps: false,
});

Job.associate = (models) => {
  Job.belongsTo(models.User, { foreignKey: 'employerId', as: 'employer' });
  Job.hasMany(models.Application, { foreignKey: 'jobId', as: 'applications' });
  Job.belongsToMany(models.User, {
    through: 'UserSavedJobs',
    as: 'savedByUsers',
    foreignKey: 'jobId',
  });
};

module.exports = Job;