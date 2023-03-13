/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./common/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm:"500px",
            md: "800px",
            xmd:"1200px",
            lg:"1600px",
            xlg:"2000px"

            // => @media (min-width: 640px) { ... }
        },
    },
    plugins: [],
};

