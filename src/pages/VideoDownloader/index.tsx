import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setDownloadLink("");

    try {
      // Exemplo com RapidAPI (YouTube Media Downloader)
      const options = {
        method: "GET",
        url: "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
        params: { videoId: extractVideoId(url) },
        headers: {
          "X-RapidAPI-Key": "SUA_CHAVE_AQUI",
          "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const link = response.data.videos[0].url; // depende da API

      setDownloadLink(link);
    } catch (err) {
      console.error("Erro ao buscar link de download");
      // fallback: redireciona pro SaveFrom com a URL
      window.open(`https://en.savefrom.net/18/#url=${encodeURIComponent(url)}`, "_blank");
    } finally {
      setLoading(false);
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] || "";
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-background shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">📥 Baixar vídeo</h2>
      <Input
        placeholder="Cole aqui a URL do vídeo"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleDownload} disabled={loading || !url}>
        {loading ? "Buscando link..." : "Obter link de download"}
      </Button>

      {downloadLink && (
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-600 underline"
        >
          Clique aqui para baixar
        </a>
      )}
    </div>
  );
};

export default VideoDownloader;
