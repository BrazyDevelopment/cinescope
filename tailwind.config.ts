import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		animation: {
		  'fade-in-up': 'fadeInUp 0.5s ease-out',
		  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
		keyframes: {
		  fadeInUp: {
			'0%': { opacity: '0', transform: 'translateY(10px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' },
		  },
		  pulse: {
			'0%, 100%': { opacity: '1' },
			'50%': { opacity: '.8' },
		  },
		},
	},
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: true,
  },
} satisfies Config;
