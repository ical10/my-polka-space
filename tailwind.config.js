/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#fc999b",
          secondary: "#e88f9d",
          accent: "#fcc392",
          neutral: "#211F2E",
          "base-100": "#EEEFF1",
          info: "#9BBDF8",
          success: "#5BECC7",
          warning: "#F3AB12",
          error: "#F57072",
        },
      },
      "dark",
    ],
  },
};
