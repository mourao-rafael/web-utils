import { useState, useRef, type ChangeEvent } from 'react';
import { QRCode } from 'react-qrcode-logo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Download, X } from 'lucide-react';
import LabelTooltip from '@/components/LabelTooltip';

const QrCodeGenerator = () => {
  const [value, setValue] = useState('https://');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoWidth, setLogoWidth] = useState(50);
  const [logoHeight, setLogoHeight] = useState(50);
  const [borderRadius, setBorderRadius] = useState(5);
  const [qrStyle, setQrStyle] = useState<'fluid' | 'dots' | 'squares'>('squares');
  const [eyeRadius, setEyeRadius] = useState(5);
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoFile(e.target.files?.[0] || null);
  };

  const clearFile = () => {
    setLogoFile(null);
    setLogoWidth(50);
    setLogoHeight(50);
    const input = document.getElementById('logo-input') as HTMLInputElement | null;
    if (input) input.value = '';
  };

  const downloadImage = () => {
    if (!containerRef.current) return;
    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;

    // Put border radius on canvas:
    const borderedCanvas = document.createElement('canvas');
    borderedCanvas.width = canvas.width;
    borderedCanvas.height = canvas.height;

    // Draw bordered rectangle:
    const ctx = borderedCanvas.getContext('2d')!;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(canvas.width - borderRadius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
    ctx.lineTo(canvas.width, canvas.height - borderRadius);
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - borderRadius, canvas.height);
    ctx.lineTo(borderRadius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();
    ctx.fill();

    ctx.clip();
    ctx.drawImage(canvas, 0, 0); // draw original canvas on top

    // // Add border:
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = fgColor;
    // ctx.stroke();


    const url = (borderedCanvas as HTMLCanvasElement).toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6 space-y-6">
      <CardHeader className="mb-0 gap-0">
        <CardTitle>QR Code Generator</CardTitle>
      </CardHeader>

      <CardContent className="[&_label]:pl-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Preview */}
            <div ref={containerRef} className="relative">
              <QRCode
                value={value}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                eyeRadius={eyeRadius}
                qrStyle={qrStyle}
                logoImage={logoFile ? URL.createObjectURL(logoFile) : undefined}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                removeQrCodeBehindLogo
                enableCORS
                style={{ borderRadius: `${borderRadius}px` }}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full flex items-center justify-center gap-1"
                onClick={downloadImage}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-4">
              <div className="relative w-full">
                <label htmlFor="logo-input" className="block text-sm font-medium mb-1">
                  Logo (opcional)
                </label>
                <Input
                  id="logo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="pr-7 h-9 cursor-pointer"
                />
                {logoFile && (
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute h-9 bottom-0 right-0 pr-2 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Limpar logo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {logoFile && (
                <div className="flex flex-row gap-6 mt-2">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="logo-width" className="block text-sm font-medium mb-1">
                      Largura (px)
                    </label>
                    <Input
                      id="logo-width"
                      type="number"
                      value={logoWidth}
                      min={10}
                      onChange={(e) => setLogoWidth(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="logo-height" className="block text-sm font-medium mb-1">
                      Altura (px)
                    </label>
                    <Input
                      id="logo-height"
                      type="number"
                      value={logoHeight}
                      min={10}
                      onChange={(e) => setLogoHeight(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="flex items-center gap-1 text-sm font-medium mb-1">Valor (texto do QRCode)</label>
                <Textarea
                  rows={3}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr />

          {/* Accordion Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="advanced-options">
              <AccordionTrigger className="w-full text-left cursor-pointer">
                Avançado
              </AccordionTrigger>
              <AccordionContent className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">Cor (frente)</label>
                    <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                  </div>
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">Cor de fundo</label>
                    <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                  </div>
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">Tamanho (px)</label>
                    <Input
                      type="number"
                      value={size}
                      min={50}
                      onChange={(e) => setSize(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">
                      Raio da borda (px)
                      <LabelTooltip>
                        Define o raio de arredondamento dos cantos do QR Code.<br />
                        Quanto maior, mais arredondadas ficam as "bordinhas".
                      </LabelTooltip>
                    </label>
                    <Input
                      type="number"
                      value={borderRadius}
                      min={0}
                      onChange={(e) => setBorderRadius(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">QR Style</label>
                    <Select onValueChange={(v) => setQrStyle(v as any)} value={qrStyle}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha o estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fluid">Fluid</SelectItem>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="squares">Squares</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">
                      Raio do olho
                      <LabelTooltip>
                        Define o raio dos “olhos” do QR Code (os três quadrados nos cantos).<br />
                        Quanto maior, mais arredondadas ficam as "bordinhas".
                      </LabelTooltip>
                    </label>
                    <Input
                      type="number"
                      value={eyeRadius}
                      min={0}
                      onChange={(e) => setEyeRadius(Number(e.target.value))}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeGenerator;
