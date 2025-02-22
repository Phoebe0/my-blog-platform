// 表单提交事件类型
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
// 文章数据类型
export type MyPost = {
    _id: string;
    user?: {
        username: string;
        img: string;
    };
    img?: string; // 可选字段
    title?: string;
    slug?: string;
    desc?: string;
    category?: string;
    content?: string;
    isFeatured?: boolean;
    visit?: number;
    createdAt?: any;
    updatedAt?: any;
};

// 图片类型
export interface ImageProps {
    urlEndpoint: string | undefined;
    path?: string | undefined;
    src?: string | undefined;
    className?: string;
    w?: number;
    h?: number;
    alt?: string;

}