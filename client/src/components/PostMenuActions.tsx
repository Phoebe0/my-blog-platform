import {useAuth, useUser} from "@clerk/clerk-react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const PostMenuActions = ({post}) => {
    const {user} = useUser()
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const {isPending, error, data: savedPosts} = useQuery({
        queryKey: ["savedPosts"], // 查询键
        queryFn: async () => {
            const token: string = await getToken() || ''
            return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    // 删除文章函数
    const deletePost = useMutation({
        mutationFn: async () => {
            const token: string = await getToken() || ''
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            toast.success('文章删除成功')
            // 删除成功后，跳转到首页
            navigate('/')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    // 收藏文章函数
    const queryClient = useQueryClient()
    const savePost = useMutation({
        mutationFn: async () => {
            const token: string = await getToken() || ''
            return axios.post(`${import.meta.env.VITE_API_URL}/users/save`,
                {
                    postId: post._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["savedPosts"],
            })
            // 收藏成功后，提示用户
            toast.success(isSaved ? '文章取消收藏' : '文章收藏成功')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    const handleDelete = () => {
        deletePost.mutate()
    }
    const handleSave = () => {
        // 如果没登录，则不能收藏，返回登录页面
        if (!user) {
            navigate('/login')
            return
        }
        savePost.mutate()
    }
    // 判断当前登录用户是否为admin
    const isAdmin: boolean = user?.publicMetadata.role === 'admin' || false
    // 判断是否收藏了
    const isSaved: boolean = savedPosts?.data?.some((p: string) => p === post._id) || false

    return (
        <div className=''>
            <h1 className='mt-8 mb-4 text-sm font-medium'>操作</h1>
            {isPending ? '加载中...' : error ? error.message :
                (<div className='flex items-center gap-2 py-2 text-sm cursor-pointer' onClick={handleSave}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        fill='lightgreen'
                    >
                        <path
                            d='M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z'
                            stroke='black'
                            strokeWidth='2'
                            fill={isSaved ? 'lightgreen' : 'none'}
                        />
                    </svg>
                    <span>收藏</span>
                </div>)}
            {/*如果是当前文章的作者 或 admin 用户，则可以删除*/}
            {user && (post.user.username === user?.username || isAdmin) && (
                <div className='flex items-center gap-2 py-2 text-sm cursor-pointer' onClick={handleDelete}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        fill='none'
                        stroke="red"
                    >
                        <path d="M12 16h24v24H12zM16 4h16v4H16zM36 20v16H12V20h24z"/>
                    </svg>
                    <span>删除</span>
                    {deletePost.isPending && (
                        <span className='text-sm'>(正在删除... )</span>
                    )}
                </div>)}
        </div>
    );
};

export default PostMenuActions;