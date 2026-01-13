'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Dashboard } from '@/components/Dashboard';
import { UsageCharts } from '@/components/UsageCharts';
import { ModeToggle } from '@/components/ModeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BarChart3, BookOpen, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeSeriesItem {
  time: string;
  fullTime: string;
  calls: number;
  tokens: number;
}

interface UsageData {
  modelUsage?: {
    timeSeries: TimeSeriesItem[];
    totalCalls: number;
    totalTokens: number;
  } | null;
  quotaLimit?: { limits: { type: string; percentage: number }[] } | null;
}

export default function Home() {
  const t = useTranslations();
  const [usageData, setUsageData] = useState<UsageData | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Organic blur shapes - Material You atmospheric background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute -bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-primary/10">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <h1 className="text-sm font-medium tracking-tight">Z.AI Usage</h1>
            </div>
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 text-xs" asChild>
                <Link href="/docs" className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('docs.nav.docs')}</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 text-xs" asChild>
                <a
                  href="https://github.com/CNSeniorious000/zai-coding-plan-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
              <LanguageSwitcher />
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-xl font-medium tracking-tight mb-1.5 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t('home.title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Dashboard */}
        <Dashboard onDataLoaded={setUsageData} />

        {/* Charts */}
        {usageData && (
          <div className="mt-8">
            <UsageCharts
              modelUsage={usageData.modelUsage}
              quotaLimits={usageData.quotaLimit?.limits}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/40 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>Z.AI Usage Dashboard</p>
            <div className="flex items-center gap-5">
              <Link href="/docs" className="hover:text-foreground transition-colors">
                {t('docs.title')}
              </Link>
              <a
                href="https://z.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Z.AI Platform
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
