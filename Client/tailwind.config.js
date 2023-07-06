/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@rewind-ui/core/dist/theme/styles/*.js',
		'./node_modules/@rewind-ui/core/dist/theme/styles/Button.styles.js',
		'./node_modules/@rewind-ui/core/dist/theme/styles/Text.styles.js',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar')({ nocompatible: true }),
		require('@tailwindcss/forms')({
			strategy: 'class', // only generate classes
		}),
	],
};
