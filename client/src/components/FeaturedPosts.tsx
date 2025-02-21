import Image from "./Image.tsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {format} from "timeago.js";

const fetchPost = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=latest`)
    return res.data
}
const FeaturedPosts = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["featuredPosts"], // 查询键
        queryFn: () => fetchPost()
    })
    console.log(data)
    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    const posts = data.posts
    if (!posts || posts.length === 0) return
    return (
        <div className='mt-8 flex flex-col lg:flex-row gap-8'>
            {/* 第一 */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* 图片 */}
                {posts[0].img && <Image
                    path={posts[0].img}
                    className="rounded-3xl object-cover"
                    w={895}
                />}
                {/* 详情 */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link to='/' className="text-rose-400 lg:text-lg">{posts[0].category}</Link>
                    <span className="text-gray-500">{format(posts[0].createdAt)}</span>
                </div>
                {/* 标题 */}
                <Link
                    to={`/post/${posts[0].slug}`}
                    className="text-xl lg:text-3xl font-semibold lg:font-bold"
                >
                    {posts[0].title}
                </Link>
            </div>
            {/*其他文章*/}
            <div className='w-full lg:w-1/2 flex flex-col gap-4 '>
                {/* 第二 */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    {/* 图片 */}
                    {posts[1].img && <Image
                        path={posts[1].img}
                        className="rounded-3xl object-cover"
                        w={895}
                    />}
                    {/* 详情 */}
                    <div className="flex items-center gap-4">
                        <h1 className="font-semibold lg:text-lg">02.</h1>
                        <Link to='/' className="text-rose-400 lg:text-lg">{posts[1].category}</Link>
                        <span className="text-gray-500">{format(posts[1].createdAt)}</span>
                    </div>
                    {/* 标题 */}
                    <Link
                        to={`/post/${posts[1].slug}`}
                        className="text-xl lg:text-3xl font-semibold lg:font-bold"
                    >
                        {posts[1].title}
                    </Link>
                </div>
                {/*第三*/}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    {/* 图片 */}
                    {posts[2].img && <Image
                        path={posts[2].img}
                        className="rounded-3xl object-cover"
                        w={895}
                    />}
                    {/* 详情 */}
                    <div className="flex items-center gap-4">
                        <h1 className="font-semibold lg:text-lg">03.</h1>
                        <Link to='/' className="text-rose-400 lg:text-lg">{posts[2].category}</Link>
                        <span className="text-gray-500">{format(posts[2].createdAt)}</span>
                    </div>
                    {/* 标题 */}
                    <Link
                        to={`/post/${posts[2].slug}`}
                        className="text-xl lg:text-3xl font-semibold lg:font-bold"
                    >
                        {posts[2].title}
                    </Link>
                </div>
                {/*第四*/}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    {/* 图片 */}
                    {posts[3].img && <Image
                        path={posts[3].img}
                        className="rounded-3xl object-cover"
                        w={895}
                    />}
                    {/* 详情 */}
                    <div className="flex items-center gap-4">
                        <h1 className="font-semibold lg:text-lg">04.</h1>
                        <Link to='/' className="text-rose-400 lg:text-lg">{posts[3].category}</Link>
                        <span className="text-gray-500">{format(posts[3].createdAt)}</span>
                    </div>
                    {/* 标题 */}
                    <Link
                        to={`/post/${posts[3].slug}`}
                        className="text-xl lg:text-3xl font-semibold lg:font-bold"
                    >
                        {posts[3].title}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPosts;