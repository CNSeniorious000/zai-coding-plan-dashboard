'use client';

import { useState, useCallback, useEffect } from 'react';
import { Key, Loader2, RefreshCw, AlertCircle, ClipboardPaste } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const API_KEY_STORAGE_KEY = 'zai-api-key';
const API_KEY_PATTERN = /^[a-f0-9]{32}\.[A-Za-z0-9]{16}$/;

interface UsageData {
  modelUsage: ModelUsageItem[] | null;
  toolUsage: ToolUsageItem[] | null;
  quotaLimit: { limits: QuotaLimitItem[] } | null;
  error?: string;
}

interface ModelUsageItem {
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  requestCount: number;
}

interface ToolUsageItem {
  tool: string;
  callCount: number;
  successCount: number;
  failureCount: number;
}

interface QuotaLimitItem {
  type: string;
  percentage: number;
  currentUsage?: number;
  total?: number;
  remaining?: number;
  nextResetTime?: number;
}

interface DashboardProps {
  onDataLoaded?: (data: any) => void;
}

export function Dashboard({ onDataLoaded }: DashboardProps) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UsageData | null>(null);

  const fetchUsageWithKey = useCallback(async (key: string) => {
    if (!key.trim() || !API_KEY_PATTERN.test(key)) return;

    setLoading(true);
    setError(null);

    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, now.getHours(), 0, 0, 0);
      const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 59, 59, 999);

      const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      const response = await fetch('/api/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: key,
          startTime: formatDateTime(startDate),
          endTime: formatDateTime(endDate),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch usage data');
      }

      setData(result);
      onDataLoaded?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [onDataLoaded]);

  // Load API key from localStorage on mount and auto-fetch if valid
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      if (API_KEY_PATTERN.test(savedKey)) {
        fetchUsageWithKey(savedKey);
      }
    }
  }, [fetchUsageWithKey]);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey && API_KEY_PATTERN.test(apiKey)) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    }
  }, [apiKey]);

  const isValidApiKey = API_KEY_PATTERN.test(apiKey);

  const fetchUsage = useCallback(() => {
    fetchUsageWithKey(apiKey);
  }, [apiKey, fetchUsageWithKey]);

  const formatResetTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* API Key Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
            <Key className="w-3.5 h-3.5" />
            API Key
          </CardTitle>
          <CardDescription className="text-xs">
            Your API key is only used to query Z.AI servers and is not stored.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 flex gap-1">
              <Input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isValidApiKey && !loading) {
                    fetchUsage();
                  }
                }}
                placeholder="Enter your Z.AI API key"
                className={`flex-1 font-mono text-xs h-8 ${apiKey && !isValidApiKey ? 'border-destructive/50' : ''}`}
              />
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setApiKey(text);
                    if (API_KEY_PATTERN.test(text)) {
                      fetchUsageWithKey(text);
                    }
                  }
                }}
                title="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Button
              onClick={fetchUsage}
              disabled={loading || !apiKey || !isValidApiKey}
              size="sm"
              className="rounded-full px-3 h-8 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" />
                  Fetch
                </>
              )}
            </Button>
          </div>
          {apiKey && !isValidApiKey && (
            <p className="text-[10px] text-destructive/70 mt-1.5">
              Format: 32 hex characters + dot + 16 alphanumeric characters
            </p>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            <p className="text-destructive text-xs">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Quota Overview */}
      {data?.quotaLimit?.limits && (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {data.quotaLimit.limits.map((limit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardDescription className="text-xs">{limit.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-2xl font-semibold tabular-nums tracking-tight">{limit.percentage}</span>
                  <span className="text-muted-foreground text-xs mb-0.5">% used</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      limit.percentage > 80
                        ? 'bg-red-400/80 dark:bg-red-300/70'
                        : limit.percentage > 50
                        ? 'bg-amber-400/80 dark:bg-amber-300/70'
                        : 'bg-emerald-500/80 dark:bg-emerald-400/70'
                    }`}
                    style={{ width: `${Math.min(limit.percentage, 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  {limit.currentUsage !== undefined && limit.total !== undefined && (
                    <span className="tabular-nums">{limit.currentUsage.toLocaleString()} / {limit.total.toLocaleString()}</span>
                  )}
                  {limit.remaining !== undefined && (
                    <span className="tabular-nums">{limit.remaining.toLocaleString()} remaining</span>
                  )}
                </div>
                {limit.nextResetTime && (
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    Resets at {formatResetTime(limit.nextResetTime)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Model Usage */}
      {data?.modelUsage && Array.isArray(data.modelUsage) && data.modelUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Model Usage (Last 24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 text-muted-foreground font-medium">Model</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Requests</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Input</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Output</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.modelUsage.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-4 font-medium">{item.model}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{item.requestCount?.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{item.inputTokens?.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{item.outputTokens?.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right font-medium tabular-nums">{item.totalTokens?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tool Usage */}
      {data?.toolUsage && Array.isArray(data.toolUsage) && data.toolUsage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tool Usage (Last 24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 text-muted-foreground font-medium">Tool</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Total Calls</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Success</th>
                    <th className="text-right py-2 px-4 text-muted-foreground font-medium">Failures</th>
                  </tr>
                </thead>
                <tbody>
                  {data.toolUsage.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-4 font-medium">{item.tool}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{item.callCount?.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right tabular-nums text-green-600 dark:text-green-400">
                        {item.successCount?.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-right tabular-nums text-red-600 dark:text-red-400">
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
      {!data && !loading && !error && (
        <Card>
          <CardContent className="text-center py-6">
            <Key className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-muted-foreground text-xs">Enter your API key and click &quot;Fetch&quot; to view your usage statistics.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
