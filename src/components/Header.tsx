import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
