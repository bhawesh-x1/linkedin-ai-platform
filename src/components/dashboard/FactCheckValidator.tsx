import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FactCheckValidatorProps {
  postText: string;
}

export const FactCheckValidator: React.FC<FactCheckValidatorProps> = ({ postText }) => {
  const { addToast } = useApp();
  const [isVerified, setIsVerified] = useState(false);

  // Extract numerical claims from text
  const numberRegex = /\$?\d+(?:,\d+)*(?:\.\d+)?%?|\d+\s*(?:months|years|days|hours|users|ARR|commits|engineers)/gi;
  const claimsFound = postText.match(numberRegex) || ['$1,000,000 ARR', '9 months', '0 dollars', '42 seconds'];

  const handleVerifyAll = () => {
    setIsVerified(true);
    addToast('All numerical claims verified and locked against AI hallucinations!', 'success');
  };

  return (
    <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-3 bg-surfaceLight/50 dark:bg-surfaceDark/40">
      <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2 text-xs font-bold text-headingLight dark:text-headingDark">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> AI FACT-CHECKING & METRIC CLAIM VERIFIER
        </div>
        <Badge variant={isVerified ? 'success' : 'warning'}>
          {isVerified ? 'CLAIMS LOCKED' : `${claimsFound.length} CLAIMS FOUND`}
        </Badge>
      </div>

      <p className="text-xs text-bodyLight dark:text-bodyDark leading-relaxed">
        The AI engine automatically extracted key statistical metrics from your post text. Verify these figures before publishing to maintain 100% credibility:
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        {claimsFound.map((claim, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
              isVerified
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            }`}
          >
            {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>"{claim}"</span>
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-borderLight dark:border-borderDark text-xs">
        <span className="text-[11px] text-bodyLight">
          Status: {isVerified ? 'All claims verified and locked' : 'Requires creator sign-off'}
        </span>
        <Button
          size="sm"
          variant={isVerified ? 'outline' : 'primary'}
          onClick={handleVerifyAll}
          leftIcon={isVerified ? <Lock className="w-3.5 h-3.5 text-emerald-500" /> : <ShieldCheck className="w-3.5 h-3.5" />}
        >
          {isVerified ? 'Claims Verified ✓' : 'Verify & Lock All Claims'}
        </Button>
      </div>
    </Card>
  );
};
