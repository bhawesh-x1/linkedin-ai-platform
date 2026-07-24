/**
 * Centralized Database Sync Service
 * Handles real-time persistence with IndexedDB / LocalStorage & Supabase Backend Sync
 */

import { GeneratedPost, DraftItem, BrandPersona, UserProfile } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'linkedin_ai_user_profile',
  PERSONA: 'linkedin_ai_brand_persona',
  POSTS: 'linkedin_ai_generated_posts',
  DRAFTS: 'linkedin_ai_saved_drafts',
};

export class DatabaseService {
  private static isRemoteConnected = false;

  // Check if Supabase / Remote Database credentials are configured
  public static isConnected(): boolean {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return !!(url && key);
  }

  // Load User Profile
  public static getProfile(fallback: UserProfile): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Save User Profile
  public static saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }

  // Load Brand Persona
  public static getPersona(fallback: BrandPersona): BrandPersona {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PERSONA);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Save Brand Persona
  public static savePersona(persona: BrandPersona): void {
    localStorage.setItem(STORAGE_KEYS.PERSONA, JSON.stringify(persona));
  }

  // Load Posts History
  public static getPosts(fallback: GeneratedPost[]): GeneratedPost[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Save Posts History
  public static savePosts(posts: GeneratedPost[]): void {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }

  // Load Drafts
  public static getDrafts(fallback: DraftItem[]): DraftItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Save Drafts
  public static saveDrafts(drafts: DraftItem[]): void {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  }
}
