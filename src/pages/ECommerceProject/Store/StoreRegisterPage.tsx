import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserPlus, User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
import { useStoreAuth } from '../../../contexts/StoreAuthContext';
import { toastSuccess, toastError } from '../../../utils/toast';

const StoreRegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useStoreAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  }) => {
    setLoading(true);
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      if (result.success) {
        toastSuccess('Đăng ký thành công! Bạn đã được đăng nhập.');
        navigate('/ecommerce/store', { replace: true });
      } else {
        toastError(result.message ?? 'Đăng ký thất bại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-6 text-center">
            <Link
              to="/ecommerce/store"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4"
            >
              <ArrowLeft size={18} />
              Về trang chủ
            </Link>
            <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-2">
              <UserPlus size={28} />
            </div>
            <h1 className="text-xl font-bold text-white">Đăng ký tài khoản</h1>
            <p className="text-white/90 text-sm mt-1">
              Tạo tài khoản để mua sắm nhanh hơn và nhận ưu đãi
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              className="store-auth-form"
            >
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên' },
                  { min: 2, message: 'Họ tên tối thiểu 2 ký tự' },
                  { whitespace: true, message: 'Không được để trống' },
                ]}
              >
                <Input
                  prefix={<User className="text-slate-400" size={18} />}
                  placeholder="Nguyễn Văn A"
                  size="large"
                  className="rounded-lg"
                  autoComplete="name"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' },
                  { whitespace: true, message: 'Không được để trống' },
                ]}
              >
                <Input
                  prefix={<Mail className="text-slate-400" size={18} />}
                  placeholder="email@example.com"
                  size="large"
                  className="rounded-lg"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /^[0-9]{10,11}$/, message: 'SĐT 10–11 chữ số' },
                ]}
              >
                <Input
                  prefix={<Phone className="text-slate-400" size={18} />}
                  placeholder="0901234567"
                  size="large"
                  className="rounded-lg"
                  autoComplete="tel"
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
                  placeholder="Tối thiểu 6 ký tự"
                  size="large"
                  className="rounded-lg"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<Lock className="text-slate-400" size={18} />}
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  className="rounded-lg"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                name="agreeTerms"
                valuePropName="checked"
                rules={[
                  {
                    validator(_, value) {
                      if (value) return Promise.resolve();
                      return Promise.reject(new Error('Bạn cần đồng ý với Điều khoản & Chính sách'));
                    },
                  },
                ]}
              >
                <Checkbox>
                  Tôi đồng ý với{' '}
                  <Link to="/ecommerce/store" className="text-violet-600 hover:text-violet-700">
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link to="/ecommerce/store" className="text-violet-600 hover:text-violet-700">
                    Chính sách bảo mật
                  </Link>
                </Checkbox>
              </Form.Item>

              <Form.Item className="mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  className="h-12 rounded-lg font-semibold bg-violet-600 hover:bg-violet-700 border-0"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>

            <p className="text-center text-slate-600 text-sm">
              Bạn đã có tài khoản?{' '}
              <Link to="/ecommerce/store/login" className="font-semibold text-violet-600 hover:text-violet-700">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRegisterPage;
