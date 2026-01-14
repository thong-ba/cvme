// Project Introduction Page
import { ArrowLeft, School, Users, BookOpen, Award, Shield, UserCheck, GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectIntroductionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 relative overflow-x-hidden">
      {/* Background gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-r from-blue-600 to-emerald-500 clip-path-polygon z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/90 text-sm mb-8 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:bg-white/25 hover:-translate-x-1"
        >
          <ArrowLeft size={20} />
          Về trang chủ
        </Link>

        <div className="text-center text-white">
          {/* Hero Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-full mb-6 border-[3px] border-white/30 animate-bounce">
            <School size={48} className="text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-500/40 animate-pulse">
              <Sparkles size={16} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-100 drop-shadow-lg">
            Hệ thống Quản lý Trường học
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Platform quản lý toàn diện với đầy đủ tính năng cho từng vai trò trong trường học
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-medium border border-white/50 shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl">
              <GraduationCap size={14} className="text-blue-600" />
              Quản lý học sinh
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-medium border border-white/50 shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl">
              <BookOpen size={14} className="text-blue-600" />
              Quản lý lớp học
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-medium border border-white/50 shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl">
              <Award size={14} className="text-blue-600" />
              Theo dõi thành tích
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        {/* Introduction Section */}
        <section className="mb-16 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-emerald-500 after:rounded">
            Giới thiệu dự án
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Hệ thống Quản lý Trường học là một platform quản lý toàn diện được thiết kế để hỗ trợ quản lý và vận hành
            trường học một cách hiệu quả. Hệ thống cung cấp các tính năng chuyên biệt cho từng vai trò trong trường
            học, từ quản trị viên đến học sinh.
          </p>
        </section>

        {/* Roles Section */}
        <section className="mb-16 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-emerald-500 after:rounded">
            Tính năng theo vai trò
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Admin Card */}
            <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-blue-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <Shield size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Quản trị
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Quản trị viên</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Administrators</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Kiểm tra và đánh giá chất lượng các trường hợp tác, quản lý hệ thống tổng thể.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Kiểm tra chất lượng trường hợp tác
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Quản lý hệ thống tổng thể
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Báo cáo và phân tích
                </li>
              </ul>
              <Link
                to="/school-project/administrators"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Headmaster Card */}
            <div className="group relative bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-amber-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <Award size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Lãnh đạo
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Hiệu trưởng</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Head Masters</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Xem và theo dõi thành tích của giáo viên và học sinh, báo cáo tổng hợp.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Theo dõi thành tích giáo viên
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Theo dõi thành tích học sinh
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Báo cáo tổng hợp
                </li>
              </ul>
              <Link
                to="/school-project/head-masters"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Teacher Card */}
            <div className="group relative bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-emerald-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <BookOpen size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Giảng dạy
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Giáo viên</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Teachers</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Quản lý lớp học, xem danh sách học sinh, nhập và quản lý điểm số.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Quản lý lớp học
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Xem danh sách học sinh
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Nhập và quản lý điểm số
                </li>
              </ul>
              <Link
                to="/school-project/teachers"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Parent Card */}
            <div className="group relative bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-pink-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <Users size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Phụ huynh
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Phụ huynh</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Parents</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Xem thông tin học tập của con em, theo dõi điểm số và lịch học.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Xem thông tin học tập
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Theo dõi điểm số
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Xem lịch học
                </li>
              </ul>
              <Link
                to="/school-project/parents"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Student Card */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-purple-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <GraduationCap size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Học sinh
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Học sinh</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Students</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Xem thành tích học tập, thời khóa biểu, điểm số và thông tin cá nhân.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Xem thành tích học tập
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Thời khóa biểu
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Điểm số và thông tin cá nhân
                </li>
              </ul>
              <Link
                to="/school-project/students"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Staff Card */}
            <div className="group relative bg-gradient-to-br from-white to-sky-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-sky-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                <UserCheck size={24} />
              </div>
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                Nhân viên
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Nhân viên</h3>
              <p className="text-sm text-slate-500 italic mb-4 font-medium">Staff Admins</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Quản lý thông tin nhân viên, hỗ trợ vận hành hệ thống.
              </p>
              <ul className="space-y-2 mb-6 list-none">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Quản lý thông tin nhân viên
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Hỗ trợ vận hành hệ thống
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  ✓ Quản lý tài liệu
                </li>
              </ul>
              <Link
                to="/school-project/staff-admins"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold px-6 py-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Khám phá ngay →
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-emerald-500 after:rounded">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              React
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              TypeScript
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Tailwind CSS
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              REST API
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Chart.js
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              React Router
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectIntroductionPage;
