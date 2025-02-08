import Image from "./Image.tsx";
import {Link} from "react-router-dom";

const FeaturedPosts = () => {
    return (
        <div className='mt-8 flex flex-col lg:flex-row gap-8'>
            {/*推荐文章*/}
            <div className='w-full lg:w-1/2 flex flex-col gap-4 '>
                {/*图片*/}
                <Image path='/MyBlogImgs/feature1.png' className='rounded-3xl object-cover' w={895}/>
                {/*详情*/}
                <div className='flex items-center gap-4'>
                    <h1 className='font-semibold lg:text-lg '>01.</h1>
                    <Link to='/test' className='text-xl lg:text-3xl font-semibold lg:font-bold'>
                        大语言模型的概念就是通过数据集进行训练，经过不断调整指令参数来解决推理问题。
                    </Link>
                </div>
                {/*标题*/}
            </div>
            {/*其他文章*/}
            <div className='w-full lg:w-1/2 flex flex-col gap-4 '>
                {/*第二*/}
                <div className='lg:h-1/3 flex justify-between gap-4'>
                    {/*左侧图片*/}
                    <div className='w-1/3 aspect-video'>
                        <Image
                            path='/MyBlogImgs/feature2.png'
                            className='rounded-3xl object-cover w-full h-full'
                            w={298}
                        />
                    </div>
                    {/*右侧文章信息*/}
                    <div className='w-2/3'>
                        {/*详情*/}
                        <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                            <h1 className='font-semibold'>02.</h1>
                            <Link to='/' className='text-rose-400'>
                                前端
                            </Link>
                            <span className='text-gray-500 text-sm'>2 天前</span>
                        </div>
                        {/*标题*/}
                        <Link to='/test'
                              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                            初识大语言模型
                        </Link>
                    </div>
                </div>
                {/*第三*/}
                <div className='lg:h-1/3 flex justify-between gap-4'>
                    {/*左侧图片*/}
                    <div className='w-1/3 aspect-video'>
                        <Image
                            path='/MyBlogImgs/feature2.png'
                            className='rounded-3xl object-cover w-full h-full'
                            w={298}
                        />
                    </div>
                    {/*右侧文章信息*/}
                    <div className='w-2/3'>
                        {/*详情*/}
                        <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                            <h1 className='font-semibold'>02.</h1>
                            <Link to='/' className='text-rose-400'>
                                前端
                            </Link>
                            <span className='text-gray-500 text-sm'>2 天前</span>
                        </div>
                        {/*标题*/}
                        <Link to='/test'
                              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                            初识大语言模型
                        </Link>
                    </div>
                </div>
                {/*第四*/}
                <div className='lg:h-1/3 flex justify-between gap-4'>
                    {/*左侧图片*/}
                    <div className='w-1/3 aspect-video'>
                        <Image
                            path='/MyBlogImgs/feature2.png'
                            className='rounded-3xl object-cover w-full h-full'
                            w={298}
                        />
                    </div>
                    {/*右侧文章信息*/}
                    <div className='w-2/3'>
                        {/*详情*/}
                        <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                            <h1 className='font-semibold'>02.</h1>
                            <Link to='/' className='text-rose-400'>
                                前端
                            </Link>
                            <span className='text-gray-500 text-sm'>2 天前</span>
                        </div>
                        {/*标题*/}
                        <Link to='/test'
                              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
                            初识大语言模型
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPosts;