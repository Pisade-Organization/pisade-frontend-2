module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./views/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
  	extend: {
		fontFamily: {
			thai: [
				'Noto Sans Thai',
				'sans-serif'
			],
			rethink: [
				'Rethink Sans',
				'sans-serif'
			],
		},
		fontSize: {
			'headline-1': [
				'40px',
				{ lineHeight: '130%', letterSpacing: '0', fontWeight: '700' }
			],
			'headline-2': [
				'32px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700' }
			],
			'headline-3': [
				'28px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700' }
			],
			'headline-4': [
				'24px',
				{ lineHeight: '120%', letterSpacing: '0', fontWeight: '700' }
			],
			'headline-5': [
				'20px',
				{ lineHeight: '130%', letterSpacing: '0', fontWeight: '700'}
			],
			'title-1': [
				'18px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700'}
			],
			'title-2': [
				'16px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700'}
			],
			'title-3': [
				'14px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700'}
			],
			'title-4': [
				'12px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '700'}
			],
			'label-1': [
				'18px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '500'}
			],
			'label-2': [
				'16px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '500'}
			],
			'label-3': [
				'14px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '500'}
			],
			'label-4': [
				'12px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '500'}
			],
			'body-1': [
				'18px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '400'}
			],
			'body-2': [
				'16px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '400'}
			],
			'body-3': [
				'14px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '400'}
			],
			'body-4': [
				'12px',
				{ lineHeight: '150%', letterSpacing: '0', fontWeight: '400'}
			]
		},
			colors: {
				// Design system palettes
				neutral: {
					50: '#efefef',
					100: '#cecece',
					200: '#b6b6b6',
					300: '#959595',
					400: '#818181',
					500: '#616161',
					600: '#585858',
					700: '#454545',
					800: '#353535',
					900: '#292929'
				},
				'deep-royal-indigo': {
					50: '#e8e6f0',
					100: '#b8b0d0',
					200: '#968ab9',
					300: '#665598',
					400: '#493485',
					500: '#1b0166',
					600: '#19015d',
					700: '#130148',
					800: '#0f0138',
					900: '#0b002b'
				},
				'radiant-lavender': {
					50: '#faefff',
					100: '#efcfff',
					200: '#e7b7ff',
					300: '#dc96fe',
					400: '#d582fe',
					500: '#cb63fe',
					600: '#b95ae7',
					700: '#9046b4',
					800: '#70368c',
					900: '#552a6b'
				},
				'electric-violet': {
					25: '#FBF7FE',
					50: '#f0e6fd',
					100: '#d2b2f8',
					200: '#bc8df4',
					300: '#9d5af0',
					400: '#8a39ed',
					500: '#6d08e8',
					600: '#6307d3',
					700: '#4d06a5',
					800: '#3c0480',
					900: '#2e0361'
				},

				// Semantic tokens
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: '#1b0166', // deep-royal-indigo-500
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#cb63fe', // radiant-lavender-500
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#e8e6f0', // deep-royal-indigo-50 as subtle surface
					foreground: '#454545'
				},
				accent: {
					DEFAULT: '#6d08e8', // electric-violet-500
					foreground: '#ffffff'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff'
				},
				border: '#e5e7eb',
				input: '#e5e7eb',
				ring: '#6d08e8',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
  		animation: {
  			float: 'float 3s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
