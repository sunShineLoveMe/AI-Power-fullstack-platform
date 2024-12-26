import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Agent extends Model {
  public id!: string;
  public name!: string;
  public type!: string;
  public config!: Record<string, any>;
  public status!: 'active' | 'inactive';
  public lastActive!: Date;
}

Agent.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  config: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'inactive',
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Agent',
});

export default Agent; 