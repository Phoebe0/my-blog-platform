import {useUser} from "@clerk/clerk-react";

import 'quill/dist/quill.snow.css';
import RichText from "../../components/RichText.tsx";
const WriteBlogPage = () => {
    const {isLoaded,isSignedIn} = useUser()

    if(!isLoaded){
        return <div>Loading...</div>
    }
    if(isLoaded && !isSignedIn){
        return <div>请先登录</div>
    }
    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-4'>
            <h1 className='text-cl font-light'>写文章</h1>
            <form className='flex flex-col gap-6 flex-1 mb-6'>
                <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>添加背景图片</button>
                <input type='text' placeholder='写文章' className='text-4xl font-semibold bg-transparent outline-none'/>
                <div className='flex items-center gap-4'>
                    <label htmlFor='' className='text-sm'>请选择标签</label>
                    <select name='cat' id='' className='p-2 rounded-xl bg-white shadow-md'>
                        <option value='frontend'>前端</option>
                        <option value='backend'>后端</option>
                        <option value='database'>数据</option>
                        <option value='tools'>工具</option>
                        <option value='other'>杂记</option>
                    </select>
                </div>
                <textarea placeholder='简要描述' className='w-full p-4 rounded-2xl'></textarea>
                {/*富文本框*/}
                  <RichText />



            </form>
        </div>
    );
};

export default WriteBlogPage;