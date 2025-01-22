import React from 'react';
import ArticleListCell from './ArticleListCell.tsx';
import { mockArticles } from '../../mock/articles';
import style from '../../styles/style.module.css';
// // 定义文章数据的类型
// interface Article {
//     // 柑橘fakeData定义文章数据类型
//     _id: string; // 文章 ID
//     title: string; // 文章标题
//     coverImg: string; // 封面图片 URL
//     time: string; // 发表日期
//     viewCount: number; // 阅读数
//     commentCount: number; // 评论数
//
//
// }

// 定义组件的 Props 类型
// interface ArticleListProps {
//     data: Article[];
//
// }

// 使用 React.memo 优化性能，避免不必要的渲染
const ArticleList = React.memo(() => {
    return (
        <div className={style.articleList}>
            {mockArticles.map(article => (
                <ArticleListCell key={article._id} data={article} />
            ))}
        </div>
    );
});

export default ArticleList;