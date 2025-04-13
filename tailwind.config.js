
/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
		padding: "2rem",
			screens: {
				"2xl": "1400px",
			}
		},
		
	},
};

export default config;
