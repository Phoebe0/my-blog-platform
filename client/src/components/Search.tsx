import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    // 监听搜索框的输入
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = e.currentTarget.value
            // 如果当前路径是/posts, 则直接更新searchParams
            // 如果当前路径不是/posts, 则跳转到/posts?search=query
            if (location.pathname === '/posts') {
                setSearchParams({...Object.fromEntries(searchParams), search: query})
            } else {
                navigate(`/posts?search=${query}`)
            }
        }
    }
    return (
        <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center gap-2'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="gray"
            >
                <circle cx="10.5" cy="10.5" r="7.5"/>
                <line x1="16" y1="16" x2="20" y2="20"/>
            </svg>
            <input
                type='text'
                placeholder='搜索 ...'
                className='bg-transparent'
                onKeyDown={handleSearch}/>
        </div>
    );
};

export default Search;