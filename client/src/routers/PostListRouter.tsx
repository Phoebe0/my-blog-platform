// 用于管理PostList页面的路由

import { RouteObject } from "react-router-dom";

import PostListPage from "../views/PostList/PostListPage.tsx";

const PostListRouter: RouteObject[] = [
    {
        path: "/post",
        element: <PostListPage />,
    },
];

export default  PostListRouter