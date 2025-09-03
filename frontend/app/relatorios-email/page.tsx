"use client";
import { useEffect, useState } from "react";
import { EmailLineChart } from "../_components/email-line-chart";
import { Card, CardDescription, CardTitle } from "../_components/ui/card";

interface EmailStats {
  total: number;
  productive: number;
  unproductive: number;
}

interface EmailHistory {
  date: string;
  total: number;
  productive: number;
  unproductive: number;
}

const getEmailStats = (): EmailStats => {
  if (typeof window === "undefined")
    return { total: 0, productive: 0, unproductive: 0 };
  const stats = localStorage.getItem("emailStats");
  return stats
    ? JSON.parse(stats)
    : { total: 0, productive: 0, unproductive: 0 };
};

const getEmailHistory = (): EmailHistory[] => {
  if (typeof window === "undefined") return [];
  const history = localStorage.getItem("emailHistory");
  return history ? JSON.parse(history) : [];
};

const EmailReports = () => {
  const [stats, setStats] = useState<EmailStats>({
    total: 0,
    productive: 0,
    unproductive: 0,
  });
  const [chartData, setChartData] = useState<EmailHistory[]>([]);
  useEffect(() => {
    const emailStats = getEmailStats();
    const emailHistory = getEmailHistory();

    setStats(emailStats);
    setChartData(emailHistory);
  }, []);

  return (
    <div className="w-full flex h-screen">
      <div className="flex flex-col gap-4 w-[20%] pt-6 px-4">
        <Card className="p-4">
          <CardTitle>Total</CardTitle>
          <CardDescription>{stats.total}</CardDescription>
        </Card>
        <Card className="p-4">
          <CardTitle>Produtivo</CardTitle>
          <CardDescription>{stats.productive}</CardDescription>
        </Card>
        <Card className="p-4">
          <CardTitle>Improdutivo</CardTitle>
          <CardDescription>{stats.unproductive}</CardDescription>
        </Card>
      </div>

      <div className="w-full pt-6">
        <EmailLineChart data={chartData} />
      </div>
    </div>
  );
};

export default EmailReports;
