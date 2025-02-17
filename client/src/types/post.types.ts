// 文章数据接口
import React from "react";

export interface PostData {
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