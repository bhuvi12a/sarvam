/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#967D5F", // The button color (muted gold/brown)
          foreground: "#ffffff",
          dark: "#7a654c",
        },
        secondary: {
          DEFAULT: "#4A3B2A", // The text color (dark brown)
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#F5F0EB", // The light beige background
          foreground: "#4A3B2A",
        },
        border: "#E5E0DC",
      },
    },
  },
  plugins: [],
}