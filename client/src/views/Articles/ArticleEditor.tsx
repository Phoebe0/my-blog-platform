import React, { useState } from 'react';
import style from '../../styles/style.module.css';

interface ArticleFormData {
    title: string;
    content: string;
    coverImg: string;
}

const ArticleEditor: React.FC = () => {
    const [formData, setFormData] = useState<ArticleFormData>({
        title: '',
        content: '',
        coverImg: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里添加文章保存逻辑
        console.log('Article submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={style.editorContainer}>
            <h2>编辑文章</h2>
            <form onSubmit={handleSubmit} className={style.articleForm}>
                <div className={style.formGroup}>
                    <label htmlFor="title">文章标题</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="请输入文章标题"
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="coverImg">封面图片URL</label>
                    <input
                        type="url"
                        id="coverImg"
                        name="coverImg"
                        value={formData.coverImg}
                        onChange={handleInputChange}
                        placeholder="请输入封面图片URL"
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="content">文章内容</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        placeholder="请输入文章内容"
                        rows={15}
                    />
                </div>
                <div className={style.formActions}>
                    <button type="submit" className={style.submitButton}>
                        发布文章
                    </button>
                    <button type="button" className={style.saveButton}>
                        保存草稿
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleEditor;