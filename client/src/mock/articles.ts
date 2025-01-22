// 模拟文章列表数据
export interface Article {
    _id: string;
    title: string;
    coverImg: string;
    summary: string;
    time: string;
    viewCount: number;
    commentCount: number;
}

export const mockArticles: Article[] = [
    {
        _id: '1',
        title: '深入理解React18新特性',
        coverImg: 'https://via.placeholder.com/300x200',
        summary: 'React18带来了许多激动人心的新特性，包括并发渲染、自动批处理等，本文将深入探讨这些特性的使用方法和最佳实践。',
        time: '2024-01-15',
        viewCount: 1250,
        commentCount: 28
    },
    {
        _id: '2',
        title: 'TypeScript高级类型指南',
        coverImg: 'https://via.placeholder.com/300x200',
        summary: '本文将介绍TypeScript中的高级类型用法，包括泛型、映射类型、条件类型等，帮助你更好地利用TypeScript的类型系统。',
        time: '2024-01-14',
        viewCount: 980,
        commentCount: 15
    },
    {
        _id: '3',
        title: '现代前端工程化实践',
        coverImg: 'https://via.placeholder.com/300x200',
        summary: '探讨现代前端开发中的工程化实践，包括构建工具、自动化测试、CI/CD等内容，助你打造高效的前端开发流程。',
        time: '2024-01-13',
        viewCount: 756,
        commentCount: 12
    }
];