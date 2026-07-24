import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Download, Copy, FileText, Code, Check } from 'lucide-react';

export const ExportModal: React.FC = () => {
  const { exportPost, setExportPost, addToast } = useApp();
  const [format, setFormat] = useState<'markdown' | 'txt' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!exportPost) return null;

  const getExportText = () => {
    if (format === 'json') {
      return JSON.stringify(exportPost, null, 2);
    }
    if (format === 'markdown') {
      return `# ${exportPost.topic}\n\n## Hook\n${exportPost.hook}\n\n## Body\n${exportPost.body}\n\n## Call To Action\n${exportPost.cta}\n\n## Hashtags\n${exportPost.hashtags.join(' ')}`;
    }
    return `${exportPost.hook}\n\n${exportPost.body}\n\n${exportPost.cta}\n\n${exportPost.hashtags.join(' ')}`;
  };

  const textToExport = getExportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(textToExport);
    setCopied(true);
    addToast(`Exported as ${format.toUpperCase()} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([textToExport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linkedin-post-${exportPost.id}.${format === 'markdown' ? 'md' : format}`;
    link.click();
    addToast(`Downloaded post-${exportPost.id}.${format === 'markdown' ? 'md' : format}`, 'success');
  };

  return (
    <Modal
      isOpen={!!exportPost}
      onClose={() => setExportPost(null)}
      title="Export Generated Content"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Format Switcher */}
        <div className="flex items-center gap-2">
          {[
            { id: 'markdown', label: 'Markdown (.md)', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'txt', label: 'Plain Text (.txt)', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'json', label: 'JSON (.json)', icon: <Code className="w-3.5 h-3.5" /> },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                format === f.id
                  ? 'bg-brand-indigo text-white border-brand-indigo shadow-md'
                  : 'border-borderLight dark:border-borderDark text-bodyLight dark:text-bodyDark hover:text-headingLight dark:hover:text-headingDark'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Text Preview Box */}
        <div className="p-4 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark max-h-60 overflow-y-auto">
          <pre className="text-xs font-mono text-headingLight dark:text-headingDark whitespace-pre-wrap leading-relaxed">
            {textToExport}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={handleCopy} leftIcon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}>
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          <Button onClick={handleDownload} rightIcon={<Download className="w-4 h-4" />}>
            Download File
          </Button>
        </div>
      </div>
    </Modal>
  );
};
