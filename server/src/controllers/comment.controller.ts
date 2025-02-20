import {Request, Response} from 'express'; // 导入 Request 和 Response 类型
import {CommentModel, UserModel} from "../models/index.model";

// 获取评论的处理函数
const getPostComments = async (req: Request, res: Response) => {

    const comments = await CommentModel.find({post: req.params.postId})
        .populate('user', 'username img')
        .sort({createdAt: -1});

    res.json(comments);
};

// 其他的处理函数（如 addComment, deletePostComment）可以类似这样实现
const addComment = async (req: Request, res: Response) => {
    // 创建评论之前首先校验用户是否登录
    const clerkUserId = req.auth?.userId;
    // 获取文章id
    const postId = req.params.postId;
    if (!clerkUserId) {
        res.status(401).json('认证失败');
    }
    const user = await UserModel.findOne({clerkUserId});
    // 创建评论实例
    const newComment = new CommentModel(
        {
            ...req.body,
            postId: postId,
            user: user._id
        }
    )

    // 保存到数据库
    const savedComment = await newComment.save();
    setTimeout(() => {

        res.status(201).json(savedComment);
    }, 3000)
}
const deletePostComment = async (req: Request, res: Response) => {
    // 删除评论之前首先校验用户是否登录
    const clerkUserId = req.auth?.userId;
    // 获取评论id
    const id = req.params.id;
    if (!clerkUserId) {
        res.status(401).json('认证失败');
    }
    const user = await UserModel.findOne({clerkUserId});
    // 删除评论
    const deletedComment = await CommentModel.findByIdAndDelete({
        _id: id,
        user: user._id
    });
    if (!deletedComment) {
        res.status(404).json('你只能删除你自己的评论～');
    }
    res.status(200).json(deletedComment);
}
export {
    getPostComments,
    addComment,
    deletePostComment
};
