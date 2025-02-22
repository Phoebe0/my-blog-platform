import React, {useEffect, useState} from 'react';
import Image from "./Image.tsx";
import {Link} from "react-router-dom";
import {SignedIn, SignedOut, useAuth, UserButton} from "@clerk/clerk-react";

const BlogNav: React.FC = () => {
    // 下拉菜单状态
    const [open, setOpen] = useState<boolean>(false);
    // 获取用户token-测试
    const {getToken} = useAuth()
    useEffect(() => {
        getToken().then(token => {
            console.log('token', token)
        })
    })
    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            {/* logo */}
            {/*使用Link组件，路由导航到根目录下面*/}
            <Link to='/' className='flex items-center gap-2 text-l font-bold font-serif'>
                <Image path='/MyBlogImgs/logo.png' className='w-10 h-10 rounded-full' w={32} h={32} alt='logo'/>
                <span>Tricia's World</span>
            </Link>
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
                    <Link to='/'>首页</Link>
                    <Link to='/'>推荐</Link>
                    <Link to='/'>收藏</Link>
                    <Link to='/'>个人中心</Link>
                    <Link to='/'>
                        <button className='py-2 px-4 rounded-full bg-pink-600 text-white font-bold'>Login😺</button>
                    </Link>
                </div>
            </div>
            {/* web端按钮 */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                <Link to='/'>首页</Link>
                <Link to='/'>推荐</Link>
                <Link to='/'>收藏</Link>
                <Link to='/'>个人中心</Link>

                <SignedOut>
                    <Link to='/login'>
                        <button className='py-2 px-4 rounded-full bg-pink-600 text-white font-bold'>Login😺</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    );
};

export default BlogNav;