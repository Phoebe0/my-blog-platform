import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
} from 'react-router-dom'
import Article from "../Articles/Article.tsx";
import ArticleList from "../Articles/ArticleList.tsx";
import style from '../../styles/style.module.css';
import { useState } from 'react';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { id: 1, image: 'https://via.placeholder.com/1200x400', title: '深入理解React18新特性' },
        { id: 2, image: 'https://via.placeholder.com/1200x400', title: 'TypeScript高级类型指南' },
        { id: 3, image: 'https://via.placeholder.com/1200x400', title: '现代前端工程化实践' },
    ];

    return (
        <div className={style.homeContainer}>
            {/* 头部导航区域 */}
            <header className={style.header}>
                <nav className={style.nav}>
                    <Router>
                        <div className={style.navLinks}>
                            <NavLink to="/" className={({ isActive }) => (isActive ? style.active : '')}>
                                最热
                            </NavLink>
                            <NavLink to="/article/1" className={({ isActive }) => (isActive ? style.active : '')}>
                                前端
                            </NavLink>
                            <NavLink to="/article/2" className={({ isActive }) => (isActive ? style.active : '')}>
                                后端
                            </NavLink>
                            <NavLink to="/article/3" className={({ isActive }) => (isActive ? style.active : '')}>
                                AI
                            </NavLink>
                        </div>

                        {/* 轮播图区域 */}
                        <div className={style.carousel}>
                            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
                            <div className={style.carouselDots}>
                                {slides.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`${style.dot} ${currentSlide === index ? style.activeDot : ''}`}
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 主要内容区域 */}
                        <main className={style.mainContent}>
                            <div className={style.articleSection}>
                                <Routes>
                                    <Route path="/" element={<ArticleList />} />
                                    <Route path="/article/:id" element={<Article />} />
                                    <Route path='/404'/>
                                </Routes>
                            </div>

                            {/* 侧边栏 */}
                            <aside className={style.sidebar}>
                                <div className={style.userInfo}>
                                    <h3>用户信息</h3>
                                    <div className={style.loginSection}>
                                        <button className={style.loginButton}>登录</button>
                                        <button className={style.registerButton}>注册</button>
                                    </div>
                                </div>
                                <div className={style.categories}>
                                    <h3>文章分类</h3>
                                    <ul>
                                        <li>前端开发 (8)</li>
                                        <li>后端开发 (8)</li>
                                        <li>人工智能 (5)</li>
                                        <li>算法设计 (7)</li>
                                    </ul>
                                </div>
                            </aside>
                        </main>
                    </Router>
                </nav>
            </header>
        </div>
    )
}

