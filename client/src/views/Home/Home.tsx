// 博客主页 包括路由分页 轮播图 登陆注册模块  使用假数据 不使用第三方组件
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,

} from 'react-router-dom'
import Article from "../Articles/Article.tsx";
export default function Home() {
    return (
        // 文章标签分类
        <nav>
            <Router>
                <NavLink to="/" >
                    最热
                </NavLink>
                <NavLink to="/article/1"  className={({ isActive }) => (isActive ? 'active' : '')} >
                    文章1
                </NavLink>
                <NavLink to="/article/2" >
                    文章2
                </NavLink>
                <NavLink to="/article/3">
                    文章3
                </NavLink>
                <Routes>
                    {/*<Route path="/"  element={<Home/>}></Route>*/}
                    <Route path="/article/:id" element={<Article/>} ></Route>
                    <Route path='/404'/>
                </Routes>
            </Router>
        </nav>
    )
}

