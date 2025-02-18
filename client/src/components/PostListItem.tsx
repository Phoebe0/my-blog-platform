import Image from "./Image.tsx";
import {Link} from "react-router-dom";

import {format} from "timeago.js";


const PostListItem = ({post}) => {


    return (
        <div className='flex flex-col xl:flex-row gap-8 mb-8'>
            {/*image*/}
            {post.img && <div className='md:hidden xl:block xl:w-1/3'>
                <Image path={post.img} className='rounded-2xl object-cover' w={735}/>
            </div>}
            {/*文章列表*/}
            <div className='flex flex-col gap-4 xl:w-2/3'>
                {/*标题*/}
                <Link to={`/post/${post.slug}`} className='text-4xl font-semibold'>
                    {post.title}
                </Link>
                {/*副标题*/}
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <span>作者：</span>
                    <Link to='' className='text-fuchsia-500'>{post.user?.username || '未识别'}</Link>
                    <span>·</span>
                    <Link to='' className='text-rose-500'>{post.category || '未识别'}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                {/*文章内容*/}
                <p>
                    {post.desc}

                </p>
                <Link to={`/${post.slug}`} className='underline text-rose-800 text-sm'>更多...</Link>
            </div>

        </div>
    );
};

export default PostListItem;