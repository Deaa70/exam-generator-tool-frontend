"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface StatsData {
  generations: number;
  total_questions: number;
}

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/stats`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`فشل تحميل الإحصائيات (${response.status})`);
        }

        const json = (await response.json()) as StatsData;
        setData(json);
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          return;
        }
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "فشل تحميل الإحصائيات"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:max-w-md">
        <StatCard label="الاختبارات المُنشأة" value="..." />
        <StatCard label="مجموع الأسئلة" value="..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 sm:px-4 sm:py-3 sm:text-sm">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:max-w-md">
      <StatCard
        label="الاختبارات المُنشأة"
        value={data.generations.toLocaleString("en-us")}
      />
      <StatCard
        label="مجموع الأسئلة"
        value={data.total_questions.toLocaleString("en-us")}
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3 sm:px-4 sm:py-4">
      <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-[#00ffbf] sm:text-2xl">
        {value}
      </p>
    </div>
  );
}