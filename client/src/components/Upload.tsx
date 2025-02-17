import {toast} from "react-toastify";
import {AuthenticatorResponse, UploadSuccessResponse} from "../types/post.types.ts";
import {IKContext, IKUpload} from "imagekitio-react";
import React, {useRef} from "react";

// 定义组件的 props 类型
interface UploadProps {
    children: React.ReactNode; // children 是 React 节点
    type: string; // 文件类型，例如 "image" 或 "video"
    setProgress: (progress: number) => void; // 更新上传进度的函数
    setData: (data: string) => void; // 设置上传成功后的文件路径的函数
}

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
    } catch (error) {
        throw new Error(`认证失败: ${error.message}`);
    }
};
const Upload: React.FC<UploadProps> = ({children, type, setProgress, setData}) => {
    const ref = useRef<HTMLFormElement>(null);


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