import { NextRequest, NextResponse } from 'next/server';

const ZAI_BASE_URL = 'https://api.z.ai';

interface QuotaLimitItem {
  type: string;
  percentage: number;
  currentValue?: number;
  usage?: number;
  remaining?: number;
  nextResetTime?: number;
  usageDetails?: { modelCode: string; usage: number }[];
}

async function fetchUsage(url: string, apiKey: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept-Language': 'en-US,en',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.data || data;
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey, startTime, endTime } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    const queryParams = startTime && endTime ? `?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}` : '';

    const [modelUsage, toolUsage, quotaLimit] = await Promise.all([
      fetchUsage(`${ZAI_BASE_URL}/api/monitor/usage/model-usage${queryParams}`, apiKey).catch(() => null),
      fetchUsage(`${ZAI_BASE_URL}/api/monitor/usage/tool-usage${queryParams}`, apiKey).catch(() => null),
      fetchUsage(`${ZAI_BASE_URL}/api/monitor/usage/quota/limit`, apiKey).catch(() => null),
    ]);

    // Process quota limit data
    const processedQuotaLimit = quotaLimit?.limits?.map((item: QuotaLimitItem) => {
      if (item.type === 'TOKENS_LIMIT') {
        return {
          type: 'Token Usage (5 Hour)',
          percentage: item.percentage,
          currentUsage: item.currentValue,
          total: item.usage,
          remaining: item.remaining,
          nextResetTime: item.nextResetTime,
        };
      }
      if (item.type === 'TIME_LIMIT') {
        return {
          type: 'MCP Usage (1 Month)',
          percentage: item.percentage,
          currentUsage: item.currentValue,
          total: item.usage,
          remaining: item.remaining,
          usageDetails: item.usageDetails,
        };
      }
      return item;
    });

    // Transform model usage time series data for charts
    const modelUsageTimeSeries = modelUsage?.x_time?.map((time: string, index: number) => ({
      time: time.split(' ')[1] || time, // Extract just the hour
      fullTime: time,
      calls: modelUsage.modelCallCount?.[index] || 0,
      tokens: modelUsage.tokensUsage?.[index] || 0,
    })).filter((item: { calls: number; tokens: number }) => item.calls > 0 || item.tokens > 0) || [];

    const result = {
      modelUsage: {
        timeSeries: modelUsageTimeSeries,
        totalCalls: modelUsage?.totalUsage?.totalModelCallCount || 0,
        totalTokens: modelUsage?.totalUsage?.totalTokensUsage || 0,
      },
      toolUsage,
      quotaLimit: processedQuotaLimit ? { limits: processedQuotaLimit } : quotaLimit,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Usage API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch usage data' },
      { status: 500 },
    );
  }
}
