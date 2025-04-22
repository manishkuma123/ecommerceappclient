// tailwind.config.js
export default {
  darkMode: 'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // Look for classes in pages directory
    "./components/**/*.{js,ts,jsx,tsx}",  // Look for classes in components directory
    "./app/**/*.{js,ts,jsx,tsx}",  // Look for classes in app directory (for Next.js 13)
  ],
  theme: {
    extend: {
      // Optionally extend dark mode or other theme configurations
      // colors: {
      //   darkBackground: '#121212', // Example dark mode background
      //   darkText: '#E5E5E5',  // Example light text color in dark mode
      // },

      colors: {
        darkBackground: '#181818',
        lightBackground: '#f4f4f4',
      },
    },
  },
  plugins: [],
};
