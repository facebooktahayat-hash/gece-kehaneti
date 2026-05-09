import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { abyss:"#05020a", night:"#0b0615", blood:"#6f1230", violet:"#7c3aed", frost:"#38bdf8", ember:"#ff2d75", gold:"#f5c76a" },
    boxShadow: { neon:"0 0 30px rgba(168,85,247,.45)", frost:"0 0 28px rgba(56,189,248,.35)", blood:"0 0 28px rgba(255,45,117,.35)" },
    backgroundImage: { "radial-ritual":"radial-gradient(circle at top,rgba(124,58,237,.25),transparent 34%),radial-gradient(circle at bottom right,rgba(255,45,117,.16),transparent 30%),linear-gradient(135deg,#05020a 0%,#0b0615 44%,#16071f 100%)" }
  }},
  plugins: []
};
export default config;