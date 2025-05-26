import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
        extend: {
            // ... your existing fontFamily and borderRadius

            colors: {
                // Keep your HSL-based semantic colors for core UI elements
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
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: { /* Keep your chart colors, adjust if needed */
                     '1': 'hsl(var(--chart-1))',
                     '2': 'hsl(var(--chart-2))',
                     '3': 'hsl(var(--chart-3))',
                     '4': 'hsl(var(--chart-4))',
                     '5': 'hsl(var(--chart-5))'
                },

                // REVAMPED CUSTOM PALETTE
                custom: {
                    // --- NEUTRALS ---
                    'stone': { // Warm, earthy grays/beiges
                        '50':  '#F8F6F2', // Was lightAccent (almost white, subtle warmth)
                        '100': '#EDEAE4', // New - very light stone
                        '200': '#DCD6CC', // Evolved from dimAccent/dim
                        '300': '#C9BFB2',
                        '400': '#B3A799',
                        '500': '#A89A89', // Main "stone" - good for secondary text, borders
                        '600': '#8E8073',
                        '700': '#70655A', // Good for primary text on light bg
                        '800': '#554C42',
                        '900': '#3C342D', // Deep, rich stone - good for dark bg elements
                        '950': '#2F2822', // Almost black stone - good for main dark bg
                    },
                    'slate': { // Cool, architectural grays
                        '50':  '#F7F8F9', // Very light cool gray
                        '100': '#E8EBEE',
                        '200': '#CED5DB', // Evolved from your dim colors
                        '300': '#B4BEC7',
                        '400': '#9AA8B3',
                        '500': '#808F9C', // Main "slate"
                        '600': '#677887',
                        '700': '#4F5F6E', // Good for text
                        '800': '#3A4856',
                        '900': '#2A343F', // Deep slate for dark mode
                        '950': '#1E252C', // Very dark slate
                    },

                    // --- BLUES (Sky, Water, Glass, Cool Metals) ---
                    'sky': { // Clear, modern blues
                        'light': '#DDEAF6',    // Was like custom.dim but more blue
                        'DEFAULT': '#86B4CD',  // Your custom.dark
                        'medium': '#5D9CBD',   // New mid-tone
                        'deep': '#408AB2',     // Your custom.darkAccent - good for primary actions
                        'hover': '#357FAA',    // Darker for hover on 'deep'
                        'content': '#FFFFFF',  // Text on sky.deep
                    },

                    // --- GREENS (Nature, Patina, Sustainable Elements) ---
                    'forest': { // Deep, sophisticated greens
                        'light': '#E2EEDD',    // Evolved from custom.midAccent/lightAccent (more green)
                        'DEFAULT': '#A8C098',  // Evolved from custom.mid/light (more refined)
                        'medium': '#7CA366',
                        'deep': '#527D44',     // Richer, deeper green
                        'hover': '#416636',
                        'content': '#FFFFFF',
                    },
                    'patina': { // Muted, aged greens/teals
                        'light': '#D0E0DC',
                        'DEFAULT': '#A0BFAE',
                        'medium': '#77A08D',
                        'deep': '#50826C',
                        'content': '#F0F5F3', // Off-white content for deep patina
                    },

                    // --- ACCENTS (Warm metals, Terracotta) ---
                    'bronze': { // Warm, metallic accent
                        'light': '#FCE9D4',
                        'DEFAULT': '#D9A46C', // A classic bronze
                        'medium': '#C08E58',
                        'deep': '#A1703A',
                        'content': '#422D16', // Dark brown content
                    },
                    'terracotta': { // Earthy, warm accent
                        'light': '#FADBD0',
                        'DEFAULT': '#E5987D',
                        'medium': '#D97E5E',
                        'deep': '#C26040',
                        'content': '#FFFFFF',
                    },

                    // --- UTILITY (Can be used for links or specific highlights) ---
                    // Removed blurple, but if you need a vibrant accent:
                    // 'electricBlue': {
                    //   'DEFAULT': '#4A90E2',
                    //   'hover': '#357ABD',
                    //   'content': '#FFFFFF',
                    // }
                },
                sidebar: { // Keep or adapt your sidebar colors
                  DEFAULT: 'hsl(var(--sidebar-background))',
                  // ... rest of sidebar colors
                }
            }
        }
    },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
