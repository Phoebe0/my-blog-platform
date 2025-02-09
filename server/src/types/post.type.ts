import {Document, Schema} from 'mongoose';

// 定义 Post 接口，继承 Document 以适配 Mongoose
export default interface IPost extends Document {
    user: Schema.Types.ObjectId;
    img?: string;
    title: string;
    slug: string;
    desc?: string;
    content: string;
    isFeatured?: boolean;
    visit?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
