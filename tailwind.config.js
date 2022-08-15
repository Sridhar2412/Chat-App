module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      borderRadius: {
        10: "10px",
      },
      colors: {
        "custom-blue": "#3574ff",
      },
      fontFamily: {
        display: ["Poppins", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
