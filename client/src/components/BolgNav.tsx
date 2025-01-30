import React, { useState } from 'react';
import Image from "./Image.tsx";

const BlogNav: React.FC = () => {
    // 下拉菜单状态
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            {/* logo */}
            <div className='flex items-center gap-2 text-l font-bold font-serif'>
                <Image path='/MyBlogImgs/logo.png' className='w-10 h-10 rounded-full' width={32} height={32} alt='logo' />
                <span>Tricia's Blog</span>
            </div>
            {/* 移动端按钮 */}
            <div className='md:hidden'>
                {/* 汉堡按钮 */}
                <div className='cursor-pointer text-4xl' onClick={() => setOpen(prev => !prev)}>
                    {open ? 'X' : '☰'}
                </div>
                {/* 移动端-菜单列表 */}
                <div className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 
                ${open ? '-right-0' : '-right-[100%]'} bg-white bg-opacity-50 gap-8 font-medium text-lg transition-all ease-in-out`}
                >
                    <a href="#">Home</a>
                    <a href="#">Trending</a>
                    <a href="#">Like</a>
                    <a href="#">About</a>
                    <a href="#">
                        <button className='py-2 px-4 rounded-full bg-pink-600 text-white font-bold'>Login😺</button>
                    </a>
                </div>
            </div>
            {/* web端按钮 */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                <a href="#">Home</a>
                <a href="#">Trending</a>
                <a href="#">Like</a>
                <a href="#">About</a>
                <a href="#">
                    <button className='py-2 px-4 rounded-full bg-pink-600 text-white font-bold'>Login😺</button>
                </a>
            </div>
        </div>
    );
};

export default BlogNav;