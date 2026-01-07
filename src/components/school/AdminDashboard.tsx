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
import { Users, Award, Building2, Activity, Shield } from 'lucide-react';

const AdminDashboard = () => {
  // Data for charts
  const schoolTrendData = [
    { month: 'T1', schools: 12, students: 9300 },
    { month: 'T2', schools: 12, students: 9450 },
    { month: 'T3', schools: 13, students: 9700 },
    { month: 'T4', schools: 13, students: 10050 },
    { month: 'T5', schools: 14, students: 10400 },
    { month: 'T6', schools: 14, students: 10780 },
    { month: 'T7', schools: 15, students: 11120 },
    { month: 'T8', schools: 15, students: 11350 },
    { month: 'T9', schools: 15, students: 11680 },
    { month: 'T10', schools: 15, students: 11900 },
    { month: 'T11', schools: 15, students: 12050 },
    { month: 'T12', schools: 15, students: 12180 },
  ];

  const schoolTypeData = [
    { name: 'Tiểu học', value: 6, color: '#3b82f6' },
    { name: 'THCS', value: 5, color: '#10b981' },
    { name: 'THPT', value: 4, color: '#f59e0b' },
  ];

  const studentByTypeData = [
    { type: 'Tiểu học', students: 5200, teachers: 210 },
    { type: 'THCS', students: 7600, teachers: 280 },
    { type: 'THPT', students: 7400, teachers: 320 },
  ];

  const qualityTrendData = [
    { month: 'T1', rate: 65 },
    { month: 'T2', rate: 68 },
    { month: 'T3', rate: 70 },
    { month: 'T4', rate: 71 },
    { month: 'T5', rate: 71.5 },
    { month: 'T6', rate: 72 },
    { month: 'T7', rate: 73 },
    { month: 'T8', rate: 73.5 },
    { month: 'T9', rate: 74 },
    { month: 'T10', rate: 74.2 },
    { month: 'T11', rate: 74.4 },
    { month: 'T12', rate: 74.5 },
  ];

  const performanceData = [
    { school: 'THPT Phan Chu Trinh', score: 8.6, students: 980 },
    { school: 'THCS Lê Lợi', score: 8.2, students: 680 },
    { school: 'TH Tiểu học Nguyễn Du', score: 7.9, students: 450 },
    { school: 'THPT Lương Thế Vinh', score: 8.3, students: 1120 },
    { school: 'THCS Nguyễn Trãi', score: 8.0, students: 750 },
    { school: 'THPT Nguyễn Thị Minh Khai', score: 8.1, students: 1015 },
    { school: 'THCS Võ Thị Sáu', score: 7.8, students: 670 },
  ];

  const stats = [
    { label: 'Tổng số trường', value: '15', trend: 'up', icon: Building2 },
    { label: 'Học sinh mới', value: '1,520', trend: 'up', icon: Users },
    { label: 'Trường đạt chuẩn', value: '10/15', trend: 'up', icon: Award },
    { label: 'Hoạt động hệ thống', value: '99.8%', trend: 'up', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Dashboard tổng hợp</h2>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Cập nhật theo năm học 2025–2026
          </span>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 p-4 text-white shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-100">Tổng số trường</p>
                <p className="mt-1 text-2xl font-bold">15</p>
                <p className="mt-1 text-xs text-blue-100">+2 trường mới</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Building2 size={22} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">Trường đạt chuẩn</p>
                <p className="mt-1 text-2xl font-bold">10</p>
                <p className="mt-1 text-xs text-emerald-50">~67% tổng số</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Award size={22} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-amber-100">Tổng học sinh</p>
                <p className="mt-1 text-2xl font-bold">15,200</p>
                <p className="mt-1 text-xs text-amber-50">+4.8% so với năm trước</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Users size={22} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 p-4 text-white shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-violet-100">Tài khoản Admin</p>
                <p className="mt-1 text-2xl font-bold">25</p>
                <p className="mt-1 text-xs text-violet-50">Tất cả đang hoạt động</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Shield size={22} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini stats */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Thống kê & phân tích</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tổng quan nhanh các chỉ số chính giúp theo dõi sức khỏe toàn hệ thống trường.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 shadow-sm hover:border-blue-200 hover:bg-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
                  <p className="text-base font-semibold text-slate-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trend line chart */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Xu hướng phát triển</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tăng trưởng số trường và học sinh theo từng tháng trong năm học hiện tại.
        </p>
        <div className="mt-4 h-[320px]">
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
          <div className="mt-4 h-[280px]">
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
          <div className="mt-4 h-[280px]">
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
        <div className="mt-4 h-[300px]">
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
        <div className="mt-4 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="school" type="category" stroke="#6b7280" width={120} />
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
            <p className="mt-1 text-2xl font-bold text-blue-600">8 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 3,200 học sinh</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center">
            <h4 className="text-sm font-medium text-slate-700">Trường THCS</h4>
            <p className="mt-1 text-2xl font-bold text-emerald-600">10 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 4,800 học sinh</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-center">
            <h4 className="text-sm font-medium text-slate-700">Trường THPT</h4>
            <p className="mt-1 text-2xl font-bold text-amber-600">7 trường</p>
            <p className="mt-1 text-xs text-slate-600">≈ 4,450 học sinh</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

