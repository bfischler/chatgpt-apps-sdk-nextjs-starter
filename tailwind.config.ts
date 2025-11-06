/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const colorPrimitives = {
  nightshade: {
    DEFAULT: "#16181F",
    950: "#16181F",
    900: "#282C35",
    800: "#3C414D",
    700: "#525A69",
    600: "#717989",
    500: "#979DA9",
    400: "#BFC4CD",
    300: "#D6D9DF",
    200: "#E6E8EC",
    100: "#EFF1F3",
    50: "#F7F8F9",
  },
  matcha: {
    DEFAULT: "#0DAC65",
    950: "#002414",
    900: "#03331D",
    800: "#02492A",
    700: "#02693E",
    600: "#078A52",
    500: "#0DAC65",
    400: "#3ECE82",
    300: "#84E7A5",
    200: "#BCF4CA",
    100: "#DBFFE0",
    50: "#EEFFF1",
  },
  blueberry: {
    DEFAULT: "#0382F7",
    950: "#001E4B",
    900: "#002F67",
    800: "#01418D",
    700: "#0053B5",
    600: "#0667D9",
    500: "#0382F7",
    400: "#3EA2FD",
    300: "#81C2FF",
    200: "#B8DDFF",
    100: "#D7EBFE",
    50: "#ECF6FF",
  },
  ube: {
    DEFAULT: "#8B5CF6",
    950: "#230059",
    900: "#32037D",
    800: "#43089F",
    700: "#5C15CC",
    600: "#7934F0",
    500: "#8B5CF6",
    400: "#A789FE",
    300: "#C1B0FF",
    200: "#D8D0FF",
    100: "#E9E4FF",
    50: "#F5F3FF",
  },
  dragonfruit: {
    DEFAULT: "#FF7AD5",
    950: "#4A0232",
    900: "#8B045C",
    800: "#CC0687",
    700: "#F90BA6",
    600: "#FF52C2",
    500: "#FF7AD5",
    400: "#FF99DF",
    300: "#FFB8E8",
    200: "#FFD1F1",
    100: "#FFE5F7",
    50: "#FFF5FC",
  },
  pomegranate: {
    DEFAULT: "#E94D68",
    950: "#450417",
    900: "#630D21",
    800: "#8E1230",
    700: "#B21A3F",
    600: "#DD2C53",
    500: "#E94D68",
    400: "#FF7D90",
    300: "#FDA4AF",
    200: "#FECDD3",
    100: "#FFE4E6",
    50: "#FFF1F2",
  },
  tangerine: {
    DEFAULT: "#F58C50",
    950: "#431407",
    900: "#752B12",
    800: "#9F3E15",
    700: "#C34E1B",
    600: "#E56E2C",
    500: "#F58C50",
    400: "#FFA775",
    300: "#FFBE90",
    200: "#FDD4B7",
    100: "#FFE9D5",
    50: "#FFF3ED",
  },
  lemon: {
    DEFAULT: "#F6C23D",
    950: "#5B3305",
    900: "#8A570B",
    800: "#B37601",
    700: "#D49110",
    600: "#E6AD1A",
    500: "#F6C23D",
    400: "#F8CF65",
    300: "#FADF7C",
    200: "#FEF0A4",
    100: "#FFF8D2",
    50: "#FEFAE8",
  },
} as const;

