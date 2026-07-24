import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Search, Copy, Bookmark, Eye, Trash2, Calendar, Check } from 'lucide-react';

export const GenerationHistory: React.FC = () => {
  const { generatedPosts, deleteGeneratedPost, saveAsDraft, setPreviewPost, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = generatedPosts.filter(post => {
    const matchesSearch = post.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.hook.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTone = selectedTone === 'All' || post.tone.includes(selectedTone);
    return matchesSearch && matchesTone;
  });

  const copyPostText = (post: any) => {
    const fullText = `${post.hook}\n\n${post.body}\n\n${post.cta}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(post.id);
    addToast('Post text copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header */}
      <Card padding="md" className="border border-borderLight dark:border-borderDark">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="w-full sm:w-96 flex items-center gap-2 px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-xs">
            <Search className="w-4 h-4 text-bodyLight dark:text-bodyDark shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search past generated posts by topic or keyword..."
              className="flex-1 bg-transparent text-headingLight dark:text-headingDark focus:outline-none"
            />
          </div>

          {/* Tone Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-bodyLight dark:text-bodyDark font-semibold">Filter Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark font-medium focus:outline-none"
            >
              <option value="All">All Tones ({generatedPosts.length})</option>
              <option value="Thought Leader">Thought Leader</option>
              <option value="Storyteller">Storyteller</option>
              <option value="Data-Driven">Data-Driven Expert</option>
            </select>
          </div>

        </div>
      </Card>

      {/* History Items Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card padding="lg" className="text-center py-16 text-xs text-bodyLight dark:text-bodyDark">
            No history posts found matching your search.
          </Card>
        ) : (
          filtered.map((post) => (
            <Card
              key={post.id}
              hoverEffect
              padding="lg"
              className="border border-borderLight dark:border-borderDark space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-borderLight dark:border-borderDark text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{post.tone}</Badge>
                  <span className="text-bodyLight dark:text-bodyDark flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-bodyLight dark:text-bodyDark">Quality:</span>
                  <Badge variant="success">{post.qualityScore}/100</Badge>
                </div>
              </div>

              {/* Hook & Snippet */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-headingLight dark:text-headingDark">
                  Topic: {post.topic}
                </h4>
                <div className="p-3.5 rounded-xl bg-surfaceLight dark:bg-surfaceDark text-xs text-headingLight dark:text-headingDark whitespace-pre-line leading-relaxed font-medium">
                  {post.hook}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-bodyLight dark:text-bodyDark">
                  {post.wordCount} words • ~{post.readTimeSeconds}s read
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyPostText(post)}
                    leftIcon={copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => saveAsDraft(post)}
                    leftIcon={<Bookmark className="w-3.5 h-3.5 text-brand-indigo" />}
                  >
                    Save Draft
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewPost(post)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-brand-violet" />}
                  >
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteGeneratedPost(post.id)}
                    className="text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

            </Card>
          ))
        )}
      </div>

    </div>
  );
};
