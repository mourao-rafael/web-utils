import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to='/' className="font-bold">
            Utilitários Online
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/qr-code" className="text-sm hover:text-primary">
              QR Code
            </Link>
            <Link to="/video-downloader" className="text-sm hover:text-primary">
              Download Vídeos
            </Link>
            <Link to="/emoji-picker" className="text-sm hover:text-primary">
              Emojis
            </Link>
            <Link to="/whatsapp-link" className="text-sm hover:text-primary">
              Link WhatsApp
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
