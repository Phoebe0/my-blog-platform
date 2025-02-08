import PostList from "../../components/PostList.tsx";
import SideMenu from "../../components/SideMenu.tsx";
import {useState} from "react";

const PostListPage = () => {
    const [open,setOpen] = useState<boolean>(false)
    return (
        <div className=''>
            <h1 className='mb-8 text-2xl'>文章</h1>
            <button onClick={() => setOpen(prev => !prev)}
                    className='md:hidden bg-rose-800 text-sm text-white px-4 py-2 rounded-full'>
                {open ? '关闭' : '打开'}
            </button>
            <div className='flex flex-col-reverse gap-8 md:flex-row'>
                <div className=''>
                    <PostList/>
                </div>
                {/*侧边栏，适配移动端*/}
                <div className={`md: ${open ? 'block' : 'hidden'} lg:block`}>
                    <SideMenu/>
                </div>
            </div>

        </div>
    );
};

export default PostListPage;