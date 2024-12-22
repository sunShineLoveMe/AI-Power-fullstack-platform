import User from '../models/User';
import Profile from '../models/Profile';

export async function initializeDatabase() {
  // 确保只在服务器端运行
  if (typeof window !== 'undefined') {
    return;
  }

  try {
    await User.sync();
    await Profile.sync();
    console.log('数据库同步成功');
  } catch (error) {
    console.error('数据库同步失败:', error);
  }
} 