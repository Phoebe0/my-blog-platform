
const Search = () => {
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
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="16" y1="16" x2="20" y2="20" />
            </svg>
            <input type='text' placeholder='搜索 ...' className='bg-transparent' />
        </div>
    );
};

export default Search;