import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useStoreAuth } from '../../../contexts/StoreAuthContext';
import { toastSuccess, toastError } from '../../../utils/toast';

const StoreLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/ecommerce/store';
  const { login } = useStoreAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { identifier: string; password: string; remember?: boolean }) => {
    setLoading(true);
    try {
      const result = await login(values.identifier.trim(), values.password, values.remember);
      if (result.success) {
        toastSuccess('Đăng nhập thành công!');
        navigate(returnUrl, { replace: true });
      } else {
        toastError(result.message ?? 'Đăng nhập thất bại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
          {/* Header form */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-6 text-center">
            <Link
              to="/ecommerce/store"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4"
            >
              <ArrowLeft size={18} />
              Về trang chủ
            </Link>
            <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-2">
              <LogIn size={28} />
            </div>
            <h1 className="text-xl font-bold text-white">Đăng nhập</h1>
            <p className="text-white/90 text-sm mt-1">
              Chào bạn, đăng nhập để mua sắm thuận tiện hơn
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              initialValues={{ remember: true }}
              className="store-auth-form"
            >
              <Form.Item
                name="identifier"
                label="Email hoặc Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập email hoặc số điện thoại' },
                  { whitespace: true, message: 'Không được để trống' },
                ]}
              >
                <Input
                  prefix={<Mail className="text-slate-400" size={18} />}
                  placeholder="Nhập email hoặc SĐT"
                  size="large"
                  className="rounded-lg"
                  autoComplete="username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
                ]}
              >
                <Input.Password
                  prefix={<Lock className="text-slate-400" size={18} />}
                  placeholder="Nhập mật khẩu"
                  size="large"
                  className="rounded-lg"
                  autoComplete="current-password"
                />
              </Form.Item>

              <div className="flex items-center justify-between gap-2 mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <Link
                  to="/ecommerce/store/forgot-password"
                  className="text-sm text-violet-600 hover:text-violet-700"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item className="mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  className="h-12 rounded-lg font-semibold bg-violet-600 hover:bg-violet-700 border-0"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <div className="relative my-6">
              <span className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </span>
              <span className="relative flex justify-center text-xs text-slate-500 bg-white px-2">
                Hoặc đăng nhập với
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            <p className="text-center text-slate-600 text-sm mt-6">
              Bạn chưa có tài khoản?{' '}
              <Link to="/ecommerce/store/register" className="font-semibold text-violet-600 hover:text-violet-700">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Demo: đăng nhập với <strong>demo@shop.demo</strong> / <strong>123456</strong> hoặc dùng tài khoản đã đăng ký.
        </p>
      </div>
    </div>
  );
};

export default StoreLoginPage;
