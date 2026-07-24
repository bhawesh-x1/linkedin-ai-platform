import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ViewMode, 
  DashboardModule, 
  GeneratedPost, 
  DraftItem, 
  BrandPersona, 
  UserProfile, 
  ToastMessage 
} from '../types';
import { INITIAL_USER_PROFILE, INITIAL_BRAND_PERSONA, INITIAL_GENERATED_POSTS, INITIAL_DRAFTS } from '../data/mockData';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeModule: DashboardModule;
  setActiveModule: (module: DashboardModule) => void;
  isSimpleMode: boolean;
  setIsSimpleMode: (simple: boolean) => void;
  
  // Post & Draft State
  generatedPosts: GeneratedPost[];
  addGeneratedPost: (post: GeneratedPost) => void;
  drafts: DraftItem[];
  saveAsDraft: (post: GeneratedPost, status?: 'Draft' | 'Scheduled') => void;
  updateDraftStatus: (id: string, status: 'Draft' | 'Scheduled' | 'Published') => void;
  deleteDraft: (id: string) => void;

  // Profile & Persona State
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  brandPersona: BrandPersona;
  setBrandPersona: React.Dispatch<React.SetStateAction<BrandPersona>>;

  // UI Modals & Actions
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

  // Toast System
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeModule, setActiveModule] = useState<DashboardModule>('generator');
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true); // Default to Clean Simple Mode!

  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>(INITIAL_GENERATED_POSTS);
  const [drafts, setDrafts] = useState<DraftItem[]>(INITIAL_DRAFTS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [brandPersona, setBrandPersona] = useState<BrandPersona>(INITIAL_BRAND_PERSONA);

  const [previewPost, setPreviewPost] = useState<GeneratedPost | null>(null);
  const [exportPost, setExportPost] = useState<GeneratedPost | null>(null);
  const [publishPost, setPublishPost] = useState<GeneratedPost | null>(null);
  const [isOAuthOpen, setIsOAuthOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addGeneratedPost = (post: GeneratedPost) => {
    setGeneratedPosts((prev) => [post, ...prev]);
  };

  const saveAsDraft = (post: GeneratedPost, status: 'Draft' | 'Scheduled' = 'Draft') => {
    const newDraft: DraftItem = {
      ...post,
      status,
      scheduledDate: new Date().toISOString().split('T')[0],
    };
    setDrafts((prev) => [newDraft, ...prev.filter(d => d.id !== post.id)]);
    addToast(`Post saved to ${status}s!`, 'success');
  };

  const updateDraftStatus = (id: string, status: 'Draft' | 'Scheduled' | 'Published') => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    addToast(`Updated status to ${status}`, 'info');
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    addToast('Draft deleted', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeModule,
        setActiveModule,
        isSimpleMode,
        setIsSimpleMode,
        generatedPosts,
        addGeneratedPost,
        drafts,
        saveAsDraft,
        updateDraftStatus,
        deleteDraft,
        userProfile,
        setUserProfile,
        brandPersona,
        setBrandPersona,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
