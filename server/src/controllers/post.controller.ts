import {PostModel,UserModel} from '../models/index.model'
import {Request, Response} from 'express';

const getPosts = async (req: Request, res: Response) => {

    const posts = await PostModel.find();
    res.status(200).json(posts);

}
// 携带参数的请求,单个页面
const getPost = async (req: Request, res: Response) => {

    const post = await PostModel.findOne({slug: req.params.slug});
    res.status(200).json(post);

}
// 创建文章
const createPost = async (req: Request, res: Response) => {
// 创建文章之前首先校验用户是否登录
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const user = await UserModel.findOne({clerkUserId});
    if (!user) {
         res.status(401).json({message: '用户不存在'});
         return;
    }
    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    // 检查是否已经存在相同的slug
    let existingPost = await PostModel.findOne({slug});
    let counter = 2;
    while (existingPost) {
        slug = `${slug}-${counter}`
        existingPost = await PostModel.findOne({slug});
        counter++;
    }
    // 创建一个新的文章,传递当前用户id和请求体
    const newPost = new PostModel({user:user._id,slug,...req.body});
    // 保存到数据库
    const post = await newPost.save();
    res.status(200).json(post);

}
// 删除文章
const deletePost = async (req: Request, res: Response) => {
// 删除文章之前首先校验用户是否登录
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const user = await UserModel.findOne({clerkUserId});
    if (!user) {
        res.status(401).json({message: '用户不存在'});
        return;
    }
    // 根据id删除文章
    const deletePost = await PostModel.findOneAndDelete({_id:req.params.id,user:user._id});
    if (!deletePost) {
        res.status(403).json({message: '你只可以删除自己的文章'});
        return;
    }
    res.status(200).json('文章删除成功！');
}

export {
    getPosts,
    getPost,
    createPost,
    deletePost
}