import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skywash: "#f8fbff",
        paper: "#ffffff",
        skyglow: "#eafaff",
        studio: "#ecfeff",
        violet: "#8b5cf6",
        aqua: "#06b6d4",
        coral: "#ec4899",
        mint: "#10b981",
        rose: "#fb7185",
        sun: "#f59e0b"
      },
      boxShadow: {
        cyan: "0 20px 60px rgba(6, 182, 212, 0.18)",
        pink: "0 20px 60px rgba(236, 72, 153, 0.18)",
        studio: "0 30px 90px rgba(14, 165, 233, 0.18)",
        card: "0 18px 46px rgba(15, 23, 42, 0.10)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "page-bright": "radial-gradient(circle at 12% 18%, rgba(6,182,212,.18), transparent 26%), radial-gradient(circle at 86% 10%, rgba(236,72,153,.16), transparent 24%), linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #eefcff 100%)",
        "radial-studio": "radial-gradient(circle at 20% 12%, rgba(6,182,212,.18), transparent 26%), radial-gradient(circle at 82% 18%, rgba(236,72,153,.16), transparent 24%), radial-gradient(circle at 50% 72%, rgba(16,185,129,.12), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f8fbff 52%, #ecfeff 100%)"
      }
    }
  },
  plugins: []
};

export default config;
