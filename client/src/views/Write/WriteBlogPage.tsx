import {useAuth, useUser} from "@clerk/clerk-react";
import {useState} from "react";
import 'quill/dist/quill.snow.css';
import RichText from "../../components/RichText.tsx";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

interface PostData {
    title: FormDataEntryValue | null;
    desc: FormDataEntryValue | null;
    category: FormDataEntryValue | null;
    content: string;
}

const WriteBlogPage = () => {
    const {isLoaded,isSignedIn} = useUser()
    // 使用useState管理富文本数据
    const [posts, setPosts] = useState<string>('');
    // 发送请求
    const {getToken} = useAuth()
    const mutation = useMutation({
        mutationFn: async (newPost:PostData) => {
            // 新增文章之前需要做鉴权
            const token:string = await getToken() || ''
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    if(isLoaded && !isSignedIn){
        return <div>请先登录</div>
    }
    //
    const handleSubmit = (e:any) => {
        e.preventDefault(); // 阻止表单默认提交行为
        const formData = new FormData(e.target);
        const data = {
            title: formData.get("title"),
            desc: formData.get("desc"),
            category: formData.get("category"),
            content: posts,
        }
        console.log(data)
        mutation.mutate(data)
    }

    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-4'>
            <h1 className='text-cl font-light'>写文章</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
                <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>添加背景图片</button>
                <input type='text' placeholder='写文章' className='text-4xl font-semibold bg-transparent outline-none'
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
                <RichText value={posts} setPosts={setPosts}/>
                <button className='bg-rose-800 text-white font-medium rounded-3xl mt-1 p-2 w-36 mb-4'>发布</button>

            </form>
        </div>
    );
};

export default WriteBlogPage;