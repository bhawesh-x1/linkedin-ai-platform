import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, Globe, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const LinkedInPreviewModal: React.FC = () => {
  const { previewPost, setPreviewPost, userProfile, brandPersona, addToast } = useApp();

  if (!previewPost) return null;

  const fullText = `${previewPost.hook}\n\n${previewPost.body}\n\n${previewPost.cta}\n\n${previewPost.hashtags.join(' ')}`;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullText);
    addToast('Post text copied for LinkedIn!', 'success');
  };

  return (
    <Modal
      isOpen={!!previewPost}
      onClose={() => setPreviewPost(null)}
      title="LinkedIn Feed Live Preview"
      maxWidth="xl"
    >
      <div className="space-y-4">
        <p className="text-xs text-bodyLight dark:text-bodyDark">
          Here is how your post and photo attachments will render on the LinkedIn desktop & mobile newsfeed:
        </p>

        {/* LinkedIn Feed Card Simulation */}
        <div className="rounded-2xl border border-borderLight dark:border-borderDark bg-white dark:bg-[#1B1F2A] p-5 shadow-soft space-y-4 text-headingLight dark:text-headingDark font-sans">
          
          {/* Top User Info Bar */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-12 h-12 rounded-full object-cover border border-borderLight dark:border-borderDark"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">
                    {userProfile.name}
                  </h4>
                  <span className="text-xs text-slate-400">• 1st</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-sm">
                  {brandPersona.headline}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <span>Just now</span>
                  <span>•</span>
                  <Globe className="w-3 h-3" />
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post Text Body */}
          <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line space-y-3">
            <p className="font-semibold text-slate-900 dark:text-white">{previewPost.hook}</p>
            <p>{previewPost.body}</p>
            <p className="font-medium text-brand-indigo">{previewPost.cta}</p>
            <p className="text-brand-indigo font-medium">{previewPost.hashtags.join(' ')}</p>
          </div>

          {/* Attached Photo Display Banner */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
              alt="LinkedIn Post Photo Attachment"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Reactions bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <span className="flex -space-x-1">
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px]">👍</span>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[8px]">❤️</span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px]">💡</span>
              </span>
              <span className="ml-1 text-[11px]">Alex Morgan and 42 others</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span>18 comments</span>
              <span>•</span>
              <span>4 reposts</span>
            </div>
          </div>

          {/* Feed Interaction Buttons */}
          <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 text-center">
            <button className="py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5">
              <ThumbsUp className="w-4 h-4" /> Like
            </button>
            <button className="py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Comment
            </button>
            <button className="py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5">
              <Repeat2 className="w-4 h-4" /> Repost
            </button>
            <button className="py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-bodyLight dark:text-bodyDark">
            Quality Rating: <span className="font-bold text-emerald-500">{previewPost.qualityScore}/100</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setPreviewPost(null)}>
              Close
            </Button>
            <Button onClick={handleCopyAll} rightIcon={<CheckCircle2 className="w-4 h-4" />}>
              Copy Post Text
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
