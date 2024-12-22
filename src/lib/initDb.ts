import User from '../models/User';
import Profile from '../models/Profile';
import Account from '../models/Account';

export async function initializeDatabase() {
  // 确保只在服务器端运行
  if (typeof window !== 'undefined') {
    return;
  }

  try {
    await User.sync(); // 同步用户表
    await Profile.sync(); // 同步用户信息表
    await Account.sync(); // 同步账号表
    console.log('数据库同步成功');
  } catch (error) {
    console.error('数据库同步失败:', error);
  }
} 