import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { GeneratedPost } from '../../types';
import { CheckCircle2, Globe, ArrowUpRight, Loader2, Sparkles, Send } from 'lucide-react';

interface LinkedInPublishingSimulatorModalProps {
  post: GeneratedPost | null;
  onClose: () => void;
}

export const LinkedInPublishingSimulatorModal: React.FC<LinkedInPublishingSimulatorModalProps> = ({
  post,
  onClose
}) => {
  const { userProfile, addToast, updateDraftStatus } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [livePostUrn, setLivePostUrn] = useState<string | null>(null);

  useEffect(() => {
    if (!post) return;
    setStep(1);
    setLivePostUrn(null);

    // Step 1 -> Step 2: Validate OAuth Token
    const timer1 = setTimeout(() => setStep(2), 800);
    // Step 2 -> Step 3: Payload construction & API POST call
    const timer2 = setTimeout(() => setStep(3), 1600);
    // Step 3 -> Step 4: 201 Created Success
    const timer3 = setTimeout(() => {
      setStep(4);
      setLivePostUrn(`urn:li:share:${Math.floor(Math.random() * 899999999 + 100000000)}`);
      addToast('Post published live on LinkedIn!', 'success');
      updateDraftStatus(post.id, 'Published');
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [post]);

  if (!post) return null;

  return (
    <Modal isOpen={!!post} onClose={onClose} title="LinkedIn Auto-Publishing Queue Engine" maxWidth="md">
      <div className="space-y-5 text-headingLight dark:text-headingDark">
        
        {/* Progress Pipeline */}
        <div className="p-4 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-3">
          
          {/* Step 1 */}
          <div className="flex items-center gap-3 text-xs">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 1 ? 'bg-brand-indigo text-white' : 'bg-borderLight text-bodyLight'
            }`}>
              {step > 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '1'}
            </div>
            <span className={step >= 1 ? 'font-bold text-headingLight dark:text-headingDark' : 'text-bodyLight'}>
              Validating OAuth 2.0 Access Token
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 text-xs">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 2 ? 'bg-brand-indigo text-white' : 'bg-borderLight text-bodyLight'
            }`}>
              {step > 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '2'}
            </div>
            <span className={step >= 2 ? 'font-bold text-headingLight dark:text-headingDark' : 'text-bodyLight'}>
              Building REST /v2/posts JSON Payload
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3 text-xs">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 3 ? 'bg-brand-indigo text-white' : 'bg-borderLight text-bodyLight'
            }`}>
              {step > 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            </div>
            <span className={step >= 3 ? 'font-bold text-headingLight dark:text-headingDark' : 'text-bodyLight'}>
              Executing API Handshake with LinkedIn Servers
            </span>
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-3 text-xs">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === 4 ? 'bg-emerald-500 text-white' : 'bg-borderLight text-bodyLight'
            }`}>
              {step === 4 ? <CheckCircle2 className="w-3.5 h-3.5" /> : '4'}
            </div>
            <span className={step === 4 ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-bodyLight'}>
              201 Created – Post Live on Newsfeed
            </span>
          </div>

        </div>

        {/* Live Post Result Card */}
        {step === 4 && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> PUBLISHED SUCCESSFULLY
              </span>
              <Badge variant="success">LIVE NOW</Badge>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold">Author URN: <code className="text-brand-indigo">urn:li:person:alexmorgan</code></p>
              <p className="font-semibold">Post Asset URN: <code className="text-brand-indigo">{livePostUrn}</code></p>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:underline pt-1"
            >
              View Live Post on LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end pt-2">
          <Button onClick={onClose} disabled={step < 4}>
            {step < 4 ? 'Publishing...' : 'Done'}
          </Button>
        </div>

      </div>
    </Modal>
  );
};
