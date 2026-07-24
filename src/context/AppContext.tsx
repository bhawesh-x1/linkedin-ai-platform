import React, { createContext, useContext, useState } from 'react';
import { 
  ViewMode, 
  DashboardModule, 
  GeneratedPost, 
  DraftItem, 
  BrandPersona, 
  UserProfile, 
  ToastMessage 
} from '../types';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_BRAND_PERSONA, 
  INITIAL_GENERATED_POSTS, 
  INITIAL_DRAFTS 
} from '../data/mockData';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;
  activeModule: DashboardModule;
  setActiveModule: (module: DashboardModule) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  brandPersona: BrandPersona;
  setBrandPersona: React.Dispatch<React.SetStateAction<BrandPersona>>;
  generatedPosts: GeneratedPost[];
  addGeneratedPost: (post: GeneratedPost) => void;
  deleteGeneratedPost: (id: string) => void;
  drafts: DraftItem[];
  saveAsDraft: (post: GeneratedPost) => void;
  deleteDraft: (id: string) => void;
  updateDraftStatus: (id: string, status: DraftItem['status']) => void;
  
  // Modals & Toasts
  previewPost: GeneratedPost | null;
  setPreviewPost: (post: GeneratedPost | null) => void;
  exportPost: GeneratedPost | null;
  setExportPost: (post: GeneratedPost | null) => void;
  publishPost: GeneratedPost | null;
  setPublishPost: (post: GeneratedPost | null) => void;
  isOAuthOpen: boolean;
  setIsOAuthOpen: (open: boolean) => void;
  isCmdPaletteOpen: boolean;
  setIsCmdPaletteOpen: (open: boolean) => void;
  
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeModule, setActiveModule] = useState<DashboardModule>('generator');
  
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [brandPersona, setBrandPersona] = useState<BrandPersona>(INITIAL_BRAND_PERSONA);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>(INITIAL_GENERATED_POSTS);
  const [drafts, setDrafts] = useState<DraftItem[]>(INITIAL_DRAFTS);
  
  const [previewPost, setPreviewPost] = useState<GeneratedPost | null>(null);
  const [exportPost, setExportPost] = useState<GeneratedPost | null>(null);
  const [publishPost, setPublishPost] = useState<GeneratedPost | null>(null);
  const [isOAuthOpen, setIsOAuthOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addGeneratedPost = (post: GeneratedPost) => {
    setGeneratedPosts(prev => [post, ...prev]);
    setUserProfile(prev => ({
      ...prev,
      tokensUsed: Math.min(prev.tokensTotal, prev.tokensUsed + 450)
    }));
  };

  const deleteGeneratedPost = (id: string) => {
    setGeneratedPosts(prev => prev.filter(p => p.id !== id));
    addToast('Post removed from history', 'info');
  };

  const saveAsDraft = (post: GeneratedPost) => {
    const existing = drafts.find(d => d.id === post.id);
    if (existing) {
      addToast('Post is already in Saved Drafts', 'info');
      return;
    }
    const newDraft: DraftItem = {
      ...post,
      status: 'Draft',
      notes: 'Saved from generator'
    };
    setDrafts(prev => [newDraft, ...prev]);
    setGeneratedPosts(prev => prev.map(p => p.id === post.id ? { ...p, isSaved: true } : p));
    addToast('Post saved to Drafts!', 'success');
  };

  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    addToast('Draft deleted', 'info');
  };

  const updateDraftStatus = (id: string, status: DraftItem['status']) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    addToast(`Draft status updated to ${status}`, 'success');
  };

  return (
    <AppContext.Provider value={{
      viewMode,
      setViewMode,
      activeModule,
      setActiveModule,
      userProfile,
      setUserProfile,
      brandPersona,
      setBrandPersona,
      generatedPosts,
      addGeneratedPost,
      deleteGeneratedPost,
      drafts,
      saveAsDraft,
      deleteDraft,
      updateDraftStatus,
      previewPost,
      setPreviewPost,
      exportPost,
      setExportPost,
      publishPost,
      setPublishPost,
      isOAuthOpen,
      setIsOAuthOpen,
      isCmdPaletteOpen,
      setIsCmdPaletteOpen,
      toasts,
      addToast,
      removeToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
