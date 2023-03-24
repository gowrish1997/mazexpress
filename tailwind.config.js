/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./common/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm:"500px",
            md: "750px",
            xmd:"1200px",
            lg:"2000px",
            xlg:"2600px"

            // => @media (min-width: 640px) { ... }
        },
    },
    plugins: [],
};

