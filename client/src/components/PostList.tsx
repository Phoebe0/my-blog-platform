import PostListItem from "./PostListItem.tsx";
import {
    useInfiniteQuery,
} from '@tanstack/react-query'
import axios from 'axios';

// 定义一个函数，用于获取数据
const fetchPosts = async (pageParam) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {
            page: pageParam
        }
    })
    return res.data
}
const PostList = () => {
    // 发送请求获取数据,使用axios
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam = 1}) => fetchPosts(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    })
    if (status === 'pending') return '加载中...'

    if (status === 'error') return '出错了'
    console.log(data)
    return (
        <div className='flex flex-col gap-12 mb-8'>

            <PostListItem/>

        </div>
    );
};

export default PostList;