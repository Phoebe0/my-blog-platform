import express, {Request, Response} from 'express';
import connectDB from './lib/connectDB';
import routers from './routes'; // 导入路由数组
import dotenv from 'dotenv';

dotenv.config(); // 加载 .env 文件中的环境变量
// 创建应用
const app = express();
// 连接数据库, 连接成功后再使用路由
connectDB().then(() => {
    // 使用路由
    app.use('/user', routers[0]); // 为 userRouter 添加前缀 /user
    app.use('/post', routers[1]); // 为 postRouter 添加前缀 /post
    app.use('/comment', routers[2]); // 为 commentRouter 添加前缀 /comment

// 监听端口号
    app.listen(3030, () => {
        console.log('Server is running !');
    });

}).catch((err) => {
    console.log(err);
});
