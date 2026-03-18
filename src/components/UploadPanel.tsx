import { useState, useRef, useCallback } from "react";
import { ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/LoginDialog";
import { cn } from "@/lib/utils";

const STYLE_OPTIONS = [
  { value: "white", label: "White Background", description: "Clean white backdrop" },
  { value: "transparent", label: "Transparent", description: "Checkerboard / PNG" },
];

export function UploadPanel({ onGenerate, externalStyleRef }: { onGenerate?: (styleImg: string, ratio: string) => void; externalStyleRef?: React.MutableRefObject<((styleIndex: number) => void) | null> } = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  if (externalStyleRef) {
    externalStyleRef.current = (styleIndex: number) => {
      if (styleIndex < STYLE_OPTIONS.length) {
        setSelectedStyle(styleIndex);
      }
    };
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowSuccess(true);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-xl border border-border/50 bg-muted shadow-soft h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 md:p-3 lg:p-4 space-y-4 lg:space-y-5 text-sm">
        {/* Upload area */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 lg:mb-2 block">Image</label>
          <div id="upload-drop-zone" className="relative">
            {uploadedImage ? (
              <div className="relative rounded-lg border border-border/50 overflow-hidden animate-fade-in">
                <img src={uploadedImage} alt="Uploaded image" className="w-full h-28 md:h-32 lg:h-40 object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-background" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "h-28 md:h-32 lg:h-40 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                )}
              >
                <ImageIcon className="h-6 w-6 lg:h-8 lg:w-8 text-body-desc" />
                <p className="text-sm text-body-desc">Drag & drop image here, or click to browse</p>
                <p className="text-xs text-body-desc/60">Supports jpg/jpeg/png/webp, max 32MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            {showSuccess && (
              <div className="flex items-center gap-1.5 mt-1.5 animate-fade-in">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="text-xs text-primary">Upload successful</span>
              </div>
            )}
          </div>
        </div>

        {/* Style selector - 2 options */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 lg:mb-2 block">Select a Style</label>
          <div className="grid grid-cols-2 gap-3">
            {STYLE_OPTIONS.map((style, i) => (
              <button
                key={style.value}
                onClick={() => setSelectedStyle(i)}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-3 lg:p-4 rounded-xl border-2 transition-all",
                  selectedStyle === i
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/50 bg-card hover:border-primary/40"
                )}
              >
                {/* Visual preview */}
                <div className={cn(
                  "w-full aspect-square rounded-lg overflow-hidden",
                  style.value === "transparent" ? "checkerboard-bg" : "bg-white border border-border/30"
                )}>
                  {style.value === "white" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-muted-foreground/20" />
                    </div>
                  )}
                  {style.value === "transparent" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-muted-foreground/20" />
                    </div>
                  )}
                </div>
                {selectedStyle === i && (
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <span className={cn(
                  "text-xs font-medium",
                  selectedStyle === i ? "text-primary" : "text-muted-foreground"
                )}>{style.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: generate */}
      <div className="border-t border-border/50 p-3 md:p-3 lg:p-4 flex items-center gap-2">
        <Button
          variant="gradient"
          size="default"
          className="flex-1"
          onClick={() => {
            if (onGenerate) {
              onGenerate(uploadedImage || "", STYLE_OPTIONS[selectedStyle].value);
            }
          }}
        >
          Remove Background
        </Button>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </div>
  );
}
