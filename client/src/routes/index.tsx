import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../views/NotFound/NotFound.tsx";
import PostListRouter  from "./PostListRouter.tsx";
import HomeRouter from "./HomeRouter.tsx";
import LoginRouter  from "./LoginRouter.tsx";
import RegisterRouter from "./RegisterRouter.tsx";
import SinglePostRouter from "./SinglePostRouter.tsx";
import WriteBlogRouter from "./WriteBlogRouter.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
const router = createBrowserRouter([
    {
        element: <MainLayout/>, // 公共布局
        children: [
            ...HomeRouter,
            ...LoginRouter,
            ...RegisterRouter,
            ...PostListRouter,
            ...SinglePostRouter,
            ...WriteBlogRouter,
        ],
    },
    { path: "*", element: <NotFound/>},
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}