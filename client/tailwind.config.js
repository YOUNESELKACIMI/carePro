/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",
        secondary: "#0d524c",
        palette1: "#222831",
        palette2: "#393E46",
        palette3: "#00ADB5",
        palette4: "#EEEEEE",
      },
      backgroundColor: {
        primary: "#0f766e",
        secondary: "#0d524c",
        palette1: "#222831",
        palette2: "#393E46",
        palette3: "#00ADB5",
        palette4: "#EEEEEE",
      },
    },
  },
};