import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Status } from '../constants/index.js';
import { Task } from './tasks.js';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bycritp.js';

export const User = sequelize.define('users',{

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate :{
        notNull:{
          msg: 'Username must not be null',
        }
      } 
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notNull:{
          msg: 'Password must not be null',
        }
      } 
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: Status.ACTIVE,

      validate :{
        isIn:{
          args: [[Status.ACTIVE, Status.INACTIVE]],
          msg: 'Status must be either active or inactive'
        }
      } 
    },
  });

//Relacion uno a muchos para usuario con tareas
User.hasMany(Task, {
  foreignKey: 'userId',
  sourceKey: 'id'
});

Task.belongsTo(User, {
  foreignKey: 'user.id',
  targetKey: 'id'
});

// User.hasMany(Task);
// Task.belongsToMany(User);

//Encripctar password
User.beforeCreate(async (user) => {
try {
  user.password = await encriptar(user.password);
} catch (error) {
  logger.error(error.message);
  throw new Error('Error al encriptar la contraseña');
}
});

User.beforeUpdate(async (user) => {
  try {
    user.password = await encriptar(user.password);
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error al encriptar la contraseña');
  }
  });