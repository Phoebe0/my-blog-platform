import {config} from '../config/config';
import {PostModel, UserModel} from '../models/index.model'
import {Request, Response} from 'express';
import ImageKit from 'imagekit'
import {PostQuery, SortObj} from "../types/post.type";

// 获取文章列表
const getPosts = async (req: Request, res: Response) => {
    // 分页查询，设置page和limit
    const page: number = parseInt(req.query?.page as string) || 1
    const limit: number = parseInt(req.query?.limit as string) || 2
    // 查询参数
    const query: PostQuery = {}
    // 分类查询
    const cat: any = req.query?.cat
    const author: any = req.query?.author
    const searchQuery: any = req.query?.search
    const sortQuery: any = req.query?.sort
    const featured: any = req.query?.featured
    if (cat) {
        query.category = cat;
    }

    if (searchQuery) {
        query.title = {$regex: searchQuery, $options: "i"};
    }

    if (author) {
        const user = await UserModel.findOne({username: author}).select("_id");
        console.log(user);
        if (!user) {
            res.status(404).json("文章失踪了")
            return
        }

        query.user = user._id;

    }

    let sortObj: SortObj = {createdAt: -1};
    // 筛选框参数
    if (sortQuery) {
        switch (sortQuery) {
            case "latest":
                sortObj = {createdAt: -1};
                break;
            case "oldest":
                sortObj = {createdAt: 1};
                break;
            case "popular":
                sortObj = {visit: -1};
                break;
            case "trending":
                sortObj = {visit: 1};
                query.createdAt = {
                    $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                };
                break;
            default:
                break;
        }
    }

    if (featured) {
        query.isFeatured = true;
    }
    const posts: any[] = await PostModel
        .find(query)
        .populate('user', 'username') // 填充用户信息，populate方法的第一个参数是要填充的字段名，第二个参数是要返回的字段名
        .sort(sortObj)
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

    const post = await PostModel
        .findOne({slug: req.params.slug})
        .populate('user', 'username img') // 第二个参数返回两个字段，用户名和图片
    console.log(post)
    res.status(200).json(post);

}
// 创建文章
const createPost = async (req: Request, res: Response) => {
// 创建文章之前首先校验用户是否登录
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
        res.status(401).json({message: '认证失败'});
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
    const clerkUserId: string | undefined = req.auth?.userId;
    if (!clerkUserId) {
        res.status(401).json({message: '认证失败'});
        return;
    }
    // 校验角色，如果是管理员也可以删除任何文章
    const role: string = req.auth?.sessionClaims?.metadata?.role || 'user'
    if (role === 'admin') {
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json('文章删除成功！');
        return
    }
    const user: any = await UserModel.findOne({clerkUserId});
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
// 推荐文章
const featuredPost = async (req: Request, res: Response) => {
    const clerkUserId: string | undefined = req.auth?.userId;
    const postId: string = req.body.postId;

    if (!clerkUserId) {
        res.status(401).json("认证失败")
        return
    }

    const role: string = req.auth?.sessionClaims?.metadata?.role || "user";

    if (role !== "admin") {
        res.status(403).json("你不能推荐文章")
        return
    }

    const post = await PostModel.findById(postId);

    if (!post) {
        res.status(404).json("文章不存在!")
        return
    }
    // 检查当前文章是否已经被推荐
    const isFeatured: boolean | undefined = post.isFeatured;
    // 更新文章状态
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
            isFeatured: !isFeatured,
        },
        {new: true}
    );

    res.status(200).json(updatedPost);
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
    uploadAuth,
    featuredPost
}