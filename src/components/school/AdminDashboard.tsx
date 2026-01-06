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
import { TrendingUp, Users, Award, Building2, Activity, Shield } from 'lucide-react';

const AdminDashboard = () => {
  // Data for charts
  const schoolTrendData = [
    { month: 'T1', schools: 20, students: 10000 },
    { month: 'T2', schools: 21, students: 10200 },
    { month: 'T3', schools: 22, students: 10500 },
    { month: 'T4', schools: 23, students: 10800 },
    { month: 'T5', schools: 24, students: 11000 },
    { month: 'T6', schools: 25, students: 12450 },
  ];

  const schoolTypeData = [
    { name: 'Tiểu học', value: 8, color: '#3b82f6' },
    { name: 'THCS', value: 10, color: '#10b981' },
    { name: 'THPT', value: 7, color: '#f59e0b' },
  ];

  const studentByTypeData = [
    { type: 'Tiểu học', students: 3200, teachers: 120 },
    { type: 'THCS', students: 4800, teachers: 180 },
    { type: 'THPT', students: 4450, teachers: 200 },
  ];

  const qualityTrendData = [
    { month: 'T1', rate: 65 },
    { month: 'T2', rate: 68 },
    { month: 'T3', rate: 70 },
    { month: 'T4', rate: 71 },
    { month: 'T5', rate: 71.5 },
    { month: 'T6', rate: 72 },
  ];

  const performanceData = [
    { school: 'THPT A', score: 8.5, students: 920 },
    { school: 'THCS B', score: 8.2, students: 680 },
    { school: 'TH C', score: 7.8, students: 450 },
    { school: 'THPT D', score: 8.0, students: 850 },
    { school: 'THCS E', score: 7.9, students: 720 },
  ];

  const stats = [
    { label: 'Tỷ lệ tăng trưởng', value: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Học sinh mới', value: '1,245', trend: 'up', icon: Users },
    { label: 'Trường đạt chuẩn', value: '18/25', trend: 'up', icon: Award },
    { label: 'Hoạt động hệ thống', value: '99.8%', trend: 'up', icon: Activity },
  ];

  return (
    <>
      <section className="school-project-section">
        <h2>Dashboard Tổng hợp</h2>
        <div className="school-project-dashboard">
          <div className="school-project-stat-card school-project-stat-card--primary">
            <div className="school-project-stat-icon">
              <Building2 size={24} />
            </div>
            <div className="school-project-stat-info">
              <h3>Tổng số trường</h3>
              <p className="school-project-stat-value">25</p>
              <p className="school-project-stat-change">+3 trường mới</p>
            </div>
          </div>
          <div className="school-project-stat-card school-project-stat-card--success">
            <div className="school-project-stat-icon">
              <Award size={24} />
            </div>
            <div className="school-project-stat-info">
              <h3>Trường đạt chuẩn</h3>
              <p className="school-project-stat-value">18</p>
              <p className="school-project-stat-change">72% tổng số</p>
            </div>
          </div>
          <div className="school-project-stat-card school-project-stat-card--warning">
            <div className="school-project-stat-icon">
              <Users size={24} />
            </div>
            <div className="school-project-stat-info">
              <h3>Tổng học sinh</h3>
              <p className="school-project-stat-value">12,450</p>
              <p className="school-project-stat-change">+5% so với năm trước</p>
            </div>
          </div>
          <div className="school-project-stat-card school-project-stat-card--info">
            <div className="school-project-stat-icon">
              <Shield size={24} />
            </div>
            <div className="school-project-stat-info">
              <h3>Tài khoản Admin</h3>
              <p className="school-project-stat-value">25</p>
              <p className="school-project-stat-change">Tất cả đang hoạt động</p>
            </div>
          </div>
        </div>
      </section>

      <section className="school-project-section">
        <h2>Thống kê & Phân tích</h2>
        <div className="admin-stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="admin-stat-mini-card">
                <div className="admin-stat-mini-icon">
                  <Icon size={20} />
                </div>
                <div className="admin-stat-mini-info">
                  <p className="admin-stat-mini-label">{stat.label}</p>
                  <p className="admin-stat-mini-value">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="school-project-section">
        <h2>Xu hướng Phát triển</h2>
        <div className="admin-chart-card">
          <ResponsiveContainer width="100%" height={300}>
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

      <div className="admin-charts-grid">
        <section className="school-project-section">
          <h2>Phân bố theo Loại trường</h2>
          <div className="admin-chart-card">
            <ResponsiveContainer width="100%" height={300}>
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
                  fill="#8884d8"
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

        <section className="school-project-section">
          <h2>So sánh Học sinh & Giáo viên</h2>
          <div className="admin-chart-card">
            <ResponsiveContainer width="100%" height={300}>
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

      <section className="school-project-section">
        <h2>Tỷ lệ Chất lượng theo Thời gian</h2>
        <div className="admin-chart-card">
          <ResponsiveContainer width="100%" height={300}>
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

      <section className="school-project-section">
        <h2>Top 5 Trường có Thành tích Tốt</h2>
        <div className="admin-chart-card">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="school" type="category" stroke="#6b7280" width={100} />
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

      <section className="school-project-section">
        <h2>Tổng quan Hệ thống</h2>
        <div className="admin-overview">
          <div className="admin-overview-card">
            <h4>Trường Tiểu học</h4>
            <p className="admin-overview-value">8 trường</p>
            <p className="admin-overview-detail">3,200 học sinh</p>
          </div>
          <div className="admin-overview-card">
            <h4>Trường THCS</h4>
            <p className="admin-overview-value">10 trường</p>
            <p className="admin-overview-detail">4,800 học sinh</p>
          </div>
          <div className="admin-overview-card">
            <h4>Trường THPT</h4>
            <p className="admin-overview-value">7 trường</p>
            <p className="admin-overview-detail">4,450 học sinh</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

