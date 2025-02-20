import Image from "./Image.tsx";
import {format} from 'timeago.js'
import {useAuth, useUser} from "@clerk/clerk-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";

const PostComment = ({comment, postId}) => {
    // 确保 comment.user 存在
    const cuser = comment.user || {}; // 如果 comment.user 为 null 或 undefined，默认值为 {}
    const {user} = useUser()
    const {getToken} = useAuth()
    const role: unknown = user?.publicMetadata?.role
    // 为 img 和 username 设置默认值
    const imgUrl = cuser.img || 'https://ik.imagekit.io/Tricia/MyBlogImgs/user_avatar?updatedAt=1738817973222'; // 默认头像
    const username = cuser.username || '匿名用户'; // 默认用户名

    // 使用useQueryClient来获取查询客户端
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            // 新增评论之前需要做鉴权
            const token: string = await getToken() || ''
            return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            // 使用invalidateQueries
            queryClient.invalidateQueries({queryKey: ["comments", postId]})
            toast.success("评论删除成功！")

        },
        onError: (error: Error) => {

            toast.error(error.message)
        }
    })

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
                {user && (username === user.username || role === 'admin') &&
                    (<span className='text-xs text-rose-800 hover:text-rose-400 cursor-pointer'
                           onClick={() => mutation.mutate()}>
                        删除
                        {mutation.isPending && <span>(稍等喵...)</span>}
                    </span>)}
            </div>
            <div className='mt-4'>
                <p>{comment.desc}</p>
            </div>
        </div>
    );
};

export default PostComment;
