import {Link} from "react-router-dom";

const MainCategories = () => {
    return (
        <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
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
            <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center gap-2 group'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="gray"
                >
                    <circle cx="10.5" cy="10.5" r="7.5" />
                    <line x1="16" y1="16" x2="20" y2="20" />
                </svg>
                <input
                    type="text"
                    placeholder='搜索 ...'
                    className="bg-transparent focus:outline-none transition-all duration-1000 w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 min-w-0"
                />
            </div>
        </div>
    );
};

export default MainCategories;