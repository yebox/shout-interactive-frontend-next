module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-border-color--1": "#DFE4E8",
        primary: "var(--color-primary)",

        "primary-lightest-2": "#E1F7FF",

        // Black color scheme
        "black-default": "#0A1F44",
        "black-light": "#818FA3",
        "black-lighter": "#C1C7D1",
        "black-lightest-2": "#E5E9EC",
        "black-lightest-1": "#F3F4F6",

        "hover-color--1": "#F9FAFA",

        //Gray color scheme
        "gray-darker": "#60646A",
        "gray-dark": "#90979E",
        "gray-default": "#C0C9D2",
        "gray-light": "#DFE4E8",
        "gray-lighter": "#F0F2F4",
        "gray-lightest-2": "#F9FAFA",
        "gray-lightest-1": "#FCFCFD",

        //success colors
        "success-default": "#3CC13B",

        //warn
        "warn-default": "#FFBB38",

        //error
        "error-default": "#F03738",
      },
    },
  },
  plugins: [],
};
