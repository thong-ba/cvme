// Admin Dashboard Component with Charts and Analytics
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users, Award, Building2, Activity, TrendingUp, TrendingDown, Minus, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import {
  previousMonthData,
  schoolTrendData,
  schoolTypeData,
  studentByTypeData,
  qualityTrendData,
  performanceData,
} from '../../data';

// KPI Card Component with Sparkline and Status
interface KpiCardProps {
  title: string;
  value: string;
  change: number; // Percentage change
  changeLabel: string; // e.g., "so với tháng trước"
  sparklineData: number[]; // Array of values for sparkline
  icon: LucideIcon;
  status: 'good' | 'warning' | 'critical'; // Status for badge
  gradientFrom: string;
  gradientTo: string;
}

const KpiCard = ({
  title,
  value,
  change,
  changeLabel,
  sparklineData,
  icon: Icon,
  status,
  gradientFrom,
  gradientTo,
}: KpiCardProps) => {
  const statusConfig = useMemo(() => {
    switch (status) {
      case 'good':
        return {
          badge: 'TỐT',
          badgeColor: 'bg-emerald-500 text-white border-emerald-600',
          iconColor: 'text-emerald-600',
        };
      case 'warning':
        return {
          badge: 'CẢNH BÁO',
          badgeColor: 'bg-amber-500 text-white border-amber-600',
          iconColor: 'text-amber-600',
        };
      case 'critical':
        return {
          badge: 'CẦN CHÚ Ý',
          badgeColor: 'bg-red-500 text-white border-red-600',
          iconColor: 'text-red-600',
        };
      default:
        return {
          badge: 'TỐT',
          badgeColor: 'bg-emerald-500 text-white border-emerald-600',
          iconColor: 'text-emerald-600',
        };
    }
  }, [status]);

  const trendIcon = useMemo(() => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  }, [change]);

  const TrendIcon = trendIcon;
  const isPositive = change > 0;
  const changeColor = isPositive ? 'text-emerald-100' : change < 0 ? 'text-red-100' : 'text-slate-100';

  // Calculate sparkline path
  const maxValue = Math.max(...sparklineData);
  const minValue = Math.min(...sparklineData);
  const range = maxValue - minValue || 1;
  const padding = 10; // 10% padding top and bottom

  const sparklinePoints = sparklineData.map((val, index) => {
    const x = sparklineData.length > 1 ? (index / (sparklineData.length - 1)) * 100 : 50;
    const normalizedY = range > 0 ? ((val - minValue) / range) : 0.5;
    const y = padding + normalizedY * (100 - padding * 2);
    return `${x},${y}`;
  });

  const sparklinePath = sparklinePoints.length > 0 ? `M ${sparklinePoints.join(' L ')}` : '';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r p-5 text-white shadow-lg transition-all duration-300 hover:shadow-xl" style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}>
      {/* Icon ở góc phải trên - rounded square */}
      <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm z-0">
        <Icon size={24} className="text-white" />
      </div>

      {/* Status Badge - trên icon, hơi lệch trái */}
      <div className="absolute top-2 right-10 z-20">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${statusConfig.badgeColor}`}>
          {status === 'good' && <Check size={10} />}
          {statusConfig.badge}
        </span>
      </div>

      <div className="flex flex-col gap-3 pr-16">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide opacity-90">{title}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 ${changeColor}`}>
            <TrendIcon size={14} className={isPositive ? 'text-emerald-200' : change < 0 ? 'text-red-200' : 'text-slate-200'} />
            <span className="text-xs font-semibold">
              {isPositive ? '+' : ''}
              {change.toFixed(1)}% {changeLabel}
            </span>
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="h-[40px] w-full opacity-80">
          {sparklinePath && (
            <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`sparkline-gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d={`${sparklinePath} L 100,100 L 0,100 Z`}
                fill={`url(#sparkline-gradient-${title.replace(/\s+/g, '-')})`}
                opacity="0.4"
              />
              {/* Line */}
              <path
                d={sparklinePath}
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {

  // KPI Cards Data with sparkline and status
  const kpiCards = useMemo(
    () => {
      // Tính toán % thay đổi so với tháng trước
      const totalSchoolsChange = ((45 - previousMonthData.totalSchools) / previousMonthData.totalSchools) * 100;
      const standardSchoolsChange = ((38 - previousMonthData.standardSchools) / previousMonthData.standardSchools) * 100;
      const totalStudentsChange = ((32190 - previousMonthData.totalStudents) / previousMonthData.totalStudents) * 100;
      const systemActivityChange = ((99.8 - previousMonthData.systemActivity) / previousMonthData.systemActivity) * 100;

      return [
        {
          title: 'Tổng số trường',
          value: '45',
          change: totalSchoolsChange, // Tính toán từ dữ liệu tháng trước (T11)
          changeLabel: 'so với tháng trước',
          sparklineData: [12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 35, 45], // T1-T12 (12 tháng)
          icon: Building2,
          status: 'good' as const,
          gradientFrom: '#2563eb', // blue-600
          gradientTo: '#4f46e5', // indigo-600
        },
        {
          title: 'Trường đạt chuẩn',
          value: '38/45',
          change: standardSchoolsChange, // Tính toán từ dữ liệu tháng trước (T11)
          changeLabel: 'so với tháng trước',
          sparklineData: [8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 28, 38], // T1-T12 (12 tháng)
          icon: Award,
          status: 'good' as const,
          gradientFrom: '#10b981', // emerald-500
          gradientTo: '#14b8a6', // teal-500
        },
        {
          title: 'Tổng học sinh',
          value: '32,090',
          change: totalStudentsChange, // Tính toán từ dữ liệu tháng trước (T11)
          changeLabel: 'so với tháng trước',
          sparklineData: [9300, 9450, 9700, 10050, 10400, 10780, 11120, 11350, 11680, 11900, 14200, 32190], // T1-T12 (12 tháng)
          icon: Users,
          status: 'good' as const,
          gradientFrom: '#f59e0b', // amber-500
          gradientTo: '#f97316', // orange-500
        },
      {
        title: 'Hoạt động hệ thống',
        value: '99.8%',
        change: systemActivityChange, // Tính toán từ dữ liệu tháng trước (T11)
        changeLabel: 'so với tháng trước',
        sparklineData: [99.9, 99.9, 99.8, 99.8, 99.9, 99.8, 99.8, 99.8, 99.8, 99.8, 99.9, 99.8], // T1-T12 (12 tháng)
        icon: Activity,
        status: 'warning' as const, // Slight decrease
        gradientFrom: '#8b5cf6', // violet-500
        gradientTo: '#6366f1', // indigo-500
      },
    ];
    },
    [previousMonthData]
  );

  return (
    <div className="space-y-6">
      {/* KPI Insight Cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Dashboard tổng hợp</h2>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Cập nhật theo năm học 2024–2025
          </span>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((kpi, index) => (
            <KpiCard key={index} {...kpi} />
          ))}
        </div>
      </section>

      {/* Trend line chart */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Xu hướng phát triển</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tăng trưởng số trường và học sinh theo từng tháng trong năm học hiện tại.
        </p>
        <div className="mt-4 h-[250px] sm:h-[280px] md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={schoolTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="schools"
                stroke="#2563eb"
                strokeWidth={3}
                name="Số trường"
                dot={{ fill: '#2563eb', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#10b981"
                strokeWidth={3}
                name="Số học sinh"
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Pie + Bar charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Phân bố theo loại trường</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tỷ lệ số trường theo từng cấp học giúp cân đối nguồn lực và chính sách.
          </p>
          <div className="mt-4 h-[220px] sm:h-[250px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: { name?: string; percent?: number }) => {
                    const { name = '', percent = 0 } = props;
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  dataKey="value"
                >
                  {schoolTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">So sánh Học sinh & Giáo viên</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tương quan quy mô học sinh và đội ngũ giáo viên theo từng cấp học.
          </p>
          <div className="mt-4 h-[220px] sm:h-[250px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentByTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="type" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="students" fill="#3b82f6" name="Học sinh" radius={[8, 8, 0, 0]} />
                <Bar dataKey="teachers" fill="#10b981" name="Giáo viên" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Quality area chart */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Tỷ lệ chất lượng theo thời gian</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tỷ lệ trường đạt chuẩn chất lượng giáo dục, theo dõi xu hướng cải thiện qua từng tháng.
        </p>
        <div className="mt-4 h-[240px] sm:h-[270px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={qualityTrendData}>
              <defs>
                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorQuality)"
                name="Tỷ lệ đạt chuẩn (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Performance ranking */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Top trường có thành tích tốt</h2>
        <p className="mt-1 text-sm text-slate-500">
          So sánh điểm đánh giá và quy mô học sinh cho các trường nổi bật trong hệ thống.
        </p>
        <div className="mt-4 h-[250px] sm:h-[280px] md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="school" type="category" stroke="#6b7280" width={80} className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="score" fill="#8b5cf6" name="Điểm đánh giá" radius={[0, 8, 8, 0]} />
              <Bar dataKey="students" fill="#f59e0b" name="Số học sinh" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Overview cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Tổng quan hệ thống</h2>
        <p className="mt-1 text-sm text-slate-500">
          Số lượng trường và học sinh theo từng cấp, phục vụ quy hoạch và phân bổ nguồn lực.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-center">
            <h4 className="text-sm font-medium text-slate-700">Trường Tiểu học</h4>
            <p className="mt-1 text-2xl font-bold text-blue-600">16 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 6,820 học sinh</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center">
            <h4 className="text-sm font-medium text-slate-700">Trường THCS</h4>
            <p className="mt-1 text-2xl font-bold text-emerald-600">15 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 10,850 học sinh</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-center">
            <h4 className="text-sm font-medium text-slate-700">Trường THPT</h4>
            <p className="mt-1 text-2xl font-bold text-amber-600">14 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 14,420 học sinh</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

