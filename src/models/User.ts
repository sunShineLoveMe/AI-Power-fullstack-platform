import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class User extends Model {
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User
