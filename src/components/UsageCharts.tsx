'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TimeSeriesItem {
  time: string;
  fullTime: string;
  calls: number;
  tokens: number;
}

interface ModelUsageData {
  timeSeries: TimeSeriesItem[];
  totalCalls: number;
  totalTokens: number;
}

interface QuotaLimitItem {
  type: string;
  percentage: number;
}

interface UsageChartsProps {
  modelUsage?: ModelUsageData | null;
  quotaLimits?: QuotaLimitItem[] | null;
}

export function UsageCharts({ modelUsage, quotaLimits }: UsageChartsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasModelData = modelUsage?.timeSeries && modelUsage.timeSeries.length > 0;
  const hasQuotaData = quotaLimits && quotaLimits.length > 0;

  if (!hasModelData && !hasQuotaData) {
    return null;
  }

  const isDark = mounted && resolvedTheme === 'dark';

  // Material You theme-aware colors - softer, more harmonious
  const colors = {
    grid: isDark ? 'rgba(148, 130, 180, 0.15)' : 'rgba(103, 80, 164, 0.1)',
    text: isDark ? '#a8a0b8' : '#6b6280',
    tooltipBg: isDark ? '#2d2640' : '#faf8ff',
    tooltipBorder: isDark ? 'rgba(148, 130, 180, 0.2)' : 'rgba(103, 80, 164, 0.15)',
    tooltipText: isDark ? '#e8e0f0' : '#1c1b2e',
    area: isDark ? '#b4a0d4' : '#7c5caf',
    areaGradientStart: isDark ? 'rgba(180, 160, 212, 0.35)' : 'rgba(124, 92, 175, 0.25)',
    areaGradientEnd: isDark ? 'rgba(180, 160, 212, 0.02)' : 'rgba(124, 92, 175, 0)',
    bar: isDark ? '#7eb8a8' : '#4a9080',
    pieMuted: isDark ? 'rgba(148, 130, 180, 0.2)' : 'rgba(103, 80, 164, 0.12)',
  };

  const quotaData = quotaLimits?.map((item) => ({
    name: item.type,
    value: item.percentage,
    remaining: Math.max(0, 100 - item.percentage),
  })) || [];

  const getQuotaColor = (percentage: number) => {
    if (percentage > 80) return isDark ? '#e8a0a0' : '#c45050';
    if (percentage > 50) return isDark ? '#d4c090' : '#a08040';
    return isDark ? '#7eb8a8' : '#4a9080';
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Token Usage Over Time */}
      {hasModelData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Token Usage Over Time</CardTitle>
            <CardDescription className="text-xs">
              Total: {modelUsage.totalTokens.toLocaleString()} tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={modelUsage.timeSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.area} stopOpacity={isDark ? 0.4 : 0.3} />
                      <stop offset="95%" stopColor={colors.area} stopOpacity={isDark ? 0.05 : 0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: colors.text }}
                    tickLine={false}
                    stroke={colors.grid}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: colors.text }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                      return value;
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.tooltipBg,
                      border: `1px solid ${colors.tooltipBorder}`,
                      borderRadius: '6px',
                      color: colors.tooltipText,
                      fontSize: '11px',
                      padding: '6px 10px',
                    }}
                    formatter={(value: number) => [value.toLocaleString() + ' tokens', 'Usage']}
                    labelFormatter={(label) => `Time: ${label}`}
                    labelStyle={{ color: colors.tooltipText, fontSize: '10px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke={colors.area}
                    fillOpacity={1}
                    fill="url(#colorTokens)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Calls Over Time */}
      {hasModelData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">API Calls Over Time</CardTitle>
            <CardDescription className="text-xs">
              Total: {modelUsage.totalCalls.toLocaleString()} calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelUsage.timeSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: colors.text }}
                    tickLine={false}
                    stroke={colors.grid}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: colors.text }}
                    tickLine={false}
                    axisLine={false}
                    width={32}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.tooltipBg,
                      border: `1px solid ${colors.tooltipBorder}`,
                      borderRadius: '6px',
                      color: colors.tooltipText,
                      fontSize: '11px',
                      padding: '6px 10px',
                    }}
                    formatter={(value: number) => [value.toLocaleString() + ' calls', 'Calls']}
                    labelFormatter={(label) => `Time: ${label}`}
                    labelStyle={{ color: colors.tooltipText, fontSize: '10px' }}
                  />
                  <Bar
                    dataKey="calls"
                    fill={colors.bar}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quota Pie Charts */}
      {hasQuotaData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quota Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {quotaData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-[50px] w-[50px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Used', value: item.value },
                            { name: 'Remaining', value: item.remaining },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={16}
                          outerRadius={24}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell fill={getQuotaColor(item.value)} />
                          <Cell fill={colors.pieMuted} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold tabular-nums">{item.value}%</p>
                    <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
