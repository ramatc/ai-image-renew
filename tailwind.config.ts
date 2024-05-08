import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        jade: {
          "50": "#effef7",
          "100": "#dafeef",
          "200": "#b8fadd",
          "300": "#81f4c3",
          "400": "#43e5a0",
          "500": "#1acd81",
          "600": "#0fa968",
          "700": "#108554",
          "800": "#126945",
          "900": "#11563a",
          "950": "#03301f",
        },
      },
    },
  },
  plugins: [],
};
export default config;
