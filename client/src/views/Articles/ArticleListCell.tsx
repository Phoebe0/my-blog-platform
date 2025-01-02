import React from 'react';
import style from '../../styles/style.module.css'; // 假设使用 CSS Modules
// 定义假数据的类型
interface Article {
    _id: string; // 文章 ID
    title: string; // 文章标题
    coverImg: string; // 封面图片 URL
    time: string; // 发表日期
    viewCount: number; // 阅读数
    commentCount: number; // 评论数
}

// 定义组件的 Props 类型
interface ArticleListCellProps {
    data: Article; // 文章数据
}
// 使用函数式组件
const ArticleListCell: React.FC<ArticleListCellProps> = ({ data }) => {
    return (
        <div className={style.container} >
            {/* 封面图片 */}
            <div>
                <img src={data.coverImg} alt="封面" />
            </div>

            {/* 文章信息 */}
            <div className={style.bottomContainer}>
                {/* 标题 */}
                <p className={style.title}>{data.title}</p>

                {/* 摘要 */}
                <p className={style.summary}>
                    摘要
                </p>
                {/* 文章元数据（发表日期、阅读数、评论数） */}
                <div>
                    <p>
                        <span><img alt="发表日期" />{data.time}</span>
                        <span><img alt="阅读数" />{data.viewCount}</span>
                        <span><img alt="评论数" />{data.commentCount}</span>
                    </p>
                    {/* 阅读全文 */}
                    <span className={style.lastSpan}>
            阅读全文 <span>》</span>
          </span>
                </div>
            </div>
        </div>
    );
};

export default ArticleListCell;