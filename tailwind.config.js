/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				genericJoe: '#323232'
			},
			animation: {
				'slow-fspin': 'slow-spin 0s linear infinite'
			}
		}
	},
	plugins: []
};
