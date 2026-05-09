import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#020006",
        night: "#080010",
        void: "#000000",
        ritual: "#150021",
        blood: "#5a0022",
        violet: "#7f1dff",
        frost: "#ff00b8",
        ember: "#ff00b8",
        poison: "#b700ff",
        gold: "#f7c86b"
      },
      boxShadow: {
        neon: "0 0 26px rgba(255, 0, 184, 0.42)",
        frost: "0 0 24px rgba(255, 0, 184, 0.34)",
        blood: "0 0 28px rgba(255, 0, 184, 0.36)",
        ritual: "0 0 80px rgba(160, 0, 255, 0.30)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"]
      },
      backgroundImage: {
        "radial-ritual": "radial-gradient(circle at 50% 18%, rgba(55,0,86,.36), transparent 28%), radial-gradient(circle at 50% 48%, rgba(255,0,184,.10), transparent 38%), linear-gradient(180deg, #020006 0%, #080010 48%, #020006 100%)"
      }
    }
  },
  plugins: []
};

export default config;