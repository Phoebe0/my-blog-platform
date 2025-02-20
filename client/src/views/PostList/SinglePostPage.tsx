import Image from "../../components/Image.tsx";
import {Link, useParams} from "react-router-dom";
import PostMenuActions from "../../components/PostMenuActions.tsx";
import Search from "../../components/Search.tsx";
import PostComments from "../../components/PostComments.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {format} from "timeago.js";
import rehypeRaw from 'rehype-raw';
// import {marked} from 'marked';
import ReactMarkdown from 'react-markdown';

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
    return res.data
}

const SinglePostPage = () => {

    const {slug} = useParams()
    const {isPending, error, data} = useQuery({
        queryKey: ["post", slug], // 查询键
        queryFn: () => fetchPost(slug)
    })
    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>没找到这篇文章🥹...</div>
    // // 判断 content 是否为 HTML 或 Markdown
    // const isMarkdown = data.content && data.content.startsWith("#");  // 例如 Markdown 以 "#" 开头
    // const content = isMarkdown ? marked(data.content) : data.content;
    return (
        <div className='flex flex-col gap-8'>
            {/*文章标题*/}
            <div className='flex gap-8'>
                <div className='lg:w-3/5 flex flex-col gap-8'>
                    <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
                        {data.title}
                    </h1>
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                        <span>作者</span>
                        <Link to='/' className='text-fuchsia-500'>{data.user.username}</Link>
                        <span>·</span>
                        <Link to='/' className='text-rose-400'>{data.category}</Link>
                        <span>{format(data.createdAt)}</span>
                    </div>
                    {/*文章简介*/}
                    <p className='text-gray-500 font-medium'>
                        {data.desc}
                    </p>
                </div>
                {data.img && <div className='hidden lg:block w-2/5'>
                    <Image path={data.img} className='rounded-2xl' w={600}/>
                </div>}
            </div>
            {/*文章正文 */}
            <div className='flex flex-col md:flex-row gap-8'>
                {/*文章正文 - 文本*/}
                <div className='lg:text-lg flex flex-col gap-6 text-justify sm: text-sm md:text-base'>
                    <ReactMarkdown
                        children={data.content}
                        rehypePlugins={[rehypeRaw]}  // 启用 rehype-raw 插件解析 HTML
                        className="prose lg:prose-xl"  // 使用 Tailwind 的 prose 类,prose 类会为 Markdown 渲染的 HTML 元素（如标题、段落、链接等）提供漂亮的默认样式，并且不会被 Tailwind 的其他类覆盖

                    />
                </div>
                {/*侧边栏*/}
                <div className='px-4 h-max sticky top-8'>
                    {/*作者*/}
                    <h1 className='mb-4 text-sm font-medium'>作者</h1>
                    <div className='flex flex-col gap-4 '>
                        {/*用户个人信息：头像 + 昵称 + 个签*/}
                        <div className='flex items-center gap-8'>
                            {data.user.img && <Image path={data.user.img}
                                                     className='w-12 h-12 rounded-full object-cover'
                                                     w={48}
                                                     h={48}>

                            </Image>
                            }
                            <Link to='/' className='text-rose-800'>{data.user.username}</Link>
                        </div>
                        <p className='text-sm text-gray-600'>岁岁平安</p>
                        {/*第三方账号*/}
                        <div className='flex gap-2'>
                            <Link to='/'>
                                <Image path='/MyBlogImgs/git.png' className='w-5 h-5 rounded-full'/>
                            </Link>
                            <Link to='/'>
                                <Image path='/MyBlogImgs/git.png' className='w-5 h-5 rounded-full'/>
                            </Link>
                        </div>
                    </div>
                    {/*操作*/}
                    <PostMenuActions post={data}/>
                    {/*目录*/}
                    <h1 className='mt-8 mb-4 text-sm font-medium'>目录</h1>
                    <div className='flex flex-col gap-2 text-sm'>
                        <Link to='' className='underline'>全部</Link>
                        <Link to='' className='underline'>前端</Link>
                        <Link to='' className='underline'>后端</Link>
                        <Link to='' className='underline'>数据</Link>
                        <Link to='' className='underline'>工具</Link>
                    </div>
                    <h1 className='mt-8 mb-4 text-sm font-medium'>搜索</h1>
                    <Search/>
                </div>
            </div>
            <PostComments postId={data._id}/>

        </div>
    );
};

export default SinglePostPage;