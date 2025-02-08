import Image from "./Image.tsx";

const PostComment = () => {
    return (
        <div className='p-4 bg-slate-50 rounded-xl mb-8'>
            <div className='flex items-center gap-4'>
                <Image path='/MyBlogImgs/comment_avatar.jpg' className='w-10 h-10 rounded-full object-cover' w={40}/>
                <span className='font-medium'>Tricia</span>
                <span className='font-sm text-gray-400'>1 小时前</span>
            </div>
            <div className='mt-4'>
                <p>这篇文章写的真好，我学到了很多！</p>
            </div>
        </div>
    );
};

export default PostComment;