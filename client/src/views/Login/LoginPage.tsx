import {SignIn} from "@clerk/clerk-react";

const LoginPage = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            {/*点击signup时重定向到 注册页面*/}
            <SignIn signUpUrl='/register' />
        </div>
    );
};

export default LoginPage;