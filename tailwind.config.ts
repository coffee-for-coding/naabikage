import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0c0a",
        bone: "#e8e4dc",
      },
    },
  },
  plugins: [],
};

export default config;
