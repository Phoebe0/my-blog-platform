import Image from "./Image.tsx";
import {Link} from "react-router-dom";

const PostListItem = () => {
    return (
        <div className='flex flex-col xl:flex-row gap-8'>
        {/*image*/}
            <div className='md:hidden xl:block xl:w-1/3'>
                <Image path='/MyBlogImgs/post.png' className='rounded-2xl object-cover' w={735} />
            </div>
        {/*文章列表*/}
            <div className='flex flex-col gap-4 xl:w-2/3'>
            {/*标题*/}
                <Link to='/test' className='text-4xl font-semibold'>
                    大语言模型的概念就是通过数据集进行训练，经过不断调整指令参数来解决推理问题。
                </Link>
            {/*副标题*/}
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <span>作者：</span>
                    <Link to='' className='text-fuchsia-500' >祟祟平安</Link>
                    <span>·</span>
                    <Link to=''  className='text-rose-500'>前端</Link>
                    <span>1 周前</span>
                </div>
                {/*文章内容*/}
                <p>
                    前情回顾 - 什么是redux 🪷
                    最流行的状态管理工具之一。(类似于 vue中的vuex)

                    Redux和React是两个独立的工具/

                    三个核心概念🌟
                    action（动作/行为）：【对象格式】描述要做的事（例如：登陆、退出、增删改查等等…)
                    reducer（函数）：【函数格式 function reducer(state = 0，action){ } 】更新状态
                    store（仓库）：整合action(动作)和reduce(函数)

                </p>
                <Link to='/test' className='underline text-rose-800 text-sm'>更多...</Link>
            </div>

        </div>
    );
};

export default PostListItem;