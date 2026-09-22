import React, { useState, useMemo, useRef } from 'react';
import {
  X,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  FileText,
  Upload,
  Copy,
  Check,
  Search,
  ExternalLink,
  Trash2,
  Filter,
  Download,
  Info,
  Server,
  Sparkles,
  Layers,
  Eye,
  Plus,
  HelpCircle,
} from 'lucide-react';
import {
  ManagedFileItem,
  getAllManagedFiles,
  saveCustomManagedFile,
  deleteCustomManagedFile,
} from '../media/fileManager';

interface MediaFileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUrl?: (url: string) => void;
}

type CategoryFilter = 'all' | 'branding' | 'slides' | 'photos' | 'documents' | 'faculty' | 'uploads';

export const MediaFileManagerModal: React.FC<MediaFileManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectUrl,
}) => {
  const [files, setFiles] = useState<ManagedFileItem[]>(() => getAllManagedFiles());
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<ManagedFileItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showPleskHelp, setShowPleskHelp] = useState<boolean>(false);

  // Upload Form State
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'branding' | 'slides' | 'photos' | 'faculty' | 'documents' | 'uploads'>('photos');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadSuggestedUse, setUploadSuggestedUse] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const refreshFiles = () => {
    setFiles(getAllManagedFiles());
  };

  const handleCopyUrl = (file: ManagedFileItem) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this file entry from the media manager?')) {
      deleteCustomManagedFile(id);
      refreshFiles();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadName(file.name);
    const isPdf = file.type === 'application/pdf';
    if (isPdf) {
      setUploadCategory('documents');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName || !uploadUrl) {
      alert('Please provide a file name and select a file or enter a valid URL.');
      return;
    }

    const extMatch = uploadName.match(/\.[0-9a-z]+$/i);
    const extension = extMatch ? extMatch[0].toLowerCase() : '.jpg';

    saveCustomManagedFile({
      name: uploadName,
      category: uploadCategory,
      url: uploadUrl,
      extension: extension,
      fileSize: uploadUrl.startsWith('data:') ? `${Math.round(uploadUrl.length * 0.75 / 1024)} KB` : 'External / Disk',
      description: uploadDescription || 'Uploaded via ARPS Media Manager',
      suggestedUse: uploadSuggestedUse || 'Website content or announcements',
      tags: uploadTags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    refreshFiles();
    setShowUploadModal(false);
    // Reset form
    setUploadName('');
    setUploadUrl('');
    setUploadDescription('');
    setUploadSuggestedUse('');
    setUploadTags('');
  };

  // Filtered files
  const filteredFiles = files.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchDesc = f.description.toLowerCase().includes(q);
      const matchTags = f.tags.some((t) => t.toLowerCase().includes(q));
      const matchSub = f.subCategory?.toLowerCase().includes(q);
      return matchName || matchDesc || matchTags || matchSub;
    }
    return true;
  });

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: files.length,
      branding: 0,
      slides: 0,
      photos: 0,
      documents: 0,
      faculty: 0,
      uploads: 0,
    };
    files.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, [files]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38b6d8] to-[#183648] flex items-center justify-center text-white shadow-md">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-serif tracking-wide">
                  Media & Files Manager
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#38b6d8]/10 text-[#38b6d8] border border-[#38b6d8]/30">
                  📁 /public/media/
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Centralized storage for school photos, banners, CBSE documents, and digital assets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPleskHelp(!showPleskHelp)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl flex items-center gap-1.5 transition border border-slate-700"
              title="Folder Guide & Plesk Instructions"
            >
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Plesk & Folder Guide</span>
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-1.5 bg-[#ef5a5a] hover:bg-[#dc4c4c] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm shadow-red-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Upload File</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Plesk / Deployment Info Drawer */}
        {showPleskHelp && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3.5 text-xs text-amber-200 flex items-start gap-3 animate-fadeIn">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-amber-300">
                How to manage files on your live server (Plesk / Windows IIS):
              </p>
              <p className="text-amber-200/90 leading-relaxed">
                All physical files are placed in <code className="bg-slate-900/80 px-1.5 py-0.5 rounded text-amber-300">public/media/</code> in this workspace. On your live server at <code className="bg-slate-900/80 px-1.5 py-0.5 rounded text-amber-300">test.arpstripura.in</code>, upload them directly to <code className="bg-slate-900/80 px-1.5 py-0.5 rounded text-amber-300">httpdocs/media/</code> in Plesk File Manager. Any file placed there is instantly accessible at <code className="bg-slate-900/80 px-1.5 py-0.5 rounded text-amber-300">/media/&lt;folder&gt;/&lt;filename&gt;</code>!
              </p>
            </div>
            <button
              onClick={() => setShowPleskHelp(false)}
              className="text-amber-400 hover:text-amber-200 text-xs underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All Files', icon: Layers },
              { id: 'branding', label: 'Logos & Crest', icon: Sparkles },
              { id: 'slides', label: 'Hero Slides', icon: ImageIcon },
              { id: 'photos', label: 'Campus Photos', icon: Folder },
              { id: 'documents', label: 'PDFs & Docs', icon: FileText },
              { id: 'faculty', label: 'Faculty', icon: Folder },
              { id: 'uploads', label: 'Custom Uploads', icon: Upload },
            ].map((tab) => {
              const Icon = tab.icon;
              const count = categoryCounts[tab.id] || 0;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#38b6d8] text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files or tags..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38b6d8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'table' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Table view"
              >
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/60">
          {filteredFiles.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <FolderOpen className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">No files found matching criteria</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Try searching for another keyword or select "All Files" to view the complete directory.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => {
                const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(file.extension);
                const isCopied = copiedId === file.id;

                return (
                  <div
                    key={file.id}
                    className="group bg-slate-950 border border-slate-800 hover:border-[#38b6d8]/60 rounded-xl overflow-hidden flex flex-col transition duration-200 shadow-md hover:shadow-xl"
                  >
                    {/* Media Preview Box */}
                    <div className="relative h-36 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
                      {isImage ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/media/branding/arps-logo.png';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
                            <FileText className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-mono uppercase font-semibold text-slate-300">
                            {file.extension.replace('.', '')} Document
                          </span>
                        </div>
                      )}

                      {/* Category Tag Overlay */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/80 backdrop-blur-md text-[#38b6d8] border border-[#38b6d8]/30">
                        {file.category}
                      </span>

                      {/* File Size Badge */}
                      {file.fileSize && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-slate-300">
                          {file.fileSize}
                        </span>
                      )}

                      {/* Hover action preview */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition duration-200">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl shadow-md transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl shadow-md transition"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className="text-xs font-semibold text-white truncate group-hover:text-[#38b6d8] transition"
                            title={file.name}
                          >
                            {file.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                          {file.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 pt-2.5 border-t border-slate-850 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => handleCopyUrl(file)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy Path</span>
                            </>
                          )}
                        </button>

                        {onSelectUrl && (
                          <button
                            onClick={() => onSelectUrl(file.url)}
                            className="py-1.5 px-2.5 bg-[#38b6d8] hover:bg-[#2fa0bf] text-slate-950 font-bold rounded-lg text-[11px] transition"
                          >
                            Use
                          </button>
                        )}

                        {file.isCustom && (
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                            title="Delete custom file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="px-4 py-3">File Name</th>
                    <th className="px-4 py-3">Folder / Category</th>
                    <th className="px-4 py-3">Format</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Path / URL</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredFiles.map((file) => {
                    const isCopied = copiedId === file.id;
                    return (
                      <tr key={file.id} className="hover:bg-slate-900/50 transition">
                        <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                          <Folder className="w-3.5 h-3.5 text-[#38b6d8]" />
                          <span>{file.name}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-850 text-slate-300 text-[10px]">
                            {file.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] uppercase">
                          {file.extension.replace('.', '')}
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                          {file.fileSize || '—'}
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-400 max-w-xs truncate">
                          {file.url}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleCopyUrl(file)}
                              className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                              title="Copy URL"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-slate-850 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                              title="Open link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {file.isCustom && (
                              <button
                                onClick={() => handleDelete(file.id)}
                                className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>
              Total Managed Assets: <strong className="text-white">{files.length}</strong>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline">
              Folder Root: <code className="text-[#38b6d8]">/public/media/</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              Assam Rifles Public School Agartala Portal
            </span>
          </div>
        </div>
      </div>

      {/* Upload / Add File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-base font-serif text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#ef5a5a]" />
                <span>Add / Upload to Media Manager</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-4 text-xs">
              {/* File Picker */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Select Local File (Image or PDF)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*,application/pdf"
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#38b6d8] file:text-slate-950 hover:file:bg-[#2fa0bf] file:cursor-pointer bg-slate-800 rounded-xl p-1"
                />
              </div>

              {/* Or Direct URL */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Or Direct Image/File URL
                </label>
                <input
                  type="text"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://... or /media/photos/sample.jpg"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8]"
                />
              </div>

              {/* File Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  File Display Name
                </label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. annual-sports-day-2026.jpg"
                  required
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Target Media Folder
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#38b6d8]"
                >
                  <option value="photos">/public/media/photos/ (Campus & Events)</option>
                  <option value="slides">/public/media/slides/ (Hero Banners)</option>
                  <option value="documents">/public/media/documents/ (PDFs & Disclosures)</option>
                  <option value="branding">/public/media/branding/ (Logos & Emblems)</option>
                  <option value="faculty">/public/media/faculty/ (Staff Portraits)</option>
                  <option value="uploads">/public/media/uploads/ (General Custom)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Description / Caption
                </label>
                <input
                  type="text"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="e.g. Senior cadets marching in republic day assembly"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8]"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="e.g. sports, athletics, trophy, 2026"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#ef5a5a] hover:bg-[#dc4c4c] text-white font-bold rounded-xl shadow-md transition"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Details / Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-100">
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="font-bold text-sm text-white font-serif flex items-center gap-2">
                <Info className="w-4 h-4 text-[#38b6d8]" />
                <span>Asset Details & Usage</span>
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(previewFile.extension) && (
                <div className="w-full h-48 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">File Name:</span>
                  <span className="font-semibold text-white">{previewFile.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-mono text-[#38b6d8]">/public/media/{previewFile.category}/</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">File Size / Specs:</span>
                  <span className="text-slate-200">
                    {previewFile.fileSize || 'Standard'}{' '}
                    {previewFile.dimensions ? `(${previewFile.dimensions})` : ''}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Recommended Use:</span>
                  <span className="text-slate-200 text-right">{previewFile.suggestedUse}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Web Path:</span>
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 break-all select-all flex items-center justify-between">
                    <span>{previewFile.url}</span>
                    <button
                      onClick={() => handleCopyUrl(previewFile)}
                      className="ml-2 text-xs text-[#38b6d8] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
