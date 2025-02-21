import {Link} from "react-router-dom";
import Search from "./Search.tsx";

const MainCategories = () => {
    return (
        <div
            className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
            {/*链接*/}
            <div className='flex-1 flex items-center justify-between flex-wrap'>
                <Link to='/posts' className='bg-rose-700 text-white rounded-full px-4 py-2 font-sans'>所有文章</Link>
                <Link to='/posts?cat=frontend' className='hover:bg-rose-50  rounded-full px-4 py-2'>前端</Link>
                <Link to='/posts?cat=backend' className='hover:bg-rose-50  rounded-full px-4 py-2'>后端</Link>
                <Link to='/posts?cat=database' className='hover:bg-rose-50  rounded-full px-4 py-2'>数据</Link>
                <Link to='/posts?cat=tools' className='hover:bg-rose-50  rounded-full px-4 py-2'>工具</Link>
                <Link to='/posts?cat=other' className='hover:bg-rose-50  rounded-full px-4 py-2'>杂记</Link>
            </div>
            <span className='text-xl font-mono font-medium'>|</span>
            {/*搜索*/}
            <Search/>
        </div>
    );
};

export default MainCategories;