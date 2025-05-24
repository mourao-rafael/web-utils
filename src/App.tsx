import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import QrCodeGenerator from './pages/QrCodeGenerator';
import VideoDownloader from './pages/VideoDownloader';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Create routes: */}
          <Route path="/qr-code" element={<QrCodeGenerator />} />
          <Route path="/video-downloader" element={<VideoDownloader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
