import Search from "./Search.tsx";
import {Link} from "react-router-dom";

const SideMenu = () => {
    return (
        <div className='px-4 h-max sticky top-8'>
            <h1 className='mb-4 text-sm font-medium'>搜索</h1>
            <Search/>
            <h1 className='mt-4 mb-4 text-sm font-medium'>筛选</h1>
            <div>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='lastest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>最新</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='popular'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>收藏最多</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='trending'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>近期最热</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='oldest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>之前的</span>
                </label>
            </div>
            <h1 className='mt-4 mb-4 text-sm font-medium'>目录</h1>
            <div className='flex flex-col gap-2 text-sm'>
                <Link to='/posts' className='underline'>所有文章</Link>
                <Link to='/posts?cat=frontend' className='underline'>前端</Link>
                <Link to='/posts?cat=backend' className='underline'>后端</Link>
                <Link to='/posts?cat=database' className='underline'>数据</Link>
                <Link to='/posts?cat=tools' className='underline'>工具</Link>
                <Link to='/posts?cat=other' className='underline'>杂记</Link>
            </div>
        </div>
    );
};

export default SideMenu;