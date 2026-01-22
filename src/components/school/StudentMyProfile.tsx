// Student My Profile Component
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, FileText } from 'lucide-react';
import { headMasterSchoolStudents } from '../../data';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

const StudentMyProfile = () => {
  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  if (!student) return null;

  const getAvatarUrl = (name: string, avatar?: string) => {
    if (avatar) return avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=8b5cf6&color=fff&bold=true`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Profile Header */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <img
            src={getAvatarUrl(student.name, student.avatar)}
            alt={student.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getAvatarUrl(student.name);
            }}
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{student.name}</h2>
            <p className="text-sm sm:text-base text-slate-600 mb-4">{student.studentId}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                {student.class}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                  student.avgScore >= 8.5
                    ? 'bg-emerald-100 text-emerald-800'
                    : student.avgScore >= 7.0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                ĐTB: {student.avgScore}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <User size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thông tin cá nhân</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <FileText className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Mã học sinh</p>
              <p className="text-sm font-bold text-slate-900">{student.studentId}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <BookOpen className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Lớp học</p>
              <p className="text-sm font-bold text-slate-900">{student.class}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Mail className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Email</p>
              <p className="text-sm font-bold text-slate-900">{student.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Phone className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Số điện thoại</p>
              <p className="text-sm font-bold text-slate-900">{student.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg md:col-span-2">
            <MapPin className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Địa chỉ</p>
              <p className="text-sm font-bold text-slate-900">{student.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Calendar className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Ngày sinh</p>
              <p className="text-sm font-bold text-slate-900">
                {new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Calendar className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1">Ngày nhập học</p>
              <p className="text-sm font-bold text-slate-900">
                {new Date(student.joinDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Information */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Award size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thông tin học tập</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Điểm TB</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{student.avgScore}</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Xếp hạng lớp</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {student.rank}/{student.totalStudents}
            </p>
          </div>
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Xếp hạng khối</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">
              {student.rankInGrade}/{student.totalStudentsInGrade}
            </p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-amber-700 mb-1">Xếp hạng trường</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">
              {student.rankInSchool}/{student.totalStudentsInSchool}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentMyProfile;
