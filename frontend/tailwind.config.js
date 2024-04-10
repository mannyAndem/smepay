/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{jsx, js}",
    "./src/**/**/**/*.{jsx, js}",
    "./src/**/*.{jsx, js}",
    "./src/*.{jsx, js}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#f5f5f5",
        darkGray: "#f2f2f2",
        veryDarkGray: "#807E7E",
        lightGray: "#D9D9D9",
        blue: "#3498DB",
        paleBlue: "#82CBFC",
        veryDarkBlue: "#001F3F",
        green: "#2ECC71",
        orange: "#FF9800",
        red: "#E74C3C",
        dark: "#1e1e1e",
        paleDark: "#333",
      },
    },
  },
  plugins: [],
};
