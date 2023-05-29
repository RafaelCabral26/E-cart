/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'product': "url('public/profile_placeholder.svg')",
              }
        },
    },
    plugins: [
        require("daisyui")
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "secondary": "#0496FF",
                    "accent": "#F9E900",
                    "neutral": "#1D141F",
                    "base-100": "#F2F2F2",
                    "info": "#93B6E1",
                    "success": "#31C98C",
                    "warning": "#FCC93B",
                    "error": "#F53D46",
                },
            },
        ],
        
    },
}

