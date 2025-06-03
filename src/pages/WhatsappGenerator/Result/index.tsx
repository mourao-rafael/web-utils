import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";

type ResultProps = {
  link: string;
  handleCopy: () => void;
}

const Result = ({ link, handleCopy }: ResultProps) => {
  return (
    <div className={`${!link && 'hidden'} flex w-full`}>
      <Card className='w-full mb-10 p-6 shadow-md rouded-lg'>
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-bold text-nowrap text-ellipsis overflow-hidden">
            Seu link WhatsApp:
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-primary font-medium break-all hover:underline text-ellipsis"
            >
              {link}
            </a>
          </p>
          <Button
            onClick={() => handleCopy()}
            className="self-start flex items-center gap-1 text-md"
          >
            Copiar <Copy />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Result;