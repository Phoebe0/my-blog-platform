// import React from 'react';

const BolgNav = () => {
    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        {/*logo*/}
            <div className='flex items-center gap-2 text-l font-bold font-serif '>
                <img src="../../public/logo.png" className='w-10 h-10' alt="logo"/>
                <span className=''>Tricia's Blog</span>
            </div>

        {/*mobile menu*/}
            <div className='md:hidden'>M</div>
        {/*desktop menu*/}
            <div className='hidden md:flex'>D</div>


        </div>
    );
};

export default BolgNav;