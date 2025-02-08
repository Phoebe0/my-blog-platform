import PostComment from "./PostComment.tsx";

const PostComments = () => {
    return (
        <div className='flex flex-col gap-8 lg:w-3/5'>
            <h1 className='text-xl text-gray-600 underline'>评论</h1>
            <div className='flex items-center justify-between gap-8 w-full'>
                <textarea placeholder='友好评论' className='w-full p-4 rounded-2xl'></textarea>
                <button className='bg-pink-800 px-4 py-2 text-white font-medium rounded-full'>发表</button>
            </div>
            <PostComment/>
        </div>
    );
};

export default PostComments;