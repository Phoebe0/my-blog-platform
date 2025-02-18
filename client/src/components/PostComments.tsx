import PostComment from "./PostComment.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchComments = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res.data
}

const PostComments = ({postId}) => {


    const {isPending, error, data} = useQuery({
        queryKey: ["comments", postId], // 查询键
        queryFn: () => fetchComments(postId)
    })
    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>评论失踪了🥸 ...</div>

    return (
        <div className='flex flex-col gap-8 lg:w-3/5'>
            <h1 className='text-xl text-gray-600 underline'>评论</h1>
            <div className='flex items-center justify-between gap-8 w-full'>
                <textarea placeholder='友好评论' className='w-full p-4 rounded-2xl'></textarea>
                <button className='bg-pink-800 px-4 py-2 text-white font-medium rounded-full'>发表</button>
            </div>

            {data.map(comment => (
                <PostComment key={comment._id} comment={comment}/>
            ))
            }
        </div>
    );
};

export default PostComments;