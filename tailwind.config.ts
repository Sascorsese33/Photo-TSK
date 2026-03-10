import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#101018",
        card: "#12121C",
        gold: "#F59E0B",
        amber: "#D97706",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245, 158, 11, 0.25), 0 10px 35px rgba(245, 158, 11, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
