import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';

const StoreForgotPasswordPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-lg p-8 text-center">
        <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 mb-4">
          <KeyRound size={32} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Quên mật khẩu</h1>
        <p className="text-slate-600 text-sm mb-6">
          Trang khôi phục mật khẩu sẽ được triển khai tại đây (nhập email/SĐT, gửi link đặt lại mật khẩu).
        </p>
        <Link
          to="/ecommerce/store/login"
          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
        >
          <ArrowLeft size={18} />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default StoreForgotPasswordPage;
