import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ANALYTICS_DATA } from '../../../data/mockData';
import { TrendingUp, Users, Eye, Sparkles, BarChart2 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Impressions */}
        <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-2">
          <div className="flex items-center justify-between text-xs text-bodyLight dark:text-bodyDark">
            <span>Total Impressions</span>
            <div className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-headingLight dark:text-headingDark">
              {ANALYTICS_DATA.impressionsTotal.toLocaleString()}
            </span>
            <Badge variant="success">{ANALYTICS_DATA.impressionsGrowth}</Badge>
          </div>
        </Card>

        {/* Card 2: Engagements */}
        <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-2">
          <div className="flex items-center justify-between text-xs text-bodyLight dark:text-bodyDark">
            <span>Total Engagements</span>
            <div className="p-2 rounded-xl bg-brand-violet/10 text-brand-violet">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-headingLight dark:text-headingDark">
              {ANALYTICS_DATA.engagementsTotal.toLocaleString()}
            </span>
            <Badge variant="success">{ANALYTICS_DATA.engagementsGrowth}</Badge>
          </div>
        </Card>

        {/* Card 3: Profile Views */}
        <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-2">
          <div className="flex items-center justify-between text-xs text-bodyLight dark:text-bodyDark">
            <span>Inbound Profile Views</span>
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-headingLight dark:text-headingDark">
              {ANALYTICS_DATA.profileViewsTotal.toLocaleString()}
            </span>
            <Badge variant="success">{ANALYTICS_DATA.profileViewsGrowth}</Badge>
          </div>
        </Card>

        {/* Card 4: Avg Quality Score */}
        <Card padding="md" className="border border-borderLight dark:border-borderDark space-y-2">
          <div className="flex items-center justify-between text-xs text-bodyLight dark:text-bodyDark">
            <span>Avg Quality Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {ANALYTICS_DATA.avgQualityScore} / 100
            </span>
            <Badge variant="success">{ANALYTICS_DATA.qualityGrowth}</Badge>
          </div>
        </Card>

      </div>

      {/* Interactive Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Chart 1: Impressions Trend (Area Chart) */}
        <Card padding="lg" className="lg:col-span-8 border border-borderLight dark:border-borderDark space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-headingLight dark:text-headingDark flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-indigo" /> Weekly Impression Volume Trend
              </h3>
              <p className="text-xs text-bodyLight dark:text-bodyDark">
                Daily impression reach across all active published posts
              </p>
            </div>
            <Badge variant="primary">30 Days</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.weeklyImpressions}>
                <defs>
                  <linearGradient id="impressionGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B5FEF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5B5FEF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141824', 
                    borderRadius: '12px', 
                    borderColor: '#23293A',
                    color: '#fff',
                    fontSize: '12px' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#5B5FEF" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#impressionGlow)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Tone Performance (Bar Chart) */}
        <Card padding="lg" className="lg:col-span-4 border border-borderLight dark:border-borderDark space-y-4">
          <div>
            <h3 className="text-base font-bold text-headingLight dark:text-headingDark">
              Tone Performance
            </h3>
            <p className="text-xs text-bodyLight dark:text-bodyDark">
              Average quality score by tone category
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.tonePerformance}>
                <XAxis dataKey="tone" stroke="#9CA3AF" fontSize={9} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141824', 
                    borderRadius: '12px', 
                    borderColor: '#23293A',
                    color: '#fff',
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="avgScore" fill="#7C6BFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

    </div>
  );
};
