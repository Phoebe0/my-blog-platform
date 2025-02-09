import {Schema, model, Document} from 'mongoose';
import type {IComment} from "../types/index.type";

// 创建一个用户模式
const commentSchema = new Schema<IComment>({
        // 发布评论时，需要作者以及文章信息，所以这里引用了User和Post模型
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // 自动添加createdAt和updatedAt字段,记录创建和更新时间
    }
);
export default model<IComment>('Comment', commentSchema); // 创建一个名为Comment的模型，对应commentSchema