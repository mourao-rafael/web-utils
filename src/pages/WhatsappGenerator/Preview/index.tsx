import { Card } from "@/components/ui/card";
import { SendHorizonal, UserRound } from "lucide-react";

const Preview = ({ phoneNumber, message, debouncedMessage }: { phoneNumber: string, message: string, debouncedMessage: string }) => {
  // https://criar.wa.link/
  return (
    <Card className="px-2 py-8 w-[300px] h-[520px]">
      <div className="w-full max-w-md h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center space-x-2 bg-[#f0f1f2] p-2">
          <UserRound className="w-8 h-8 bg-gray-200 rounded-full p-1" color="white" />
          <span className="text-sm text-gray-600">{phoneNumber || '55 XX XXXXX-XXXX'}</span>
        </div>

        {/* Body */}
        <div className="bg-[#ECE5DD] p-4 shadow-sm flex-1 self-stretch flex">
          {/* Message */}
          <div className={`${message && message === debouncedMessage ? '' : 'hidden'} bg-[#DCF8C6] p-2.5 max-w-[200px] ml-auto mt-auto rounded-md shadow-sm w-full text-sm text-black`}>
            {debouncedMessage}
          </div>
        </div>

        {/* Input */}
        <div className="bg-[#f0f1f2] px-2 py-3 flex flex-row gap-4">
          <input
            dir="rtl"
            type="text"
            disabled
            value={message === debouncedMessage ? '' : message}
            // placeholder="Sua mensagem aparecerá aqui"
            className="bg-white rounded-lg px-2 py-1 text-sm h-full flex-1 text-ellipsis text-black text-end"
          />
          <SendHorizonal color="#cacdcf" />
        </div>
      </div>
    </Card>
  )
}

export default Preview;