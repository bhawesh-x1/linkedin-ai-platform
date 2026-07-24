/**
 * Centralized Database Export & Device Backup Manager
 * Enables full state backup and device sync across browsers/devices.
 */

export interface SystemDatabaseExport {
  version: string;
  timestamp: string;
  userProfile: any;
  brandPersona: any;
  generatedPosts: any[];
  drafts: any[];
}

export const exportSystemDatabase = (
  userProfile: any,
  brandPersona: any,
  generatedPosts: any[],
  drafts: any[]
) => {
  const dbData: SystemDatabaseExport = {
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    userProfile,
    brandPersona,
    generatedPosts,
    drafts,
  };

  const jsonString = JSON.stringify(dbData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `linkedin-ai-db-backup-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importSystemDatabase = (
  file: File,
  onSuccess: (data: SystemDatabaseExport) => void,
  onError: (msg: string) => void
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target?.result as string) as SystemDatabaseExport;
      if (!parsed.userProfile || !parsed.brandPersona) {
        onError('Invalid database backup file format.');
        return;
      }
      onSuccess(parsed);
    } catch (err) {
      onError('Failed to parse database backup JSON file.');
    }
  };
  reader.readAsText(file);
};
