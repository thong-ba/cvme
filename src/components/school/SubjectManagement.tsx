// Subject Management Component for Teachers
import { BookOpen, Users, Award, Calendar } from 'lucide-react';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  email: 'nguyenvana@thpttranhungdao.edu.vn',
  classes: ['10A1', '10A2', '11A1'],
  students: 120,
  avgScore: 8.5,
};

const SubjectManagement = () => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Subject Info Card */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Thông tin môn học</span>
        </h2>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentTeacher.subject}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{currentTeacher.classes.length} lớp đang dạy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{currentTeacher.students} học sinh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span>Điểm TB: {currentTeacher.avgScore}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Teaching */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Lớp đang dạy môn {currentTeacher.subject}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentTeacher.classes.map((className, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">{className}</h3>
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                  {currentTeacher.subject}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Số học sinh:</span>
                  <span className="font-semibold text-slate-900">
                    {className === '10A1' ? 45 : className === '10A2' ? 44 : 43}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Điểm trung bình:</span>
                  <span className="font-semibold text-indigo-600">
                    {className === '10A1' ? 8.5 : className === '10A2' ? 8.3 : 8.6}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Details */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Chi tiết môn học</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 mb-1">Tên môn học</p>
              <p className="text-lg font-bold text-slate-900">{currentTeacher.subject}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 mb-1">Giáo viên phụ trách</p>
              <p className="text-lg font-bold text-slate-900">{currentTeacher.name}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 mb-1">Số lớp đang dạy</p>
              <p className="text-lg font-bold text-slate-900">{currentTeacher.classes.length} lớp</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 mb-1">Tổng số học sinh</p>
              <p className="text-lg font-bold text-slate-900">{currentTeacher.students} học sinh</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectManagement;
