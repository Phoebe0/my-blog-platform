import React from 'react';
import BlogNav from "../components/BolgNav.tsx";
import {Outlet} from "react-router-dom";
import '../index.css';
const MainLayout:React.FC = () => {
    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            <BlogNav/>
            {/*渲染匹配的子路由组件。
            它在父路由组件中充当占位符，子路由组件将显示在此位置。
            当一个具有子路由的路由匹配时，Outlet 组件将根据当前 URL 渲染相应的子路由组件*/}
            <Outlet/>
        </div>
    );
};

export default MainLayout;