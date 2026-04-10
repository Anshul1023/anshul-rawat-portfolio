/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        panel: "#0b1224",
        accent: {
          cyan: "#67e8f9",
          rose: "#fb7185",
          violet: "#a78bfa",
          amber: "#f59e0b"
        }
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(103, 232, 249, 0.18)",
        glass: "0 20px 60px rgba(4, 8, 22, 0.45)"
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at top, rgba(103,232,249,0.12), transparent 32%), radial-gradient(circle at bottom right, rgba(251,113,133,0.14), transparent 28%)"
      }
    }
  },
  plugins: []
};

