import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-8 bg-muted rounded-full flex items-center px-1 relative transition-colors duration-300 cursor-pointer box-content"
    >
      <motion.div
        className="absolute left-1 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{ left: isDark ? '32px' : '4px' }}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </button>
  );
};
