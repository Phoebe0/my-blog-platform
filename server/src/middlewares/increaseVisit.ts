// 这个文件是用来记录访问量


import {Request, Response} from "express";
import {PostModel} from "../models/index.model";

const increaseVisit = async (req: Request, res: Response, next: any) => {
    const slug = req.params.slug;
    // $inc是一个原子操作，会自动加1
    await PostModel.findOneAndUpdate({slug: slug}, {$inc: {visit: 1}})
    next()
};
export {increaseVisit}