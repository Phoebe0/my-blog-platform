import express from 'express';
// 创建应用
const app = express();

console.log(process.env.test)
// 监听端口号
app.listen(3000, () => {
    console.log('Server is running ');
});
