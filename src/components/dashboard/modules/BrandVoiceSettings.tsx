import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { UserCheck, Shield, Sparkles, Plus, X, Save } from 'lucide-react';

export const BrandVoiceSettings: React.FC = () => {
  const { brandPersona, setBrandPersona, addToast } = useApp();

  const [fullName, setFullName] = useState(brandPersona.fullName);
  const [headline, setHeadline] = useState(brandPersona.headline);
  const [targetAudience, setTargetAudience] = useState(brandPersona.targetAudience);
  const [signatureSignoff, setSignatureSignoff] = useState(brandPersona.signatureSignoff);
  const [formalityLevel, setFormalityLevel] = useState(brandPersona.formalityLevel);
  const [humorLevel, setHumorLevel] = useState(brandPersona.humorLevel);
  const [storytellingDensity, setStorytellingDensity] = useState(brandPersona.storytellingDensity);

  const [pillars, setPillars] = useState<string[]>(brandPersona.corePillars);
  const [newPillar, setNewPillar] = useState('');

  const [excludedWords, setExcludedWords] = useState<string[]>(brandPersona.excludedWords);
  const [newWord, setNewWord] = useState('');

  const handleAddPillar = () => {
    if (newPillar.trim() && !pillars.includes(newPillar.trim())) {
      setPillars([...pillars, newPillar.trim()]);
      setNewPillar('');
    }
  };

  const handleRemovePillar = (item: string) => {
    setPillars(pillars.filter(p => p !== item));
  };

  const handleAddExcludedWord = () => {
    if (newWord.trim() && !excludedWords.includes(newWord.trim())) {
      setExcludedWords([...excludedWords, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveExcludedWord = (item: string) => {
    setExcludedWords(excludedWords.filter(w => w !== item));
  };

  const handleSave = () => {
    setBrandPersona({
      fullName,
      headline,
      targetAudience,
      corePillars: pillars,
      excludedWords,
      signatureSignoff,
      formalityLevel,
      humorLevel,
      storytellingDensity,
    });
    addToast('Brand Voice Persona updated successfully!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Form Settings Column */}
      <div className="lg:col-span-7 space-y-6">
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-indigo" /> Persona Configuration
            </h3>
            <Badge variant="primary">AI Voice Active</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Full Name / Creator</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-headingLight dark:text-headingDark">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-headingLight dark:text-headingDark">LinkedIn Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
            />
          </div>

          {/* Core Pillars Tag Editor */}
          <div className="space-y-2 text-xs">
            <label className="font-semibold text-headingLight dark:text-headingDark block">
              Core Brand Pillars (Content Topics)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                placeholder="Add core topic e.g. SaaS Growth..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddPillar()}
                className="flex-1 px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
              <Button size="sm" onClick={handleAddPillar} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {pillars.map((p, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/10 text-brand-indigo text-xs font-semibold">
                  {p}
                  <button onClick={() => handleRemovePillar(p)} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Excluded Buzzwords Tag Editor */}
          <div className="space-y-2 text-xs pt-2 border-t border-borderLight dark:border-borderDark">
            <label className="font-semibold text-rose-500 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Excluded AI Buzzwords (Shielded from Generation)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Add word to avoid e.g. synergy..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddExcludedWord()}
                className="flex-1 px-3 py-2 rounded-xl border border-borderLight dark:border-borderDark bg-surfaceLight dark:bg-surfaceDark text-headingLight dark:text-headingDark focus:outline-none"
              />
              <Button size="sm" variant="outline" onClick={handleAddExcludedWord} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Ban Word
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {excludedWords.map((w, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/20">
                  🚫 {w}
                  <button onClick={() => handleRemoveExcludedWord(w)} className="hover:text-rose-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} rightIcon={<Save className="w-4 h-4" />} className="w-full py-3">
            Save Brand Persona Settings
          </Button>

        </Card>
      </div>

      {/* Right Tone Controls Column */}
      <div className="lg:col-span-5 space-y-6">
        <Card padding="lg" className="border border-borderLight dark:border-borderDark space-y-6">
          <div className="pb-3 border-b border-borderLight dark:border-borderDark">
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-violet" /> Fine-Tune Persona Sliders
            </h3>
            <p className="text-xs text-bodyLight dark:text-bodyDark">
              Adjust parameters to fine-tune how AI writes for you
            </p>
          </div>

          {/* Formality Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-headingLight dark:text-headingDark">Formality Level</span>
              <span className="text-brand-indigo">{formalityLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formalityLevel}
              onChange={(e) => setFormalityLevel(Number(e.target.value))}
              className="w-full accent-brand-indigo"
            />
            <div className="flex justify-between text-[10px] text-bodyLight dark:text-bodyDark">
              <span>Casual / Conversational</span>
              <span>Formal Executive</span>
            </div>
          </div>

          {/* Humor Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-headingLight dark:text-headingDark">Humor / Wit</span>
              <span className="text-brand-violet">{humorLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={humorLevel}
              onChange={(e) => setHumorLevel(Number(e.target.value))}
              className="w-full accent-brand-violet"
            />
            <div className="flex justify-between text-[10px] text-bodyLight dark:text-bodyDark">
              <span>Strictly Professional</span>
              <span>Witty & Playful</span>
            </div>
          </div>

          {/* Storytelling Density Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-headingLight dark:text-headingDark">Storytelling Density</span>
              <span className="text-emerald-500">{storytellingDensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={storytellingDensity}
              onChange={(e) => setStorytellingDensity(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-bodyLight dark:text-bodyDark">
              <span>Direct Data Listicles</span>
              <span>Vulnerable Narrative</span>
            </div>
          </div>

        </Card>
      </div>

    </div>
  );
};
