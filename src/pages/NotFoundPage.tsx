import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-fuchsia-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <SearchX className="text-indigo-700" size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">404 Not Found</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">Không tìm thấy trang</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
              </p>
              <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3">
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">URL:</span> {location.pathname}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/school-project"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              <Home size={18} />
              Về trang dự án
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại
            </button>
          </div>
        </div>
        <div className="px-6 sm:px-10 py-4 bg-gradient-to-r from-indigo-50 to-fuchsia-50 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Gợi ý: Nếu bạn nhấn từ “Xem chi tiết” trong Thông báo, hãy thử quay lại và bấm lại hoặc mở tab tương ứng trong menu bên trái.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

