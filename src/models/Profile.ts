import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Profile extends Model {
  public id!: number;
  public bio!: string;
  public userId!: number;
}

Profile.init({
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Profile',
});

export default Profile; 