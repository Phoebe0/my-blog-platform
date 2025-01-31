// 注册路由
import SinglePostPage from "../views/PostList/SinglePostPage.tsx";
import { RouteObject } from "react-router-dom";

const SinglePostRouter: RouteObject[] =  [
    {
        path: "/singlepost",
        element: <SinglePostPage/>,
    },
];
export default SinglePostRouter