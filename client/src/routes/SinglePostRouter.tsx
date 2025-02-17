// 注册路由
import SinglePostPage from "../views/PostList/SinglePostPage.tsx";
import {RouteObject} from "react-router-dom";

const SinglePostRouter: RouteObject[] = [
    // 动态路由，将 single 的参数提供给 SinglePostPage 组件。
    {
        path: "/post/:single",
        element: <SinglePostPage/>,
    },
];
export default SinglePostRouter