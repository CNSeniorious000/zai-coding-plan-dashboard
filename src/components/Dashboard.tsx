'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, ClipboardPaste, Eye, EyeOff, Key, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUsage } from '@/components/UsageContext';

export function Dashboard() {
  const t = useTranslations();
  const {
    apiKey,
    setApiKey,
    usageData,
    isValidApiKey,
    fetchUsage,
    isLoading,
  } = useUsage();

  const [showApiKey, setShowApiKey] = useState(true);
  const error = usageData?.error;

  const formatResetTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-fetch on mount if API key is already set
  useEffect(() => {
    if (isValidApiKey && !usageData && !isLoading) {
      fetchUsage();
    }
  }, [isValidApiKey, usageData, isLoading, fetchUsage]);

  const handlePaste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    if (text) {
      setApiKey(text);
      // Validate and fetch after setting the key
      const API_KEY_PATTERN = /^[a-f0-9]{32}\.[A-Za-z0-9]{16}$/;
      if (API_KEY_PATTERN.test(text)) {
        fetchUsage();
      }
    }
  }, [setApiKey, fetchUsage]);

  return (
    <div className='space-y-4'>
      {/* API Key Input */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-1.5 text-sm font-medium'>
            <Key className='w-3.5 h-3.5' />
            {t('apiKey.title')}
          </CardTitle>
          <CardDescription className='text-xs'>
            {t('apiKey.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-2'>
            <div className='flex-1 flex gap-2'>
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isValidApiKey && !isLoading) {
                    fetchUsage();
                  }
                }}
                placeholder={t('apiKey.placeholder')}
                className={`flex-1 font-mono text-xs h-8 ${apiKey && !isValidApiKey ? 'border-destructive/50' : ''}`}
              />
              <Button
                variant='outline'
                size='sm'
                className='h-8 px-2'
                onClick={() => setShowApiKey(!showApiKey)}
                title={showApiKey ? t('apiKey.hide') : t('apiKey.show')}
              >
                {showApiKey ? <EyeOff className='w-3.5 h-3.5' /> : <Eye className='w-3.5 h-3.5' />}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='h-8 px-2'
                onClick={handlePaste}
                title={t('apiKey.paste')}
              >
                <ClipboardPaste className='w-3.5 h-3.5' />
              </Button>
            </div>
            <Button
              onClick={fetchUsage}
              disabled={isLoading || !apiKey || !isValidApiKey}
              size='sm'
              className='rounded-full px-3 h-8 text-xs'
            >
              {isLoading
                ? (
                  <>
                    <Loader2 className='w-3 h-3 animate-spin' />
                    {t('common.loading')}
                  </>
                )
                : (
                  <>
                    <RefreshCw className='w-3 h-3' />
                    {t('common.fetch')}
                  </>
                )}
            </Button>
          </div>
          {apiKey && !isValidApiKey && (
            <p className='text-[10px] text-destructive/70 mt-1.5'>
              {t('apiKey.invalid')}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className='border-destructive/50 bg-destructive/5'>
          <CardContent className='flex items-center gap-2'>
            <AlertCircle className='w-3.5 h-3.5 text-destructive' />
            <p className='text-destructive text-xs'>
              {error === 'FETCH_FAILED' ? t('errors.fetchFailed') : error}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quota Overview */}
      {usageData?.quotaLimit?.limits && (
        <div className='grid gap-4' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {usageData.quotaLimit.limits.map((limit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardDescription className='text-xs'>{limit.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-end gap-1.5 mb-2'>
                  <span className='text-2xl font-semibold tabular-nums tracking-tight'>{limit.percentage}</span>
                  <span className='text-muted-foreground text-xs mb-0.5'>{t('quota.used')}</span>
                </div>
                <div className='w-full bg-muted rounded-full h-1.5 overflow-hidden'>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${limit.percentage > 80 ? 'bg-red-400/80 dark:bg-red-300/70' : limit.percentage > 50 ? 'bg-amber-400/80 dark:bg-amber-300/70' : 'bg-emerald-500/80 dark:bg-emerald-400/70'}`}
                    style={{ width: `${Math.min(limit.percentage, 100)}%` }}
                  />
                </div>
                <div className='mt-2 flex justify-between text-xs text-muted-foreground'>
                  {limit.currentUsage !== undefined && limit.total !== undefined && <span className='tabular-nums'>{limit.currentUsage.toLocaleString()} / {limit.total.toLocaleString()}</span>}
                  {limit.remaining !== undefined && <span className='tabular-nums'>{limit.remaining.toLocaleString()} {t('quota.remaining')}</span>}
                </div>
                {limit.nextResetTime && (
                  <p className='mt-1.5 text-[10px] text-muted-foreground'>
                    {t('quota.resetsAt', { time: formatResetTime(limit.nextResetTime) })}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Model Usage */}
      {usageData?.modelUsage && Array.isArray(usageData.modelUsage) && usageData.modelUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>{t('modelUsage.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto -mx-4'>
              <table className='w-full text-xs'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-2 px-4 text-muted-foreground font-medium'>{t('modelUsage.model')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('modelUsage.requests')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('modelUsage.input')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('modelUsage.output')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('modelUsage.total')}</th>
                  </tr>
                </thead>
                <tbody>
                  {usageData.modelUsage.map((item, index) => (
                    <tr key={index} className='border-b last:border-0'>
                      <td className='py-2 px-4 font-medium'>{item.model}</td>
                      <td className='py-2 px-4 text-right tabular-nums'>{item.requestCount?.toLocaleString()}</td>
                      <td className='py-2 px-4 text-right tabular-nums'>{item.inputTokens?.toLocaleString()}</td>
                      <td className='py-2 px-4 text-right tabular-nums'>{item.outputTokens?.toLocaleString()}</td>
                      <td className='py-2 px-4 text-right font-medium tabular-nums'>{item.totalTokens?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tool Usage */}
      {usageData?.toolUsage && Array.isArray(usageData.toolUsage) && usageData.toolUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>{t('toolUsage.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto -mx-4'>
              <table className='w-full text-xs'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-2 px-4 text-muted-foreground font-medium'>{t('toolUsage.tool')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('toolUsage.totalCalls')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('toolUsage.success')}</th>
                    <th className='text-right py-2 px-4 text-muted-foreground font-medium'>{t('toolUsage.failures')}</th>
                  </tr>
                </thead>
                <tbody>
                  {usageData.toolUsage.map((item, index) => (
                    <tr key={index} className='border-b last:border-0'>
                      <td className='py-2 px-4 font-medium'>{item.tool}</td>
                      <td className='py-2 px-4 text-right tabular-nums'>{item.callCount?.toLocaleString()}</td>
                      <td className='py-2 px-4 text-right tabular-nums text-green-600 dark:text-green-400'>
                        {item.successCount?.toLocaleString()}
                      </td>
                      <td className='py-2 px-4 text-right tabular-nums text-red-600 dark:text-red-400'>
                        {item.failureCount?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!usageData && !isLoading && !error && (
        <Card>
          <CardContent className='text-center py-6'>
            <Key className='w-6 h-6 mx-auto mb-2 text-muted-foreground/40' />
            <p className='text-muted-foreground text-xs'>{t('empty.description')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
