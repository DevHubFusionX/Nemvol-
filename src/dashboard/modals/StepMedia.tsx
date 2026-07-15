import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface StepMediaProps {
  images: File[];
  onChange: (images: File[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepMedia({ images, onChange, onBack, onNext }: StepMediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...images, ...Array.from(files)].slice(0, 6);
    onChange(next);
  };

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <p className="text-[12px] text-slate-400">Upload up to 6 product images. First image is the cover.</p>

      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <ImagePlus size={18} className="text-slate-400" strokeWidth={1.6} />
        </div>
        <p className="text-[13px] font-semibold text-slate-700">Click or drag images here</p>
        <p className="text-[11px] text-slate-400">PNG, JPG, WEBP — max 6 images</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((file, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-slate-100">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-widest bg-slate-900 text-white px-1.5 py-0.5 rounded-md">
                  Cover
                </span>
              )}
              <button
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={10} strokeWidth={2.5} className="text-slate-700" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          Next: Pricing →
        </button>
      </div>
    </div>
  );
}
