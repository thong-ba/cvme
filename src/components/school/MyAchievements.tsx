// My Achievements Component for Students
import { Award, Trophy, Star, Calendar } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Học sinh giỏi học kỳ I',
    date: '12/2024',
    type: 'excellent',
    level: 'Trường',
    description: 'Đạt danh hiệu học sinh giỏi học kỳ I năm học 2024-2025',
  },
  {
    id: 2,
    title: 'Giải nhất môn Toán cấp trường',
    date: '11/2024',
    type: 'award',
    level: 'Trường',
    description: 'Đạt giải nhất trong kỳ thi học sinh giỏi môn Toán cấp trường',
  },
  {
    id: 3,
    title: 'Tham gia đội tuyển học sinh giỏi',
    date: '10/2024',
    type: 'participation',
    level: 'Thành phố',
    description: 'Được chọn vào đội tuyển học sinh giỏi môn Toán cấp thành phố',
  },
  {
    id: 4,
    title: 'Học sinh xuất sắc tháng 9',
    date: '09/2024',
    type: 'excellent',
    level: 'Trường',
    description: 'Đạt danh hiệu học sinh xuất sắc tháng 9 năm học 2024-2025',
  },
];

const MyAchievements = () => {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'excellent':
        return <Trophy className="text-emerald-600" size={24} />;
      case 'award':
        return <Award className="text-amber-600" size={24} />;
      default:
        return <Star className="text-blue-600" size={24} />;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'excellent':
        return 'bg-emerald-100 text-emerald-600';
      case 'award':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Award size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê thành tích</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{achievements.length}</p>
            <p className="text-xs text-purple-700 mt-1">thành tích</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Xuất sắc</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {achievements.filter((a) => a.type === 'excellent').length}
            </p>
            <p className="text-xs text-emerald-700 mt-1">thành tích</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Giải thưởng</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">
              {achievements.filter((a) => a.type === 'award').length}
            </p>
            <p className="text-xs text-amber-700 mt-1">thành tích</p>
          </div>
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tham gia</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">
              {achievements.filter((a) => a.type === 'participation').length}
            </p>
            <p className="text-xs text-blue-700 mt-1">thành tích</p>
          </div>
        </div>
      </section>

      {/* Achievements List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Trophy size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Danh sách thành tích</span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center ${getAchievementColor(achievement.type)}`}>
                {getAchievementIcon(achievement.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">{achievement.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 whitespace-nowrap">
                    {achievement.level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">{achievement.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={12} />
                  <span>{achievement.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyAchievements;
