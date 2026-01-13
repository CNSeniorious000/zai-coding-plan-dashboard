'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface UsageData {
  modelUsage?: {
    timeSeries: Array<{
      time: string;
      fullTime: string;
      calls: number;
      tokens: number;
    }>;
    totalCalls: number;
    totalTokens: number;
  } | null;
  toolUsage?: Array<{
    tool: string;
    callCount: number;
    successCount: number;
    failureCount: number;
  }> | null;
  quotaLimit?: { limits: Array<{
    type: string;
    percentage: number;
    currentUsage?: number;
    total?: number;
    remaining?: number;
    nextResetTime?: number;
  }> } | null;
  error?: string;
}

interface UsageContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  usageData: UsageData | null;
  setUsageData: (data: UsageData | null) => void;
  isValidApiKey: boolean;
  fetchUsage: () => void;
  isLoading: boolean;
}

const API_KEY_PATTERN = /^[a-f0-9]{32}\.[A-Za-z0-9]{16}$/;
const API_KEY_STORAGE_KEY = 'zai-api-key';

const UsageContext = createContext<UsageContextType | null>(null);

export function UsageProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState('');
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialFetchTriggered, setInitialFetchTriggered] = useState(false);

  const isValidApiKey = API_KEY_PATTERN.test(apiKey);

  const fetchUsage = useCallback(async () => {
    if (!apiKey.trim() || !isValidApiKey) return;

    setIsLoading(true);

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
          apiKey,
          startTime: formatDateTime(startDate),
          endTime: formatDateTime(endDate),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'FETCH_FAILED');
      }

      setUsageData(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'FETCH_FAILED';
      setUsageData({ error: errorMsg });
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, isValidApiKey]);

  // Restore from localStorage on mount (client-side only)
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      // Trigger initial fetch after setting the key
      setInitialFetchTriggered(true);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey && API_KEY_PATTERN.test(apiKey)) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    } else if (apiKey === '') {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, [apiKey]);

  // Auto-fetch when API key becomes available (only once, unless explicitly refetched)
  useEffect(() => {
    if (isValidApiKey && !usageData && !isLoading && initialFetchTriggered) {
      fetchUsage();
    }
  }, [isValidApiKey, usageData, isLoading, initialFetchTriggered, fetchUsage]);

  return (
    <UsageContext.Provider
      value={{
        apiKey,
        setApiKey,
        usageData,
        setUsageData,
        isValidApiKey,
        fetchUsage,
        isLoading,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsage must be used within a UsageProvider');
  }
  return context;
}
