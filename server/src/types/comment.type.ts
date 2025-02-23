import {Document, Schema} from 'mongoose';

// 定义 Comment 接口，继承 Document 以适配 Mongoose
interface IComment extends Document {
    user: Schema.Types.ObjectId; // 这里的user和post是外键，引用了User和Post模型
    post: Schema.Types.ObjectId;
    desc: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    IComment,
}