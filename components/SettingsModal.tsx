import React, { useState, useRef } from 'react';
import { X, Upload, Save, AlertCircle, FileText, CheckCircle2, Download, Database } from 'lucide-react';
import { Bookmark } from '../types';
import { parseBookmarksHTML } from '../utils/parser';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (bookmarks: Bookmark[]) => void;
  onAddManual: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onImport, onAddManual }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'data'>('add');
  const [manualTitle, setManualTitle] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg: string }>({ type: 'idle', msg: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle || !manualUrl) return;
    
    // Basic URL fix
    let urlToSave = manualUrl;
    if (!/^https?:\/\//i.test(urlToSave)) {
        urlToSave = 'https://' + urlToSave;
    }

    onAddManual({ title: manualTitle, url: urlToSave });
    setManualTitle('');
    setManualUrl('');
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImportStatus({ type: 'idle', msg: 'Parsing...' });
      const text = await file.text();
      const bookmarks = parseBookmarksHTML(text);
      
      if (bookmarks.length === 0) {
        setImportStatus({ type: 'error', msg: 'No bookmarks found in file.' });
        return;
      }

      onImport(bookmarks);
      setImportStatus({ type: 'success', msg: `Successfully imported ${bookmarks.length} bookmarks!` });
      setTimeout(onClose, 1500);
    } catch (err) {
      setImportStatus({ type: 'error', msg: 'Failed to parse file. Ensure it is a valid HTML bookmark export.' });
    }
  };

  const handleExportBackup = () => {
    try {
      const bookmarks = localStorage.getItem('zen_bookmarks');
      const engine = localStorage.getItem('zen_active_engine');
      
      const backupData = {
        timestamp: new Date().toISOString(),
        bookmarks: bookmarks ? JSON.parse(bookmarks) : [],
        activeEngineId: engine || 'google'
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zennav-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setImportStatus({ type: 'success', msg: 'Backup file downloaded successfully.' });
    } catch (e) {
      setImportStatus({ type: 'error', msg: 'Failed to generate backup.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'add' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Add Shortcut
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'data' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Data & Backup
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'add' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. My Blog"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">URL</label>
                <input
                  type="text"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="e.g. https://example.com"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 active:transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Shortcut
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Import Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">Import Bookmarks</h3>
                    <p className="text-xs text-slate-500">From Chrome/Edge HTML file</p>
                  </div>
                </div>
                
                <input
                  type="file"
                  accept=".html"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="bookmark-upload"
                />
                <label
                  htmlFor="bookmark-upload"
                  className="w-full cursor-pointer px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Upload className="w-4 h-4" /> Select HTML File
                </label>
              </div>

              {/* Export Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">Backup Data</h3>
                    <p className="text-xs text-slate-500">Save your setup as JSON</p>
                  </div>
                </div>
                
                <button
                  onClick={handleExportBackup}
                  className="w-full cursor-pointer px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Download className="w-4 h-4" /> Export Backup (.json)
                </button>
              </div>

              {/* Status Messages */}
              {importStatus.type !== 'idle' && (
                <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${importStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {importStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0"/> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0"/>}
                    <span>{importStatus.msg}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;