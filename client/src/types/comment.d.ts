// 定义一个类型 `Comment`，表示数据结构
export interface Comment {
    user: string;        // 用户 ID，通常是一个字符串，可能是 MongoDB ObjectId 的 string 表示
    post: string;        // 帖子 ID，通常是一个字符串，可能是 MongoDB ObjectId 的 string 表示
    desc: string;        // 描述文本，表示评论内容
    _id: string;         // 评论的唯一标识符（可能是 MongoDB ObjectId）
    createdAt: string;   // 评论创建时间，ISO 8601 格式的时间字符串
    updatedAt: string;   // 评论更新时间，ISO 8601 格式的时间字符串
}

interface PostComment {
    _id: string; // 评论的唯一标识
    user: User | null; // 用户信息（可能为 null）
    desc: string; // 评论内容
    createdAt: string | Date; // 评论创建时间
}

// 定义 PostCommentProps 类型
export interface PostCommentProps {
    comment: PostComment;
    postId: string;
}