import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { Globe, ShieldCheck, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface LinkedInOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkedInOAuthModal: React.FC<LinkedInOAuthModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, setUserProfile, addToast } = useApp();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setUserProfile(prev => ({
        ...prev,
        linkedInConnected: true,
        linkedInHandle: 'linkedin.com/in/alexmorgan-ai'
      }));
      setIsAuthorizing(false);
      onClose();
      addToast('LinkedIn Account connected successfully via OAuth 2.0!', 'success');
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="LinkedIn OAuth 2.0 Authorization" maxWidth="md">
      <div className="space-y-5 text-headingLight dark:text-headingDark">
        
        {/* Top Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-brand-indigo/10 to-transparent border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center font-bold text-lg">
              in
            </div>
            <div>
              <h4 className="text-sm font-bold">LinkedIn Official API v2</h4>
              <p className="text-xs text-bodyLight dark:text-bodyDark">OAuth 2.0 Protocol • Secure Connection</p>
            </div>
          </div>
          <Badge variant="success" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Verified App
          </Badge>
        </div>

        {/* Permissions Requested List */}
        <div className="space-y-3 text-xs">
          <p className="font-semibold text-bodyLight dark:text-bodyDark">
            <strong>LinkedIn AI Platform</strong> is requesting permission to access your profile:
          </p>

          <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>w_member_social</strong>: Publish posts, carousels & media on your behalf</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>openid & profile</strong>: Access name, profile picture, and member URN ID</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-indigo shrink-0" />
              <span>256-bit Encrypted Token Storage (AES-256)</span>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-[11px] text-bodyLight dark:text-bodyDark leading-relaxed">
          By clicking Allow, you grant permission for scheduled posts to automatically publish to your LinkedIn main newsfeed. You can revoke access at any time in your Settings.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-borderLight dark:border-borderDark">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAuthorize}
            isLoading={isAuthorizing}
            className="bg-[#0A66C2] hover:bg-[#084e96] text-white"
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Allow & Connect Account
          </Button>
        </div>

      </div>
    </Modal>
  );
};
