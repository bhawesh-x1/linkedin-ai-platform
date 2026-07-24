import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShieldCheck, RefreshCw, Key, Activity, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OAuthTokenHealthStatus: React.FC = () => {
  const { userProfile, addToast, setIsOAuthOpen } = useApp();
  const [daysRemaining, setDaysRemaining] = useState(54);
  const [sharesToday, setSharesToday] = useState(14);
  const maxSharesPerDay = 100;

  const handleRefreshToken = () => {
    setDaysRemaining(60);
    addToast('OAuth Access Token refreshed! Valid for 60 days.', 'success');
  };

  return (
    <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2 text-xs font-bold text-headingLight dark:text-headingDark">
          <Activity className="w-4 h-4 text-emerald-500" /> LINKEDIN API TOKEN & RATE LIMIT MONITOR
        </div>
        <Badge variant="success" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
          OAUTH HEALTHY
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        
        {/* Token Expiration Meter */}
        <div className="p-3 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
          <div className="flex justify-between font-bold">
            <span className="text-bodyLight flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-indigo" /> Token Expiration
            </span>
            <span className="text-brand-indigo">{daysRemaining} Days Left</span>
          </div>
          <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
            <div className="h-full bg-brand-indigo" style={{ width: `${(daysRemaining / 60) * 100}%` }} />
          </div>
        </div>

        {/* Daily Share Rate Limit Meter */}
        <div className="p-3 rounded-xl bg-surfaceLight dark:bg-surfaceDark border border-borderLight dark:border-borderDark space-y-1.5">
          <div className="flex justify-between font-bold">
            <span className="text-bodyLight flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> Daily Share Limit
            </span>
            <span className="text-emerald-500">{sharesToday} / {maxSharesPerDay}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-bgLight dark:bg-bgDark overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${(sharesToday / maxSharesPerDay) * 100}%` }} />
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-[11px] text-bodyLight">
          Scope: <code className="text-brand-indigo">w_member_social</code> • AES-256 Encrypted
        </span>
        <Button size="sm" variant="outline" onClick={handleRefreshToken} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Force Token Refresh
        </Button>
      </div>
    </Card>
  );
};
