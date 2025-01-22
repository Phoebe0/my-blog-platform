import React, { useState } from 'react';
import style from '../../styles/style.module.css';

interface AuthFormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<AuthFormData>({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里添加登录/注册逻辑
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={style.authContainer}>
            <h2>{isLogin ? '登录' : '注册'}</h2>
            <form onSubmit={handleSubmit} className={style.authForm}>
                <div className={style.formGroup}>
                    <label htmlFor="username">用户名</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="password">密码</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className={style.formGroup}>
                        <label htmlFor="confirmPassword">确认密码</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}
                <button type="submit" className={style.submitButton}>
                    {isLogin ? '登录' : '注册'}
                </button>
            </form>
            <p className={style.switchMode}>
                {isLogin ? '还没有账号？' : '已有账号？'}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className={style.switchButton}
                >
                    {isLogin ? '立即注册' : '去登录'}
                </button>
            </p>
        </div>
    );
};

export default Auth;