// 编辑博客路由
import WriteBlogPage from "../views/Write/WriteBlogPage.tsx";
import { RouteObject } from "react-router-dom";

const WriteBlogRouter: RouteObject[] =  [
    {
        path: "/write",
        element: <WriteBlogPage/>,
    },
];
export default WriteBlogRouter