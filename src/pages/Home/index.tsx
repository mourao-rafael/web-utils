import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import type { Key } from 'react';

type Tool = {
  title: String;
  description: String;
  path: Key;
  icon: String;
  badge?: String;
};

const tools: Tool[] = [
  {
    title: 'Gerador de QR Code',
    description: 'Crie QR Codes personalizados a partir de qualquer texto ou link.',
    path: '/qr-code',
    icon: '🔳',
    // badge: 'Novo',
  },
  {
    title: 'Baixar Vídeo',
    description: 'Baixe vídeos de plataformas como YouTube e Vimeo facilmente.',
    path: '/video-downloader',
    icon: '📥',
  },
  {
    title: 'Seletor de Emoji',
    description: 'Encontre e copie emojis facilmente para suas mensagens e textos.',
    path: '/emoji-picker',
    icon: '😀',
    badge: 'Novo',
  },
  // Adicione mais ferramentas conforme necessário
];

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="flex items-center justify-center gap-2 text-4xl font-bold mb-4 text-center">
        <img src={import.meta.env.BASE_URL + '/favicon.ico'} alt="Logo Utilitários" className="w-14 h-14" />
        Utilitários Online
        </h1>
      <p className="text-muted-foreground text-center mb-10">
        Ferramentas simples e rápidas, direto do navegador.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.path} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{tool.icon} {tool.title}</span>
                {tool.badge && <Badge variant="secondary">{tool.badge}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <Link to={tool.path as string}>
                <Button>Ir para ferramenta</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;