export default {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      // => @media (min-width: breakpoint) { ... }
      sm: `${breakpoints.sm}px`,
      md: `${breakpoints.md}px`,
      lg: `${breakpoints.lg}px`,
      xl: `${breakpoints.xl}px`,
      "2xl": `${breakpoints["2xl"]}px`,
      "custom-xl": `1311px`, // custom breakpoint for the sculpt banner, one off, DO NOT USE THIS FOR ANYTHING ELSE
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        roobert: ["Roobert", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        // [Design docs here](https://www.figma.com/file/VREn1Up7w23twsGDHQk1Nw/Glaze-DS?node-id=6104%3A4924&mode=dev)
        md: "0px 2px 4px -2px rgba(0, 0, 0, 0.04), 0px 4px 6px -1px rgba(0, 0, 0, 0.05)",
        lg: "0px 0px 6px 5px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.05)",
        xl: "0px 8px 10px -6px rgba(0, 0, 0, 0.10), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)",
        popover: "0 0 1px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        slideFromLeft: "slideFromLeft 0.5s ease-in-out",
        "shimmer-loop": "shimmer-loop 5s linear infinite",
        "rainbow-hue": "rainbow-hue 3s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "100% center" },
          "100%": { backgroundPosition: "-100% center" },
        },
        slideFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideToLeft: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
        "shimmer-loop": {
          "0%": { transform: "translateX(-100%)" },
          "20%": { transform: "translateX(100%)" },
          "60%": { transform: "translateX(100%)" },
          "80%": { transform: "translateX(300%)" },
          "100%": { transform: "translateX(300%)" },
        },
        "rainbow-hue": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      colors: {
        ...colorPrimitives,
        // Content
        "content-primary": colorPrimitives.nightshade[950],
        "content-secondary": colorPrimitives.nightshade[700],
        "content-secondary-hover": colorPrimitives.nightshade[800],
        "content-tertiary": colorPrimitives.nightshade[600],
        "content-tertiary-hover": colorPrimitives.nightshade[700],
        "content-action": colorPrimitives.blueberry[500],
        "content-action-hover": colorPrimitives.blueberry[600],
        "content-danger": colorPrimitives.pomegranate[600],
        "content-warning": colorPrimitives.tangerine[500],
        "content-danger-hover": colorPrimitives.pomegranate[700],
        "content-success": colorPrimitives.matcha[500],
        "content-success-hover": colorPrimitives.matcha[600],
        "content-placeholder": colorPrimitives.nightshade[500],
        "content-disabled": "rgba(151, 157, 169, 0.75)", // nightshade[500] with 0.75 alpha
        "content-disabled-hover": colorPrimitives.nightshade[500],

        // Content / Extensions
        "text-red": colorPrimitives.pomegranate[600],
        "text-orange": colorPrimitives.tangerine[700],
        "text-yellow": colorPrimitives.lemon[800],
        "text-green": colorPrimitives.matcha[600],
        "text-blue": colorPrimitives.blueberry[600],
        "text-purple": colorPrimitives.ube[600],
        "text-pink": colorPrimitives.dragonfruit[600],
        "text-dark-pink": colorPrimitives.dragonfruit[800],
        // Background
        "bg-primary": "#FFFFFF",
        "bg-primary-hover": colorPrimitives.nightshade[50],
        "bg-secondary": colorPrimitives.nightshade[50],
        "bg-secondary-hover": colorPrimitives.nightshade[100],
        "bg-tertiary": colorPrimitives.nightshade[100],
        "bg-tertiary-hover": colorPrimitives.nightshade[200],
        // Background / Extensions
        "bg-red": colorPrimitives.pomegranate[100],
        "bg-red-light": colorPrimitives.pomegranate[50],
        "bg-red-hover": "rgba(255, 228, 230, 0.5)",
        "bg-orange": colorPrimitives.tangerine[100],
        "bg-orange-light": colorPrimitives.tangerine[50],
        "bg-orange-hover": "rgba(255, 233, 213, 0.5)",
        "bg-yellow": colorPrimitives.lemon[100],
        "bg-yellow-light": colorPrimitives.lemon[50],
        "bg-yellow-hover": "rgba(255, 248, 210, 0.5)",
        "bg-green": colorPrimitives.matcha[100],
        "bg-green-light": colorPrimitives.matcha[50],
        "bg-green-hover": "rgba(219, 255, 224, 0.5)",
        "bg-blue": colorPrimitives.blueberry[100],
        "bg-blue-light": colorPrimitives.blueberry[50],
        "bg-blue-hover": "rgba(215, 235, 254, 0.5)",
        "bg-purple": colorPrimitives.ube[100],
        "bg-purple-light": colorPrimitives.ube[50],
        "bg-purple-hover": "rgba(233, 228, 255, 0.5)",
        "bg-pink": colorPrimitives.dragonfruit[100],
        "bg-pink-light": colorPrimitives.dragonfruit[50],
        "bg-pink-hover": "rgba(255, 229, 247, 0.5)",
        // Border
        "border-primary": "rgba(21, 37, 67, 0.24)",
        "border-primary-hover": "rgba(21, 37, 67, 0.36)",
        "border-secondary": "rgba(21, 37, 67, 0.1)",
        "border-secondary-hover": "rgba(21, 37, 67, 0.2)",
        "border-tertiary": "rgba(21, 37, 67, 0.1)",
        "border-tertiary-hover": "rgba(21, 37, 67, 0.1)",
        "border-hover-action": colorPrimitives.blueberry[500],
        // Outline focus ring
        "outline-focus-ring": colorPrimitives.blueberry[200],
        "bg-accent-hover": "rgba(2, 133, 255, 0.04)",
      },
      spacing: {
        120: "30rem",
        140: "35rem",
        160: "40rem",
        200: "50rem",
      },
      maxHeight: {
        "5/6": "83.333333%",
      },
      height: {
        nav: "48px",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme, addUtilities }) => {
      // https://github.com/tailwindlabs/tailwindcss/discussions/3378#discussioncomment-4177286
      matchUtilities(
        {
          "animation-delay": (value: string) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
      addUtilities({
        ".fade-ellipsis": {
          "mask-image":
            "linear-gradient(to right, black calc(100% - 32px), transparent)",
          "-webkit-mask-image":
            "linear-gradient(to right, black calc(100% - 32px), transparent)",
          "mask-repeat": "no-repeat",
          "mask-size": "100% 100%",
          "-webkit-mask-repeat": "no-repeat",
          "-webkit-mask-size": "100% 100%",
        },
      });
    }),
    typography,
  ],
} satisfies Config;
