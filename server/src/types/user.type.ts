import {Document} from 'mongoose';

// 定义 User 接口，继承 Document 以适配 Mongoose
interface IUser extends Document {
    clerkUserId?: string;
    username: string;
    email: string;
    img?: string;
    savedPosts: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    IUser,
}