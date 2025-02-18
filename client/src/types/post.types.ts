// 文章数据接口
import React from "react";

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

// 表单提交事件类型
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
// 文章类型
// 定义文章类型
export interface Post {
    _id: string;
    title: string;
    content: string;
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