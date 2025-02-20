import {useAuth, useUser} from "@clerk/clerk-react";

const PostMenuActions = ({post}) => {
    const user = useUser()
    const getToken = useAuth()
    console.log('😁', user)
    return (
        <div className=''>
            <h1 className='mt-8 mb-4 text-sm font-medium'>操作</h1>
            <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
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
                        strokeWidth='2'/>
                </svg>
                <span>收藏</span>
            </div>
            {user && (post.user.username === user.user?.username) && (
                <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
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
                            strokeWidth='2'/>
                    </svg>
                    <span>取消收藏</span>
                </div>)}
        </div>
    );
};

export default PostMenuActions;