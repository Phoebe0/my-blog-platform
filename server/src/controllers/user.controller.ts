import {Request, Response} from "express";
import {UserModel} from "../models/index.model";

const getUserSavedPosts = async (req: Request, res: Response) => {
    // 先鉴权
    const clerkUserId = req.auth?.userId
    if (!clerkUserId) {
        res.status(401).json("认证失败")
        return
    }
    const user: any = await UserModel.findOne({clerkUserId})

    // 检查 user 是否存在
    if (!user) {
        res.status(404).json({message: "用户不存在"});
        return
    }
    res.status(200).json(user.savedPosts || [])
}
const savePost = async (req: Request, res: Response) => {
    // 先鉴权
    const clerkUserId = req.auth?.userId
    const postId = req.body.postId
    if (!clerkUserId) {
        res.status(401).json({message: "认证失败"})
    }
    const user = await UserModel.findOne({clerkUserId})
    // 判断是否收藏了
    const isSaved = user.savedPosts.some((p: string) => p === postId) // 通过some函数，判断是否收藏了
    if (!isSaved) {
        // 如果没有收藏，就收藏
        await UserModel.findByIdAndUpdate(user._id, {
            $push: {savedPosts: postId}
        })
    } else {
        await UserModel.findByIdAndUpdate(user._id, {
            // 如果收藏了，就取消收藏
            $pull: {savedPosts: postId}
        })
    }
    res.status(200).json(isSaved ? "文章取消收藏" : "文章收藏成功")
}
export {
    getUserSavedPosts,
    savePost
}