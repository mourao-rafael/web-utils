import LabelTooltip from "@/components/LabelTooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";

type FormProps = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  link: string;
}

const Form = ({ phoneNumber, setPhoneNumber, link, message, setMessage }: FormProps) => {
  return (
    <Card className="p-6 w-[450px] h-fit">
      <h2 className="text-2xl font-bold mb-6">Gerador de Link WhatsApp</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Digite seu número de telefone WhatsApp
          </label>
          <Input
            type="tel"
            placeholder="55 XX XXXXX-XXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Lembre-se de verificar o código de seu país
          </p>
        </div>

        <div>

          <label className="block text-sm font-medium mb-2 inline-flex gap-1 items-center">
            Mensagem personalizada
            <LabelTooltip>
              Para ver como formatar sua mensagem, <a className='underline' href='https://faq.whatsapp.com/539178204879377/?cms_platform=web' target='_blank' rel="noopener noreferrer">acesse a documentação</a>
            </LabelTooltip>
          </label>
          <Textarea
            placeholder="Digite sua mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button asChild className="w-full flex gap-1 text-center items-start">
          <a className="" href={link} target='_blank' rel='noopener noreferrer'>
            Testar link <ExternalLink />
          </a>
        </Button>
      </div>
    </Card>
  );
}

export default Form;