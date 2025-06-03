import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import QrCodeGenerator from './pages/QrCodeGenerator';
import VideoDownloader from './pages/VideoDownloader';
import EmojiPicker from './pages/EmojiPicker';
import WhatsAppGenerator from './pages/WhatsappGenerator';
import { Toaster } from 'sonner';
import { useTheme } from './components/ThemeProvider';

function App() {
  const { theme } = useTheme();
  
  return (
    <div>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Create routes: */}
          <Route path="/qr-code" element={<QrCodeGenerator />} />
          <Route path="/video-downloader" element={<VideoDownloader />} />
          <Route path="/emoji-picker" element={<EmojiPicker />} />
          <Route path="/whatsapp-link" element={<WhatsAppGenerator />} />
        </Routes>
      </HashRouter>
      <Toaster richColors theme={theme} invert />
    </div>
  );
}

export default App;
