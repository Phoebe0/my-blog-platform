import { Schema } from 'mongoose';
import mongoose from "mongoose";

// 创建一个用户模式
const postSchema = new Schema({
        // 发布文章时，需要作者信息，所以这里引用了User模型
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        img:{
            type: String
        },
        title:{
            type: String,
            required: true
        },
        slug:{
            type: String,
            required: true,
            unique: true
        },
        desc:{
            type: String,
        },
        content:{
            type: String,
            required: true
        },
        isFeatured:{
            type: Boolean,
            default: false
        },
        visit:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // 自动添加createdAt和updatedAt字段,记录创建和更新时间
    }
);
export default mongoose.model('Post', postSchema); // 创建一个名为User的模型，对应userSchema