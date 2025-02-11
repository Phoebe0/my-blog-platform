import PostListItem from "./PostListItem.tsx";
import {
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios';

// 定义一个函数，用于获取数据
const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
    return res.data
}
const PostList = () => {
    // 发送请求获取数据,使用axios
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => fetchPosts()
    })
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    console.log(data)
    return (
        <div className='flex flex-col gap-12 mb-8'>

            <PostListItem/>

        </div>
    );
};

export default PostList;