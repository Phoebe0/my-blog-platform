import PostListItem from "./PostListItem.tsx";
import {
    useInfiniteQuery,
} from '@tanstack/react-query'
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import {PostsResponse, InfiniteQueryResult, Post} from "../types/post.types.ts";

// 定义一个函数，用于获取数据
const fetchPosts = async (pageParam: number): Promise<PostsResponse> => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {
            page: pageParam,
            limit: 2
        }
    })
    return res.data
}
const PostList = () => {
    // 使用 useInfiniteQuery 钩子来获取数据，进行分页查询
    const {
        data,
        fetchNextPage,
        hasNextPage,
        status,
    } = useInfiniteQuery<PostsResponse, InfiniteQueryResult>({
        queryKey: ['posts'],
        queryFn: ({pageParam = 1}) => fetchPosts(pageParam),
        initialPageParam: 1, // 初始页码
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
    })
    if (status === 'pending') return '加载中...'

    if (status === 'error') return '出错了'
    // 将所有页的文章数组扁平化
    const allPosts: Post[] = data?.pages.flatMap((page) => page.posts) || [];
    return (
        <InfiniteScroll
            dataLength={allPosts.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>等待加载更多...</h4>}
            endMessage={
                <p>
                    <b>🙂‍↔️嘿! 翻到底了</b>
                </p>
            }

        >

            {allPosts.map((post) => (
                <PostListItem key={post._id} post={post}/>
            ))}
        </InfiniteScroll>


    );
};

export default PostList;