import express, {Request, Response} from 'express';
import connectDB from './lib/connectDB';
import {userRouter, postRouter, commentRouter, webhookRouter} from './routes/index.route'; // 导入路由数组
import dotenv from 'dotenv';

dotenv.config(); // 加载 .env 文件中的环境变量
// 创建应用
const app = express();

// 连接数据库, 连接成功后再使用路由
connectDB().then(() => {
    // 使用路由
    app.use('/webhooks', webhookRouter); // 为 webhookRouter 添加前缀 /webhooks

    // 使用中间件
    // 允许json格式的请求
    app.use(express.json());
    app.use('/user', userRouter); // 为 userRouter 添加前缀 /user
    app.use('/post', postRouter); // 为 postRouter 添加前缀 /post
    app.use('/comment', commentRouter); // 为 commentRouter 添加前缀 /comment


    // 在现有代码中添加一个故意抛出错误的路由
    app.get('/error', (req: Request, res: Response) => {
        throw new Error('This is a test error!');
    });

    // 错误处理中间件应该放在路由定义的后面
    // Express5中，错误处理不再用try-catch，而是使用中间件。传入4个参数
    // 参数：err, req, res, next，分别表示错误对象、请求对象、响应对象、下一个中间件
    app.use((err: Error, req: Request, res: Response, next: any) => {
        res.status(500).json({
            message: err.message,
            status: 500,
            stack: err.stack
        });
    });
// 监听端口号
    app.listen(3030, () => {
        console.log('Server is running !');
    });

}).catch((err) => {
    console.log(err);
});
