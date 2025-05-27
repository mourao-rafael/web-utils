import EmojiPickerReact, { Theme, EmojiStyle, Categories } from 'emoji-picker-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useTheme } from '@/components/ThemeProvider';

const EmojiPickerPage = () => {
  const { theme } = useTheme();

  const handleEmojiClick = (emojiData: any) => {
    navigator.clipboard.writeText(emojiData.emoji);
    toast(`Emoji ${emojiData.emoji} copiado para a área de transferência!`, {
      duration: 2000,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Seletor de Emoji</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <EmojiPickerReact
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={true}
            theme={theme as Theme}
            emojiStyle={EmojiStyle.APPLE}
            searchPlaceholder="Pesquisar emoji..."
            width="100%"
            height={Math.min(700, window.innerHeight - 200)}
            lazyLoadEmojis={true}
            categories={[
              {
                category: Categories.SMILEYS_PEOPLE,
                name: "Sorrisos & Pessoas"
              },
              {
                category: Categories.ANIMALS_NATURE,
                name: "Animais & Natureza"
              },
              {
                category: Categories.FOOD_DRINK,
                name: "Comidas & Bebidas"
              },
              {
                category: Categories.TRAVEL_PLACES,
                name: "Viagens & Lugares"
              },
              {
                category: Categories.ACTIVITIES,
                name: "Atividades"
              },
              {
                category: Categories.OBJECTS,
                name: "Objetos"
              },
              {
                category: Categories.SYMBOLS,
                name: "Símbolos"
              },
              {
                category: Categories.FLAGS,
                name: "Bandeiras"
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmojiPickerPage; 