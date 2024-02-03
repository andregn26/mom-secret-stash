/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				test: "oklch(var(--primary-muted) / <alpha-value>)",
				"slate-50": "#f9fafb",
				"slate-100": "#f1f5f9",
				"slate-200": "#e2e8f0",
				"slate-300": "#cbd5e1",
				"slate-400": "#94a3b8",
				"slate-500": "#64748b",
				"slate-600": "#475569",
				"slate-700": "#334155",
				"slate-800": "#1e293b",
				"slate-900": "#0f172a",
				"slate-950": "#020617",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: "#22c55e",
				},
			},
			// {
			// 	dark: {
			// 		...require("daisyui/src/theming/themes")["dark"],
			// 		primary: "#e879f9",
			// 	},
			// },
		],
	},
	darkMode: ["class", '[data-theme="dark"]'],
};
