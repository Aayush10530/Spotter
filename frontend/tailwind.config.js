/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "surface-container-highest": "#e5e2da",
              "secondary-container": "#83f5c6",
              "inverse-on-surface": "#f3f1e8",
              "inverse-surface": "#31312b",
              "on-surface-variant": "#424751",
              "on-tertiary-fixed-variant": "#41379b",
              "on-primary": "#ffffff",
              "on-tertiary-container": "#d8d3ff",
              "on-secondary-fixed": "#002115",
              "tertiary": "#40369a",
              "primary-fixed": "#d4e3ff",
              "on-secondary-fixed-variant": "#00513a",
              "outline-variant": "#c2c6d2",
              "background": "#fcf9f1",
              "surface-variant": "#e5e2da",
              "tertiary-fixed-dim": "#c5c0ff",
              "surface-container": "#f0eee5",
              "on-tertiary-fixed": "#140067",
              "inverse-primary": "#a4c9ff",
              "surface": "#fcf9f1",
              "secondary-fixed": "#86f8c9",
              "primary-container": "#185fa5",
              "surface-container-high": "#eae8e0",
              "error-container": "#ffdad6",
              "on-primary-fixed-variant": "#004883",
              "on-secondary-container": "#007151",
              "tertiary-fixed": "#e4dfff",
              "on-primary-container": "#c1d9ff",
              "surface-container-lowest": "#ffffff",
              "tertiary-container": "#5850b3",
              "on-error-container": "#93000a",
              "on-background": "#1c1c17",
              "primary": "#004782",
              "surface-container-low": "#f6f4eb",
              "surface-bright": "#fcf9f1",
              "on-primary-fixed": "#001c39",
              "secondary-fixed-dim": "#68dbae",
              "on-secondary": "#ffffff",
              "error": "#ba1a1a",
              "surface-tint": "#1960a6",
              "surface-dim": "#dcdad2",
              "secondary": "#006c4e",
              "outline": "#727782",
              "on-error": "#ffffff",
              "primary-fixed-dim": "#a4c9ff",
              "on-surface": "#1c1c17",
              "on-tertiary": "#ffffff"
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "spacing": {
              "card_max_width": "560px",
              "nav_height": "56px",
              "input_height": "40px",
              "gutter": "16px",
              "margin": "24px"
      },
      "fontFamily": {
              "label-md": ["Inter", "sans-serif"],
              "headline-lg": ["Inter", "sans-serif"],
              "headline-md": ["Inter", "sans-serif"],
              "body-md": ["Inter", "sans-serif"],
              "body-lg": ["Inter", "sans-serif"],
              "mono-data": ["JetBrains Mono", "monospace"]
      },
      "fontSize": {
              "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
              "headline-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "500"}],
              "headline-md": ["18px", {"lineHeight": "24px", "fontWeight": "500"}],
              "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
              "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
              "mono-data": ["13px", {"lineHeight": "18px", "fontWeight": "400"}]
      }
    }
  },
  plugins: [],
}
