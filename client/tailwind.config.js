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
        },
    },
    plugins: [require('@tailwindcss/typography')],
}