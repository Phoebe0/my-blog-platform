import {toast} from "react-toastify";
import type {AuthenticatorResponse, UploadSuccessResponse, UploadProps} from "../types/post.d.ts";
import {IKContext, IKUpload} from "imagekitio-react";
import React, {useRef} from "react";


// 图像上传身份验证
const authenticator = async (): Promise<AuthenticatorResponse> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const {signature, expire, token} = data;
        return {signature, expire, token};
    } catch (error: Error | any) {
        throw new Error(`认证失败: ${error.message}`);
    }
};
const Upload: React.FC<UploadProps> = ({children, type, setProgress, setData}) => {
    const ref = useRef<HTMLInputElement>(null);


    // 图片上传出错
    const onError = () => {
        toast.error('哔啵～ 图片上传失败！！')

    };
    // 图片上传成功
    const onSuccess = (res: UploadSuccessResponse) => {
        console.log("Success", res)
        // 设置图片封面
        setData(res)
    };
    // 图片上传进度
    const onProgress = (progress: {
        loaded: number; // 已上传的字节数
        total: number; // 总字节数
    }) => {
        console.log("Progress", progress)
        setProgress(Math.round((progress.loaded / progress.total) * 100))

    };
    return (
        // 图片上传组件
        <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
                   urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                   authenticator={authenticator}>
            <IKUpload
                useUniqueFileName
                folder={"/MyBlogImgs"}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onProgress}
                className='hidden'
                ref={ref}
                accept={`${type}/*`}
            />
            <div className='cursor-pointer' onClick={() => ref.current?.click()}>
                {children}
            </div>
        </IKContext>
    );
};

export default Upload;