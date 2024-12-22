import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';


/**
 * 账号模型
 * @id 账号ID 主键 自增
 * @username 用户名
 * @password 密码（建议存储加密后的值）
 * @email 邮箱 唯一
 * @phone 手机号
 * @avatar 头像URL
 * @status 账号状态
 * @lastLoginAt 最后登录时间
 * @roleId 角色ID
 * @createdAt 创建时间
 * @updatedAt 更新时间
 * @deletedAt 删除时间 软删除
 */
class Account extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public phone?: string;
  public avatar?: string;
  public status!: string;
  public lastLoginAt?: Date;
  public roleId?: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '用户名',
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '密码',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '邮箱',
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: '手机号',
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '头像URL',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'locked'),
    defaultValue: 'active',
    comment: '账号状态：active-活跃，inactive-未激活，locked-锁定',
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '最后登录时间',
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '角色ID',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: '创建时间',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: '更新时间',
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '删除时间（软删除）',
  }
}, {
  sequelize,
  modelName: 'Account',
  paranoid: true, // 启用软删除
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
    {
      unique: true,
      fields: ['email'],
    },
    {
      fields: ['status'],
    },
    {
      fields: ['roleId'],
    }
  ]
});

export default Account;
