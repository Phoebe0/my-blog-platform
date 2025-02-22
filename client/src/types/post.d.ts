// 文章数据接口
import React, {SetStateAction,} from "react";

// 提交时的post类型
export interface PostData {
    img: string;
    title: FormDataEntryValue | null;
    desc: FormDataEntryValue | null;
    category: FormDataEntryValue | null;
    content: string;
}

// 图片上传身份验证响应接口
export interface AuthenticatorResponse {
    signature: string;
    expire: number;
    token: string;
}

// 图片上传成功响应接口
export interface UploadSuccessResponse {
    filePath: string;
    fileId: string;
}

// 图片上传错误接口
export interface UploadError {
    name: string,
    message: string,
    stack?: string
}

// 定义上传组件的 props 类型
export interface UploadProps {
    children: React.ReactNode; // children 是 React 节点
    type: string; // 文件类型，例如 "image" 或 "video"
    setProgress: (progress: number) => void; // 更新上传进度的函数
    setData: React.Dispatch<SetStateAction<{ filePath: string } | undefined>>; // 设置上传成功后的文件路径的函数
}


// 定义分页响应类型
export interface PostsResponse {
    posts: Post[]; // 当前页的文章列表
    hasMore: boolean; // 是否还有更多数据
}

// 定义 useInfiniteQuery 的返回类型
export interface InfiniteQueryResult {
    pages: PostsResponse[]; // 所有页的数据
    pageParams: number[]; // 所有页的页码
}