// Achievements Management Component
import { useState, useMemo } from 'react';
import { Award, Search, Trophy, Medal, Calendar, GraduationCap, Users } from 'lucide-react';
import { Pagination } from 'antd';

interface Achievement {
  id: number;
  type: 'student' | 'teacher' | 'class';
  name: string;
  achievement: string;
  level: 'school' | 'district' | 'city' | 'province' | 'national';
  date: string;
  description: string;
  class?: string;
  subject?: string;
}

// Mock achievements data
const achievementsData: Achievement[] = [
  {
    id: 1,
    type: 'student',
    name: 'Trần Thị Lan',
    achievement: 'Học sinh giỏi cấp thành phố',
    level: 'city',
    date: '2024-12-15',
    description: 'Đạt giải nhất kỳ thi học sinh giỏi môn Toán cấp thành phố',
    class: '12A1',
  },
  {
    id: 2,
    type: 'student',
    name: 'Nguyễn Văn Hùng',
    achievement: 'Học sinh giỏi cấp quận',
    level: 'district',
    date: '2024-11-20',
    description: 'Đạt giải nhì kỳ thi học sinh giỏi môn Lý cấp quận',
    class: '12A1',
  },
  {
    id: 3,
    type: 'teacher',
    name: 'Lê Văn C',
    achievement: 'Giáo viên dạy giỏi cấp thành phố',
    level: 'city',
    date: '2024-10-10',
    description: 'Đạt danh hiệu giáo viên dạy giỏi môn Anh cấp thành phố',
    subject: 'Anh',
  },
  {
    id: 4,
    type: 'student',
    name: 'Phạm Thị Dung',
    achievement: 'Học sinh giỏi học kỳ I',
    level: 'school',
    date: '2024-12-01',
    description: 'Đạt danh hiệu học sinh giỏi học kỳ I năm học 2024-2025',
    class: '10A2',
  },
  {
    id: 5,
    type: 'teacher',
    name: 'Nguyễn Văn A',
    achievement: 'Giáo viên chủ nhiệm giỏi',
    level: 'school',
    date: '2024-11-15',
    description: 'Lớp 10A1 đạt danh hiệu lớp tiên tiến xuất sắc',
    subject: 'Toán',
  },
  {
    id: 6,
    type: 'class',
    name: '12A1',
    achievement: 'Lớp tiên tiến xuất sắc',
    level: 'school',
    date: '2024-12-01',
    description: 'Lớp đạt danh hiệu tiên tiến xuất sắc học kỳ I',
  },
  {
    id: 7,
    type: 'student',
    name: 'Võ Thị Phương',
    achievement: 'Học sinh giỏi cấp quận',
    level: 'district',
    date: '2024-11-25',
    description: 'Đạt giải ba kỳ thi học sinh giỏi môn Hóa cấp quận',
    class: '11A1',
  },
  {
    id: 8,
    type: 'teacher',
    name: 'Hoàng Văn E',
    achievement: 'Giáo viên dạy giỏi cấp quận',
    level: 'district',
    date: '2024-10-20',
    description: 'Đạt danh hiệu giáo viên dạy giỏi môn Hóa cấp quận',
    subject: 'Hóa',
  },
  {
    id: 9,
    type: 'student',
    name: 'Lê Văn Cường',
    achievement: 'Học sinh giỏi học kỳ I',
    level: 'school',
    date: '2024-12-01',
    description: 'Đạt danh hiệu học sinh giỏi học kỳ I năm học 2024-2025',
    class: '10A2',
  },
  {
    id: 10,
    type: 'class',
    name: '11A1',
    achievement: 'Lớp tiên tiến',
    level: 'school',
    date: '2024-12-01',
    description: 'Lớp đạt danh hiệu tiên tiến học kỳ I',
  },
];

const AchievementsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const levels = [
    { value: 'all', label: 'Tất cả cấp độ' },
    { value: 'school', label: 'Cấp trường' },
    { value: 'district', label: 'Cấp quận/huyện' },
    { value: 'city', label: 'Cấp thành phố' },
    { value: 'province', label: 'Cấp tỉnh' },
    { value: 'national', label: 'Cấp quốc gia' },
  ];

  const types = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'student', label: 'Học sinh' },
    { value: 'teacher', label: 'Giáo viên' },
    { value: 'class', label: 'Lớp học' },
  ];

  const filteredAchievements = useMemo(() => {
    let result = [...achievementsData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.achievement.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.class?.toLowerCase().includes(query) ||
          item.subject?.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((item) => item.type === typeFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      result = result.filter((item) => item.level === levelFilter);
    }

    return result;
  }, [searchQuery, typeFilter, levelFilter]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAchievements = filteredAchievements.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, levelFilter]);

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      school: 'bg-blue-100 text-blue-800 border-blue-200',
      district: 'bg-green-100 text-green-800 border-green-200',
      city: 'bg-purple-100 text-purple-800 border-purple-200',
      province: 'bg-orange-100 text-orange-800 border-orange-200',
      national: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      school: 'Cấp trường',
      district: 'Cấp quận/huyện',
      city: 'Cấp thành phố',
      province: 'Cấp tỉnh',
      national: 'Cấp quốc gia',
    };
    return labels[level] || level;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student':
        return <GraduationCap size={18} className="text-indigo-600" />;
      case 'teacher':
        return <Users size={18} className="text-emerald-600" />;
      case 'class':
        return <Award size={18} className="text-amber-600" />;
      default:
        return <Award size={18} />;
    }
  };

  const stats = {
    total: achievementsData.length,
    students: achievementsData.filter((a) => a.type === 'student').length,
    teachers: achievementsData.filter((a) => a.type === 'teacher').length,
    classes: achievementsData.filter((a) => a.type === 'class').length,
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng thành tích</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Trophy className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Học sinh</p>
              <p className="text-2xl font-bold text-slate-900">{stats.students}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <GraduationCap className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Giáo viên</p>
              <p className="text-2xl font-bold text-slate-900">{stats.teachers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Lớp học</p>
              <p className="text-2xl font-bold text-slate-900">{stats.classes}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Award className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center mb-4">
          <div className="relative flex-1 w-full sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm (tên, thành tích, mô tả)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Hiển thị <span className="font-semibold text-slate-800">{filteredAchievements.length}</span> thành tích
            {filteredAchievements.length !== achievementsData.length && (
              <span className="ml-2 text-slate-500">(tổng: {achievementsData.length})</span>
            )}
          </span>
          {(searchQuery || typeFilter !== 'all' || levelFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setLevelFilter('all');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </section>

      {/* Achievements Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Tên
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Thành tích
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Cấp độ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Ngày
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Mô tả
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedAchievements.length > 0 ? (
                    paginatedAchievements.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <span className="capitalize">
                              {item.type === 'student' ? 'Học sinh' : item.type === 'teacher' ? 'Giáo viên' : 'Lớp học'}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">
                          {item.name}
                          {item.class && <span className="ml-2 text-slate-500">({item.class})</span>}
                          {item.subject && <span className="ml-2 text-slate-500">- {item.subject}</span>}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Medal size={16} className="text-amber-500" />
                            <span className="font-medium">{item.achievement}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getLevelColor(
                              item.level
                            )}`}
                          >
                            {getLevelLabel(item.level)}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(item.date).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">
                          <p className="max-w-md truncate" title={item.description}>
                            {item.description}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Không tìm thấy thành tích nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredAchievements.length > itemsPerPage && (
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              current={currentPage}
              total={filteredAchievements.length}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} thành tích`}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default AchievementsManagement;
