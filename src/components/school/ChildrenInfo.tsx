// Children Info Component for Parents
import { Users, BookOpen, Award, FileText, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { headMasterSchoolStudents } from '../../data';
import StudentDetailModal from './StudentDetailModal';
import { useState } from 'react';

// Mock data - Giả sử phụ huynh đang đăng nhập có con là học sinh đầu tiên
const currentParent = {
  id: 1,
  name: 'Nguyễn Văn Phụ Huynh',
  children: [1], // ID của học sinh
};

const ChildrenInfo = () => {
  const [selectedChild, setSelectedChild] = useState<typeof headMasterSchoolStudents[0] | null>(null);

  // Lấy thông tin con
  const children = headMasterSchoolStudents.filter((student) => currentParent.children.includes(student.id));

  const getAvatarUrl = (name: string, avatar?: string) => {
    if (avatar) return avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=ec4899&color=fff&bold=true`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Children List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Users size={18} className="sm:w-5 sm:h-5 text-pink-600" />
          <span>Danh sách con em</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <div
              key={child.id}
              className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-5 transition-all duration-300 hover:border-pink-300 hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedChild(child)}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={getAvatarUrl(child.name, child.avatar)}
                  alt={child.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getAvatarUrl(child.name);
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{child.name}</h3>
                  <p className="text-sm text-slate-600">{child.studentId}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <BookOpen size={14} />
                    Lớp:
                  </span>
                  <span className="font-semibold text-slate-900">{child.class}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Award size={14} />
                    Điểm TB:
                  </span>
                  <span className="font-semibold text-pink-600">{child.avgScore}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <FileText size={14} />
                    Xếp hạng:
                  </span>
                  <span className="font-semibold text-slate-900">
                    {child.rank}/{child.totalStudents}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Info */}
      {children.length > 0 && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thông tin chi tiết</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <div key={child.id} className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{child.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FileText className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Mã học sinh</p>
                      <p className="text-sm font-bold text-slate-900">{child.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Lớp học</p>
                      <p className="text-sm font-bold text-slate-900">{child.class}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Email</p>
                      <p className="text-sm font-bold text-slate-900">{child.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Số điện thoại</p>
                      <p className="text-sm font-bold text-slate-900">{child.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Địa chỉ</p>
                      <p className="text-sm font-bold text-slate-900">{child.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-pink-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Ngày sinh</p>
                      <p className="text-sm font-bold text-slate-900">
                        {new Date(child.dateOfBirth).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Student Detail Modal */}
      {selectedChild && <StudentDetailModal student={selectedChild} onClose={() => setSelectedChild(null)} />}
    </div>
  );
};

export default ChildrenInfo;
