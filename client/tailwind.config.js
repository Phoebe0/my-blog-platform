/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                kaiti: ['楷体', 'serif'],
                xiaozhuan: ['Small Seal Script', 'serif'],
                shoujin: ['Slender Gold Script', 'serif'],
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                meteor: 'meteor 1s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out'
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-20px)'}
                },
                meteor: {
                    '0%': {opacity: 1, transform: 'translateX(0)'},
                    '100%': {opacity: 0, transform: 'translateX(-100px)'}
                },
                fadeIn: {
                    '0%': {opacity: 0},
                    '100%': {opacity: 1}
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
}