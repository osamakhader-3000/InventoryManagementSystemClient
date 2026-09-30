import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the possible theme values
type Theme = 'light' | 'dark' ;

// Define the shape of the context value
interface ThemeContextType {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

// Create the context with a default value of undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component with TypeScript
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme as Theme) || 'light';
  });

  // Update data-theme attribute and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};