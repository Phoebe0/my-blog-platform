import {Request, Response} from 'express'; // 导入 Express 的 Request 和 Response 类型
import {UserModel} from '../models/index.model'; // 导入 UserModel 模型
import {Webhook} from 'svix'; // 从 svix 库导入 Webhook 以用于 Clerk Webhook 处理
import dotenv from 'dotenv'; // 导入 dotenv 用于加载环境变量

dotenv.config(); // 加载 .env 文件中的环境变量

// 定义 Webhook 事件的接口
interface WebhookEvent {
    type: string;
    data?: Record<string, any>; // 事件数据，包含用户信息
}

// Clerk Webhook 处理函数
export const clerkWebhook = async (req: Request, res: Response): Promise<void> => {
    // 获取 Clerk Webhook 密钥
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    // 如果密钥未设置，则返回服务器错误
    if (!CLERK_WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET 未设置');
        res.status(500).json({message: '服务器配置错误'});
        return;
    }

    const payload = req.body; // 获取请求体中的 Webhook 负载数据
    const headers = req.headers; // 获取请求头部信息

    // 使用 Clerk 提供的 Webhook 验证工具
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let evt: WebhookEvent; // 定义 Webhook 事件对象

    try {
        // 从请求头中提取 Clerk Webhook 需要的认证字段
        const requiredHeaders = {
            "svix-id": headers["svix-id"] as string,               // Clerk Webhook 的请求 ID
            "svix-timestamp": headers["svix-timestamp"] as string, // 时间戳
            "svix-signature": headers["svix-signature"] as string, // 签名
        };

        console.log('Webhook Headers:', requiredHeaders); // 打印 headers 以确认值

        // 验证 Webhook 签名，确保请求来自 Clerk
        evt = wh.verify(payload, requiredHeaders) as WebhookEvent;

    } catch (err) {
        console.error('Webhook 验证失败:', err);
        res.status(400).json({message: '无效的 Webhook 签名'});
        return
    }
    console.log('✅ 验证成功，事件数据:', evt);
    if (evt.type === 'user.created') {
        const newUser = new UserModel({
            clerkUserId:evt.data?.id,
            username:evt.data?.username || evt.data?.email_addresses[0].email_address,
            email:evt.data?.email_addresses[0].email_address,
            img:evt.data?.profile_img_url
        })
            await newUser.save(); // 保存用户到数据库
    }

};
