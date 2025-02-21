import {Schema, model} from 'mongoose';
import {IPost} from '../types/post.type';

// 创建一个文章模型
const postSchema = new Schema<IPost>({
        // 发布文章时，需要作者信息，所以这里引用了User模型
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        img: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
        },
        category: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            required: true
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        visit: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // 自动添加createdAt和updatedAt字段,记录创建和更新时间
    }
);
export default model<IPost>('Post', postSchema); // 创建一个名为Post的模型，对应postSchema