import Search from "./Search.tsx";
import {useSearchParams} from "react-router-dom";

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentSort: string | null = searchParams.get('sort');
        // 如果 'sort' 值与目标值不同，更新搜索参数
        if (currentSort !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value
            })

        }
    }
    // 点击目录, 更新搜索参数
    const handleCategoryClick = (category: string) => {
        const currentCat: string | null = searchParams.get('sort');
        if (currentCat !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category
            })

        }
    }
    return (
        <div className='px-4 h-max sticky top-8'>
            <h1 className='mb-4 text-sm font-medium'>搜索</h1>
            <Search/>
            <h1 className='mt-4 mb-4 text-sm font-medium'>排序</h1>
            <div>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        onChange={handleFilterChange}
                        value='latest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>最新</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        onChange={handleFilterChange}
                        value='popular'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>收藏最多</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        onChange={handleFilterChange}
                        value='trending'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>近期最热</span>
                </label>
                <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        onChange={handleFilterChange}
                        value='oldest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-pink-800 cursor-pointer rounded-sm checked:bg-pink-800'
                    />
                    <span>之前的</span>
                </label>
            </div>
            <h1 className='mt-4 mb-4 text-sm font-medium'>目录</h1>
            <div className='flex flex-col gap-2 text-sm'>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('')}>所有文章</span>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('frontend')}>前端</span>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('backend')}>后端</span>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('database')}>数据</span>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('tools')}>工具</span>
                <span className='underline cursor-pointer' onClick={() => handleCategoryClick('other')}>杂记</span>
            </div>
        </div>
    );
};

export default SideMenu;