import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-lg text-center relative">
                {/* 动态漂浮容器 */}
                <div className="animate-float">
                    <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
                        {/* 破碎地球主体 */}
                        <path d="M100 20a80 80 0 1 1 0 160" fill="#f3637a" stroke="#4F46E5" strokeWidth="4">
                            <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"/>
                        </path>

                        {/* 破碎效果 */}
                        <path d="M100 20l-20 60l40 20z" fill="#ef444a" className="animate-float">
                            <animateTransform attributeName="transform" type="translate" values="0,0;5,-5;0,0" dur="2s"
                                              repeatCount="indefinite"/>
                        </path>
                        <path d="M120 100l-30 40l20 10z" fill="#159e0b" className="animate-float">
                            <animateTransform attributeName="transform" type="translate" values="0,0;-5,5;0,0"
                                              dur="2.5s" repeatCount="indefinite"/>
                        </path>

                        {/* 404文字 */}
                        <text x="100" y="120" textAnchor="middle" className="text-4xl font-bold fill-gray-600">
                            404
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                        </text>

                        {/* 闪烁星星 */}
                        <circle cx="50" cy="30" r="2" fill="white" className="animate-pulse"/>
                        <circle cx="150" cy="50" r="3" fill="white" className="animate-pulse"/>
                    </svg>
                </div>

                {/* 文字内容 */}
                <h1 className="text-5xl font-bold text-sky-900 mt-8 mb-4 animate-fade-in">
                    页面消失🫠
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    咦？你好像迷路了...
                    <br/>
                    👇🏻
                </p>
                {/* 返回按钮 */}
                <Link to="/"
                      className="inline-block bg-rose-600 hover:bg-rose-700 text-white
                                 px-8 py-3 rounded-lg transition-all duration-300 
                                 transform hover:scale-105 shadow-lg">
                    返回首页
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
