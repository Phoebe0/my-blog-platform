import Image from "./Image.tsx";
import {format} from 'timeago.js'

const PostComment = ({comment}) => {
    // 确保 comment.user 存在
    const user = comment.user || {}; // 如果 comment.user 为 null 或 undefined，默认值为 {}

    // 为 img 和 username 设置默认值
    const imgUrl = user.img || 'https://ik.imagekit.io/Tricia/MyBlogImgs/user_avatar?updatedAt=1738817973222'; // 默认头像
    const username = user.username || '匿名用户'; // 默认用户名

    return (
        <div className='p-4 bg-slate-50 rounded-xl mb-8'>
            <div className='flex items-center gap-4'>
                {imgUrl &&
                    <Image path={imgUrl}
                           className='w-10 h-10 rounded-full object-cover'
                           w={40}/>
                }
                <span className='font-medium'>{username}</span>
                <span className='font-sm text-gray-400'>{format(comment.createdAt)}</span>
            </div>
            <div className='mt-4'>
                <p>{comment.desc}</p>
            </div>
        </div>
    );
};

export default PostComment;
