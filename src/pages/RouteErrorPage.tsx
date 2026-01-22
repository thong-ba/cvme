import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const RouteErrorPage = () => {
  const error = useRouteError();

  let title = 'Có lỗi xảy ra';
  let description = 'Hệ thống gặp sự cố khi tải trang. Vui lòng thử lại.';
  let details: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = `Lỗi ${error.status}`;
    description = error.statusText || description;
    if (typeof error.data === 'string') details = error.data;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-amber-700" size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Route Error</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">{description}</p>
              {details && (
                <pre className="mt-4 whitespace-pre-wrap break-words text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  {details}
                </pre>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/school-project"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <Home size={18} />
              Về trang dự án
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorPage;

