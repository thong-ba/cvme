import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RevenueByDay } from '../../../types/ecommerce';
import { formatCurrency, formatDate } from '../../../utils';

interface SellerRevenueChartProps {
  data: RevenueByDay[];
}

export default function SellerRevenueChart({ data }: SellerRevenueChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateShort: formatDate(d.date).replace(/\/\d{4}$/, ''), // dd/mm
    revenueLabel: formatCurrency(d.revenue),
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Doanh thu theo ngày</h3>
      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="dateShort" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" tickFormatter={(v) => `${v / 1e6}M`} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
              labelFormatter={(_, payload) => payload[0]?.payload && formatDate(payload[0].payload.date)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Doanh thu" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
