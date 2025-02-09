import { Schema } from 'mongoose';
import mongoose from "mongoose";

// 创建一个用户模式
const userSchema = new Schema({
    username: {
        type: String, // 字符串类型
        required: true, // 必填
        unique: true // 唯一性
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img:{
        type: String
    },
    savedPosts:{
        type: [String],
        default: [] // 默认值为空数组
    }
},
    {
        timestamps: true // 自动添加createdAt和updatedAt字段,记录创建和更新时间
    }
);
export default mongoose.model('User', userSchema); // 创建一个名为User的模型，对应userSchema