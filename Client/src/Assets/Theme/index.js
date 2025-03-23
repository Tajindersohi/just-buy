const appTheme = {
  colors: {
    primary: "#0C8342", // Fresh green for a modern, premium feel
    secondary: "#264653", // Dark cyan for contrast
    accent: "#E76F51", // Warm highlight color
    success: "#2A9D8F",
    danger: "#E63946",
    warning: "#F4A261",
    info: "#3A86FF",
    light: "#F8FAFC",
    dark: "#1E293B",
    background: "#F1F5F9", // Soft gray for better contrast
    sidebarBackground: "#1E293B", // Dark sidebar theme
    contentBackground: "#FFFFFF",
    textPrimary: "#212529",
    textSecondary: "#6B7280",
    textContrast: "#FFFFFF",
    border: "#E2E8F0",
    primaryLight:'#dbe7dc',
    primaryDark:'#95b99894',
  },

  typography: {
    fontFamily: `'Inter', sans-serif`,
    heading: {
      primary: "#212529",
      secondary: "#6B7280",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "24px",
      xxl: "32px",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  heading: {
    primary: "#212529",
    secondary: "#6c757d",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
  },

  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
  },

  boxShadow: {
    sm: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0px 3px 6px rgba(0, 0, 0, 0.15)",
    lg: "0px 10px 30px rgba(0, 0, 0, 0.2)",
  },

  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1440px",
  },

  transitions: {
    fast: "0.2s ease-in-out",
    medium: "0.4s ease-in-out",
    slow: "0.6s ease-in-out",
  },

  zIndex: {
    low: 100,
    medium: 500,
    high: 1000,
    tooltip: 1050,
    modal: 1100,
  },
};

export default appTheme;
