import { useEffect, useState } from 'react'
import Preview from './Preview'
import { ArrowBigRight } from 'lucide-react'
import { useDebouncedState } from '@/hooks/useDebounce'
import { toast } from 'sonner'
import Result from './Result'
import Form from './Form'

export default function WhatsAppGenerator() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, debouncedMessage, setMessage] = useDebouncedState('', 1500);
  const [link, setLink] = useState('');

  useEffect(() => {
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(debouncedMessage);
    setLink(`https://wa.me/${formattedPhone}?text=${encodedMessage}`);
  }, [debouncedMessage, link, phoneNumber]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast(`Link copiado para a área de transferência!`, {
      duration: 2000,
      position: 'top-center',
    });
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Gerador de Link WhatsApp</h1>

      <div className="container mx-auto p-6 max-w-6xl">
        {/* RESULTADO: */}
        <Result link={link} handleCopy={handleCopy} />

        {/* EDITOR: */}
        <div className="flex flex-col md:flex-row gap-6 justify-between max-h-[520px]">
          {/* Formulário */}
          <Form
            link={link}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            message={message}
            setMessage={setMessage}
          />

          {/* Separador */}
          <div className="flex flex-col items-center justify-center gap-2 max-w-[100px] text-center">
            <ArrowBigRight className="w-10 h-10 text-primary" />
            <p className="text-xs text-primary">Pré-visualização</p>
          </div>

          {/* Preview */}
          <Preview phoneNumber={phoneNumber} message={message} debouncedMessage={debouncedMessage} />
        </div>
      </div>


    </div>
  )
} 