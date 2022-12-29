/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    "text-success",
    "text-warning",
    "text-error",
    "border-success",
    "border-warning",
    "border-error",
    "bg-success",
    "bg-warning",
    "bg-error",
    "alert-success",
    "alert-warning",
    "alert-error"
  ]
}
