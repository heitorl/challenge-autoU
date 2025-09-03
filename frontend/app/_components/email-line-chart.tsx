import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface EmailHistory {
  date: string;
  total: number;
  productive: number;
  unproductive: number;
}

interface EmailLineChartProps {
  data: EmailHistory[];
}

export const EmailLineChart = ({ data }: EmailLineChartProps) => {
  return (
    <Card className="w-full h-96 px-4 py-10">
      <CardHeader>
        <CardTitle>Relatório de Emails</CardTitle>
        <CardDescription>Estatísticas de emails classificados</CardDescription>
      </CardHeader>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="productive"
            name="Produtivo"
            stroke="#4f46e5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="unproductive"
            name="Improdutivo"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
