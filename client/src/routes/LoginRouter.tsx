// 登陆路由
import LoginPage from "../views/Login/LoginPage.tsx";
import { RouteObject } from "react-router-dom";

const LoginRouter: RouteObject[] =  [
    {
        path: "/login",
        element: <LoginPage/>,
    },
];
export default LoginRouter