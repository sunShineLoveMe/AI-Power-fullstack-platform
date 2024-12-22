import { Sequelize } from 'sequelize';

// 数据库配置
const dbConfig = {
  database: process.env.DB_NAME || 'next_demo',
  username: process.env.DB_USER || 'next_user',
  password: process.env.DB_PASSWORD || 'your_strong_password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// 创建 Sequelize 实例
const sequelize = new Sequelize({
      ...dbConfig,
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      pool: {
        max: 5,  // 连接池最大连接数
        min: 0,  // 连接池最小连接数
        acquire: 30000,  // 获取连接最大等待时间
        idle: 10000  // 连接最大空闲时间
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      timezone: '+08:00'  // 设置时区
    });

// 测试数据库连接
if (sequelize) {
  sequelize.authenticate()
    .then(() => {
      console.log('数据库连接成功！');
      console.log(`已连接到数据库: ${dbConfig.database}`);
    })
    .catch((error: Error) => {
      console.error('数据库连接失败:', error);
    });
}

export default sequelize; 