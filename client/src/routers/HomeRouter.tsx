// 主页路由
import Home from "../views/Home/Home.tsx";
import { RouteObject } from "react-router-dom";

const HomeRouter: RouteObject[] =  [
    {
        path: "/",
        element: <Home />,
    },
];
export default HomeRouter