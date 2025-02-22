import {useAuth, useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import 'quill/dist/quill.snow.css';
import RichText from "../../components/RichText.tsx";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import Upload from "../../components/Upload.tsx";

import type {PostData} from '../../types/post.d.ts'
import type {FormSubmitEvent} from '../../types/common.d.ts'


const WriteBlogPage = () => {
    const {isLoaded, isSignedIn} = useUser()
    // 使用useState管理富文本数据
    const [posts, setPosts] = useState<string>('');
    const [cover, setCover] = useState<{
        filePath: string;
    }>();
    const [img, setImg] = useState<any>('');
    const [video, setVideo] = useState<any>('');
    const [progress, setProgress] = useState<number>(0);
    console.log(cover)
    useEffect(() => {
        // 图片发生变化时执行
        console.log(img.url)
        img && setPosts(prev => prev + `<p><img src="${img.url}" alt="图片"/></p>`)

    }, [img]);
    useEffect(() => {
        // 图片发生变化时执行
        video && setPosts(prev => prev + `<p><iframe class="ql-video" src="${video.url}" alt="图片"/></p>`)

    }, [video]);
    // 发送请求
    const {getToken} = useAuth()
    // 使用useNavigate来进行页面跳转
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: async (newPost: PostData) => {
            // 新增文章之前需要做鉴权
            const token: string = await getToken() || ''
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            toast.success('发布成功')
            console.log(res.data)
            // 跳转到文章详情页
            navigate(`/post/${res.data.slug}`)
        }
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (isLoaded && !isSignedIn) {
        return <div>请先登录</div>
    }


    // 提交表单信息
    const handleSubmit = (e: FormSubmitEvent) => {
        e.preventDefault(); // 阻止表单默认提交行为
        const formData = new FormData(e.currentTarget);
        const data: PostData = {
            img: cover?.filePath || '',
            title: formData.get("title"),
            desc: formData.get("desc"),
            category: formData.get("category"),
            content: posts,
        }
        mutation.mutate(data)
    }

    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-4'>
            <h1 className='text-cl font-light'>写文章</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>

                <Upload type='image' setProgress={setProgress} setData={setCover}>
                    {/*注意这里要给button加上 type="button"。因为：如果一个按钮在表单内部且没有指定 type 属性，它默认的 type 是 submit，这会导致点击按钮时触发表单的 submit 事件，进而调用 handleSubmit 函数。*/}
                    <button type="button" className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>
                        上传图像
                    </button>
                </Upload>
                <input type='text' placeholder='标题                                    '
                       className='text-4xl font-semibold bg-transparent outline-none'
                       name='title'/>
                <div className='flex items-center gap-4'>
                    <label htmlFor='' className='text-sm'>请选择标签</label>
                    <select name='category' id='' className='p-2 rounded-xl bg-white shadow-md'>
                        <option value='frontend'>前端</option>
                        <option value='backend'>后端</option>
                        <option value='database'>数据</option>
                        <option value='tools'>工具</option>
                        <option value='other'>杂记</option>
                    </select>
                </div>
                <textarea placeholder='简要描述' className='w-full p-4 rounded-2xl' name='desc'></textarea>
                {/*富文本框*/}
                <div className='flex flex-1'>
                    <div className='flex flex-col gap-2 mr-2 mt-4'>
                        <Upload type='image' setProgress={setProgress} setData={setImg}>
                            🌈
                        </Upload>
                        <Upload type='video' setProgress={setProgress} setData={setVideo}>
                            🧊
                        </Upload>
                    </div>
                    <RichText value={posts} setPosts={setPosts}/>
                </div>
                <button disabled={mutation.isPending || (progress > 0 && progress < 100)}
                        className='bg-rose-800 text-white font-medium rounded-3xl mt-1 p-2 w-36 mb-4 disabled:bg-gray-700 disabled:cursor-not-allowed'>
                    {mutation.isPending ? '正在发布...' : '发布'}
                </button>
                {'正在上传...' + progress}

            </form>
        </div>
    );
};

export default WriteBlogPage;