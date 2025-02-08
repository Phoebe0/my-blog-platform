import {Link} from "react-router-dom";
import MainCategories from "../../components/MainCategories.tsx";
import FeaturedPosts from "../../components/FeaturedPosts.tsx";
import PostList from "../../components/PostList.tsx";

const Home = () => {
    return (
        <div className='mt-4 flex flex-col gap-4'>
            {/*面包屑*/}
            <div className='flex gap-4'>
                <Link to='/' >Home </Link>
                <span>·</span>
                <span className='text-pink-500 font-bold'>Blogs and Articles</span>
            </div>
            {/*介绍*/}
            <div className='flex items-center justify-between'>
                {/*标题*/}
                <div className=''>
                    <h1 className='mt-4 text-gray-800 text-xl md:text-3xl lg:text-5xl font-bold font-shoujin'>
                        云起苍穹，文载万象🍃
                    </h1>
                    <p className='mt-8 text-md md:text-xl font-shoujin'>
                        偏居一隅，书写独属天地。此间万象，承载思绪流转；纵横字间，绘心中世界。
                    </p>
                </div>
                {/*动态按钮*/}
                {/*小屏幕不显示，只有middle之后才显示*/}
                <Link to='/write' className='hidden md:block relative '>
                    <svg
                        viewBox='0 0 200 200'
                        width='200'
                        height='200'
                        className='text-lg tracking-widest font-serif animate-spin animateTime'

                    >
                        <path
                            id='circlePath'
                            fill='none'
                            d='M 100 100 m -75 0 a 75 75 0 1,1 150,0 a 75 75 0 1,1 -150,0'
                        />
                        <text>
                            <textPath href='#circlePath' startOffset='0%'>·笔赋春秋·</textPath>
                            <textPath href='#circlePath' startOffset='50%'>·意载乾坤·</textPath>
                        </text>
                    </svg>
                    <button className='absolute top-0 right-0  bottom-0 left-0 m-auto w-20 h-20 bg-pink-900 rounded-full flex justify-center items-center'>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill='none'
                            xmlns="http://www.w3.org/2000/svg"
                            stroke='white'
                            strokeWidth='2'>
                            <line x1='6' y1='18' x2='18' y2='6'/>
                            <polyline points='9 6 18 6 18 15'/>
                        </svg>

                    </button>

                </Link>
            </div>
            {/*目录*/}
            <MainCategories />
            {/*特色文章*/}
            <FeaturedPosts/>
            {/*文章列表*/}
            <div>
                <h1 className='my-8 text-2xl text-gray-800'>最近</h1>
                <PostList></PostList>
            </div>
        </div>

    );
};

export default Home;