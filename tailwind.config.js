/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				black: '#000000',
				sidebar: '#242424',
				offwhite: '#FBFAEE',
				purple: '#933DC9',
				purpleDark: '#53118F',
			},
			fontFamily: {
				serif: [ 'Cambria Math', 'Cambria', 'Georgia', 'Times New Roman', 'serif' ],
			},
		},
	},
	plugins: [],
}


