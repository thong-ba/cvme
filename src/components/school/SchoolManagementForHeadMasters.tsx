// School Management Component for Head Masters
import { Building2, Users, MapPin, Mail, Phone, Calendar, Award, Edit } from 'lucide-react';
import { headMasterSchool } from '../../data';

const SchoolManagementForHeadMasters = () => {
  const school = headMasterSchool;

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* School Information Card */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-3 sm:p-4">
              <Building2 size={24} className="sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{school.name}</h2>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {school.type}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                    school.level === 'Đạt chuẩn'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {school.level}
                </span>
              </div>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors text-sm sm:text-base">
            <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Chỉnh sửa</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-600" size={20} />
              <p className="text-xs font-semibold text-blue-700">Học sinh</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{school.students.toLocaleString('vi-VN')}</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-emerald-600" size={20} />
              <p className="text-xs font-semibold text-emerald-700">Giáo viên</p>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{school.teachers}</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-purple-600" size={20} />
              <p className="text-xs font-semibold text-purple-700">Thành lập</p>
            </div>
            <p className="text-2xl font-bold text-purple-900">{school.establishedYear}</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-amber-600" size={20} />
              <p className="text-xs font-semibold text-amber-700">Hiệu trưởng</p>
            </div>
            <p className="text-sm font-bold text-amber-900">{school.principal}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-slate-200 pt-4 sm:pt-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thông tin liên hệ</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">Địa chỉ</p>
                <p className="text-sm text-slate-600">{school.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">Điện thoại</p>
                <p className="text-sm text-slate-600">{school.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">Email</p>
                <p className="text-sm text-slate-600">{school.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolManagementForHeadMasters;
