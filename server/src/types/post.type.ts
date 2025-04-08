import {Document, Schema, SortOrder} from 'mongoose';

// 定义 Post 接口，继承 Document 以适配 Mongoose
interface IPost extends Document {
    user: Schema.Types.ObjectId;
    img?: string;
    title: string;
    slug: string;
    desc?: string;
    content: string;
    category: string;
    isFeatured?: boolean;
    visit?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Post {
    _id: string;
    title: string;
    user: string | undefined;
    // 添加文章其他属性
    isFeatured: boolean;
    createdAt: string;
}

interface PostQuery {
    createdAt?: { $gte: Date };
    category?: string;
    title?: {} | undefined;
    user?: string | undefined;
    isFeatured?: boolean;
}


interface SortObj {
    [key: string]: SortOrder;
}

export {
    IPost,
    Post,
    PostQuery,
    SortObj
}