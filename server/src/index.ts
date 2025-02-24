import express, {Request, Response} from 'express';
import connectDB from './lib/connectDB';
import {userRouter, postRouter, commentRouter, webhookRouter} from './routes/index.route'; // 导入路由数组
import {requireAuth, clerkMiddleware} from '@clerk/express'
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";

dotenv.config(); // 加载 .env 文件中的环境变量

// 扩展 Request 类型以包含 auth 属性
declare module 'express' {
    interface Request {
        auth?: {
            sessionClaims: any;
            userId?: string;
        };
    }
}
// 创建应用
const app = express();
// 在路由定义之前添加静态文件服务
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

}


// 连接数据库, 连接成功后再使用路由
connectDB().then(() => {
    // 使用webhooks从 Clerk 向服务器回调用户登录信息
    // 注意：一定要写在最前面
    app.use('/webhooks', webhookRouter); // 为 webhookRouter 添加前缀 /webhooks
    // 跨域处理

    if (process.env.NODE_ENV !== 'production') {
        app.use(cors({
            origin: process.env.CLIENT_URL,
            allowedHeaders: ['Content-Type', 'Authorization'],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            optionsSuccessStatus: 204
        }));
    }

    app.use(express.json());

    // 权限校验，检查请求的 cookie 和标头中是否存在会话 JWT
    app.use(clerkMiddleware())


    // 使用中间件
    // 方法1：用户鉴权,没有登陆状态返回信息Unauthorized。
    app.get('/protect', (req: Request, res: Response) => {
        const {userId} = req.auth || {};
        if (!userId) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        res.status(200).json({message: 'Authorized'});
    })
    // 方法2：或者也可以用requireAuth(),未登录直接重定向到登录页面
    /*app.get('/protect2', requireAuth(), (req: Request, res: Response) =>{
        res.status(200).json({message:'Authorized'});
    })*/
    // 允许json格式的请求

    // 使用路由
    app.use('/posts', postRouter); // 为 postRouter 添加前缀 /posts
    app.use('/users', userRouter); // 为 userRouter 添加前缀 /user
    app.use('/comments', commentRouter); // 为 commentRouter 添加前缀 /comment

    // 在现有代码中添加一个故意抛出错误的路由
    app.get('/err', (req: Request, res: Response) => {
        throw new Error('错误!');
    });

    // 错误处理中间件应该放在路由定义的后面
    // Express5中，错误处理不再用try-catch，而是使用中间件。传入4个参数
    // 参数：err, req, res, next，分别表示错误对象、请求对象、响应对象、下一个中间件
    app.use((err: Error, req: Request, res: Response, next: (err?: Error) => void) => {
        res.status(500).json({
            message: err.message,
            code: 500,
            stack: err.stack
        });
    });
    // 处理React路由
    if (process.env.NODE_ENV === 'production') {
        app.get(/.*/, (req: Request, res: Response) => {
            const filePath = path.join(__dirname, '../../client/dist', 'index.html');
            console.log('Serving file from:', filePath); // 调试路径
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Error serving file:', err);
                    res.status(500).send('Internal Server Error');
                }
            });
        });
    }
    // 监听端口号（注意：两个不同的设备不要端口冲突）
    app.listen(3038, '0.0.0.0', () => {
        console.log(`Server running on port ${process.env.PORT || 3038}`);
    });

}).catch((err) => {
    console.log(err);
});
