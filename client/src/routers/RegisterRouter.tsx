// 注册路由
import RegisterPage from "../views/Register/RegisterPage.tsx";
import { RouteObject } from "react-router-dom";

const RegisterRouter: RouteObject[] =  [
    {
        path: "/register",
        element: <RegisterPage/>,
    },
];
export default RegisterRouter