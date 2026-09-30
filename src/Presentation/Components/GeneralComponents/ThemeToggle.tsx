
import { useTheme } from "../../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === 'light' ? 'Dark' : theme === 'dark' ? 'Sepia' : 'Light'} Theme
    </button>
  );
};

export default ThemeToggle;