import {config} from '../config/config';
import {PostModel, UserModel} from '../models/index.model'
import {Request, Response} from 'express';
import ImageKit from 'imagekit'


// 获取文章列表
const getPosts = async (req: Request, res: Response) => {
    // 分页查询，设置page和limit
    const page: number = parseInt(req.query?.page as string) || 1
    const limit: number = parseInt(req.query?.limit as string) || 2
    const posts: any[] = await PostModel.find()
        .populate('user', 'username') // 填充用户信息，populate方法的第一个参数是要填充的字段名，第二个参数是要返回的字段名
        .limit(limit)
        .skip((page - 1) * limit);
    // 获取文章总数
    const totalPosts: number = await PostModel.countDocuments()
    // 是否还有更多文章
    const hasMore: boolean = page * limit < totalPosts
    res.status(200).json({posts, hasMore});

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
    const newPost = new PostModel({user: user._id, slug, ...req.body});
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
    const deletePost = await PostModel.findOneAndDelete({_id: req.params.id, user: user._id});
    if (!deletePost) {
        res.status(403).json({message: '你只可以删除自己的文章'});
        return;
    }
    res.status(200).json('文章删除成功！');
}
// 上传图像
// 获取imagekit实例
const imagekit = new ImageKit({
    urlEndpoint: config.IK_URL_ENDPOINT || '',
    publicKey: config.IK_PUBLIC_KEY || '',
    privateKey: config.IK_PRIVATE_KEY || '',
});
const uploadAuth = async (req: Request, res: Response) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}
export {
    getPosts,
    getPost,
    createPost,
    deletePost,
    uploadAuth
}