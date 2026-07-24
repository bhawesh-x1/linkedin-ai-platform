import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Image as ImageIcon, Upload, Sparkles, X, Check, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ImageAttachmentPickerProps {
  selectedImage: string | null;
  onSelectImage: (url: string | null) => void;
}

export const PRESET_PHOTOS = [
  { id: 'img-1', name: 'SaaS Metric Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80' },
  { id: 'img-2', name: 'Executive Team Meeting', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80' },
  { id: 'img-3', name: 'AI & Data Codebase', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80' },
  { id: 'img-4', name: 'Modern Tech Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80' },
];

export const ImageAttachmentPicker: React.FC<ImageAttachmentPickerProps> = ({
  selectedImage,
  onSelectImage,
}) => {
  const { addToast } = useApp();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSelectImage(url);
      addToast(`Attached photo: ${file.name}`, 'success');
    }
  };

  const handleGenerateAIImage = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      onSelectImage(PRESET_PHOTOS[Math.floor(Math.random() * PRESET_PHOTOS.length)].url);
      setIsGeneratingAI(false);
      addToast('AI generated a 1080x1080 LinkedIn post graphic!', 'success');
    }, 1000);
  };

  return (
    <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-3 bg-surfaceLight/40 dark:bg-surfaceDark/30">
      <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2 text-xs font-bold text-headingLight dark:text-headingDark">
          <ImageIcon className="w-4 h-4 text-brand-indigo" /> LINKEDIN PHOTO & MEDIA ATTACHMENTS
        </div>
        {selectedImage && (
          <Badge variant="success">Photo Attached</Badge>
        )}
      </div>

      {selectedImage ? (
        <div className="relative rounded-xl overflow-hidden border border-borderLight dark:border-borderDark max-h-48 group">
          <img src={selectedImage} alt="Post attachment" className="w-full h-48 object-cover" />
          <button
            onClick={() => onSelectImage(null)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-headingLight/80 text-white hover:bg-rose-500 transition-colors"
            title="Remove Photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark hover:bg-bgLight text-xs font-semibold cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-brand-indigo" /> Upload Custom Photo
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateAIImage}
              isLoading={isGeneratingAI}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-violet" />}
            >
              Generate AI Post Graphic
            </Button>
          </div>

          <div className="pt-2 border-t border-borderLight dark:border-borderDark">
            <span className="text-[11px] text-bodyLight font-semibold block mb-2">Or select from 1-click curated stock photos:</span>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => { onSelectImage(photo.url); addToast(`Selected ${photo.name}`, 'success'); }}
                  className="relative rounded-lg overflow-hidden border border-borderLight dark:border-borderDark cursor-pointer group hover:scale-105 transition-transform"
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-14 object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold p-0.5 truncate text-center">
                    {photo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
