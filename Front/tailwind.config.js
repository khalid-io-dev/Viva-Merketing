/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        secondary: "#535bf2",
        background: {
          light: "#f3f4f6", // bg-gray-100
          dark: "#1f2937", // bg-gray-800
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")], 
};