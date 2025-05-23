import PostComment from "./PostComment.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react";
import type {Comment} from '../types/comment.d.ts'
import type {PostData} from "../types/post.d.ts";

import type {FormSubmitEvent} from '../types/common.d.ts'
import {useRef} from "react";

const fetchComments = async (postId: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res.data
}

const PostComments = ({postId}: { postId: string }) => {
    const {user} = useUser()
    const {getToken} = useAuth()
    console.log(user)
    // 使用useQueryClient来获取查询客户端
    const queryClient = useQueryClient()
    const {isPending, error, data} = useQuery({
        queryKey: ["comments", postId], // 查询键
        queryFn: () => fetchComments(postId)
    })
    const mutation = useMutation({
        mutationFn: async (newComment: Comment) => {
            // 新增评论之前需要做鉴权
            const token: string = await getToken() || ''
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onMutate: async (newComment) => {
            // 在 mutation 执行前，获取当前的评论列表
            const previousComments = queryClient.getQueryData(["comments", postId]);

            // 直接为评论列表添加新的评论（模拟成功提交）
            queryClient.setQueryData(["comments", postId], (old: Comment[]) => [

                {...newComment, createdAt: new Date(), _id: Math.random().toString()}, // 模拟新的评论 ID
                ...old,
            ]);

            // 返回一个回滚函数，用于错误时恢复数据
            return {previousComments};
        },
        onSuccess: () => {
            // 使用invalidateQueries
            queryClient.invalidateQueries({queryKey: ["comments", postId]})

        },
        onError: (error: Error, context: { previousComments: Comment[] }) => {
            // 如果出现错误，恢复评论列表为提交前的状态
            queryClient.setQueryData(["comments", postId], context.previousComments);
            toast.error(error.message)
        }
    })
    const textareaRef = useRef<HTMLTextAreaElement>(null); // 创建一个 ref 来引用 textarea

    const handleCommentSubmit = (e: FormSubmitEvent) => {
        e.preventDefault() // 阻止表单默认提交行为
        const formData = new FormData(e.currentTarget)
        console.log(formData)
        const data: Comment = {
            desc: formData.get("desc")?.toString() || '',
            post: postId
        }
        mutation.mutate(data)
        // 清空输入框
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
    }
    return (
        <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
            <h1 className='text-xl text-gray-600 underline'>评论</h1>
            <form onSubmit={handleCommentSubmit} className='flex items-center justify-between gap-8 w-full'>
                <textarea ref={textareaRef}
                          name='desc'
                          placeholder='友好评论'
                          className='w-full p-4 rounded-2xl'>

                </textarea>
                <button className='bg-pink-800 px-4 py-2 text-white font-medium rounded-full'>发表
                </button>
            </form>

            {isPending ? "评论加载中..." : error ? "阿偶，评论加载出了点问题..." :
                <>
                    {/*{*/}
                    {/*    mutation.isPending && (*/}
                    {/*        <PostComment comment={{*/}
                    {/*            desc: `${mutation.variables.desc}(评论中... )`,*/}
                    {/*            createdAt: new Date(),*/}
                    {/*            user: {*/}
                    {/*                img: user?.imageUrl || 'https://ik.imagekit.io/Tricia/MyBlogImgs/user_avatar?updatedAt=1738817973222',*/}
                    {/*                username: user?.username || '默认'*/}
                    {/*            }*/}
                    {/*        }}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    {data.map((comment: Comment) => (

                        <PostComment key={comment._id} comment={comment} postId={postId}/>
                    ))}
                </>
            }
        </div>
    );
};

export default PostComments;