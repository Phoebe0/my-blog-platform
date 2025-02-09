import {PostModel} from '../models/index.model'
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

    // 创建一个新的文章
    const newPost = new PostModel(req.body);
    // 保存到数据库
    const post = await newPost.save();
    res.status(200).json(post);

}
// 删除文章
const deletePost = async (req: Request, res: Response) => {

    // 根据id删除文章
    const post = await PostModel.findOneAndDelete(req.params.id);
    res.status(200).json('Post deleted successfully');

}

export {
    getPosts,
    getPost,
    createPost,
    deletePost
}