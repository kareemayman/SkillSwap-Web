/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // ← include Flowbite
    "./node_modules/flowbite/**/*.js", // ← include Flowbite core
  ],
  theme: {
    extend: {
      keyframes: {
        slideOutWithOpacity: {
          "0%": { transform: "translateX(100%)", opacity: "1" },
          "50%": { opacity: "0.05" },
          "100%": { transform: "translateX(0%)", opacity: "0" },
        },
        slideInWithOpacity: {
          "0%": { transform: "translateX(0%)", opacity: "0" },
          "50%": { opacity: "0.05" },
          "100%": { transform: "translateX(100%)", opacity: "1" },
        },
      },
      animation: {
        slideOut: "slideOutWithOpacity 300ms ease-out forwards",
        slideIn: "slideInWithOpacity 300ms ease-in forwards",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // ← add Flowbite plugin
  ],
};
