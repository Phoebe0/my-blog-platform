import {Document} from 'mongoose';

// 定义 User 接口，继承 Document 以适配 Mongoose
export default interface IUser extends Document {
    username: string;
    email: string;
    img?: string;
    savedPosts: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
