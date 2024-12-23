const crypto = require('crypto');

function generateSecret() {
    // 生成一个64字节的随机字符串
    const secret = crypto.randomBytes(64).toString('hex');
    
    console.log('\n=== JWT Secret Generation ===');
    console.log('\nGenerated JWT_SECRET:');
    console.log(secret);
    console.log('\nAdd this to your .env.local file:');
    console.log('JWT_SECRET=' + secret);
    console.log('\n=========================\n');
}

generateSecret(); 