import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#020006",
        night: "#07000d",
        void: "#000000",
        ritual: "#12001e",
        violet: "#7c1cff",
        frost: "#00d7ff",
        ember: "#ff00b8",
        poison: "#b000ff",
        blood: "#5a0024",
        gold: "#f7c86b"
      },
      boxShadow: {
        cyan: "0 0 24px rgba(0, 215, 255, 0.40)",
        pink: "0 0 26px rgba(255, 0, 184, 0.42)",
        ritual: "0 0 80px rgba(130, 0, 220, 0.28)",
        card: "0 0 34px rgba(255, 0, 184, 0.18)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"]
      },
      backgroundImage: {
        "page-dark": "radial-gradient(circle at 50% 10%, rgba(70,0,110,.30), transparent 32%), linear-gradient(180deg, #020006 0%, #07000d 48%, #020006 100%)"
      }
    }
  },
  plugins: []
};

export default config;