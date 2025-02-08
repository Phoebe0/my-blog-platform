import PostList from "../../components/PostList.tsx";

const PostListPage = () => {
    return (
        <div className=''>
            <h1 className='mb-8 text-2xl'>文章</h1>
            <div className='flex gap-8'>
                <div className=''>
                    <PostList/>
                </div>
                <div className=''></div>
            </div>

        </div>
    );
};

export default PostListPage;