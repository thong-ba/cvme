import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, Award, Headphones, FileText, Lock, RefreshCw, Scale, Mail, Phone, MapPin } from 'lucide-react';

const policies = [
  {
    title: 'Chính sách bảo mật',
    description: 'Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.',
    href: '/ecommerce/store/privacy',
    icon: Lock,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Chính sách đổi trả',
    description: 'Điều kiện và quy trình đổi trả trong 7 ngày, bảo hành chính hãng.',
    href: '/ecommerce/store/return-policy',
    icon: RefreshCw,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Điều khoản sử dụng',
    description: 'Quy định sử dụng website, tài khoản và giao dịch.',
    href: '/ecommerce/store/terms',
    icon: Scale,
    color: 'bg-violet-50 text-violet-600',
  },
];

const values = [
  { icon: Shield, title: 'Uy tín', desc: 'Sản phẩm chính hãng, nguồn gốc rõ ràng' },
  { icon: Award, title: 'Chất lượng', desc: 'Cam kết chất lượng và bảo hành 1–2 năm' },
  { icon: Truck, title: 'Giao hàng nhanh', desc: 'Miễn phí ship đơn từ 500K, giao toàn quốc' },
  { icon: Headphones, title: 'Hỗ trợ 24/7', desc: 'Hotline và email hỗ trợ mọi lúc' },
];

export default function StoreAboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/ecommerce/store"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Về trang chủ
      </Link>

      {/* Hero / Title */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Về chúng tôi</h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
          Shop là nền tảng mua sắm trực tuyến uy tín, chuyên cung cấp đa dạng sản phẩm công nghệ với giá tốt nhất.
          Chúng tôi cam kết mang đến trải nghiệm mua sắm an toàn, giao hàng nhanh chóng và chính sách bảo hành, đổi trả rõ ràng.
        </p>
      </header>

      {/* Sứ mệnh & Tầm nhìn */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Sứ mệnh</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Mang công nghệ chất lượng đến mọi nhà với giá cả hợp lý, dịch vụ minh bạch và chính sách bảo vệ người mua rõ ràng.
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Tầm nhìn</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Trở thành địa chỉ mua sắm công nghệ tin cậy hàng đầu, gắn bó lâu dài với khách hàng qua chất lượng sản phẩm và trải nghiệm phục vụ.
          </p>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl bg-white border border-slate-200 shadow-sm p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-600">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chính sách & Điều khoản */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FileText size={22} className="text-slate-700" />
          Chính sách & Điều khoản
        </h2>
        <p className="text-slate-600 text-sm mb-5 max-w-2xl">
          Chúng tôi minh bạch về quyền lợi và trách nhiệm của khách hàng. Dưới đây là các văn bản chính sách và điều khoản bạn nên đọc trước khi sử dụng dịch vụ.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {policies.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.href}
                className="group rounded-xl bg-white border border-slate-200 shadow-sm p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-snug flex-1">{item.description}</p>
                <span className="text-xs font-medium text-red-600 mt-3 inline-flex items-center gap-1">
                  Xem chi tiết
                  <ArrowLeft size={12} className="rotate-180" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Liên hệ */}
      <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Liên hệ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-600">
          <a
            href="mailto:support@shop.demo"
            className="flex items-start gap-3 hover:text-red-600 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <Mail size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</p>
              <p className="font-medium text-slate-900">support@shop.demo</p>
            </div>
          </a>
          <a
            href="tel:0397090051"
            className="flex items-start gap-3 hover:text-red-600 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <Phone size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Hotline</p>
              <p className="font-medium text-slate-900">0397 090 051</p>
            </div>
          </a>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Địa chỉ</p>
              <p className="font-medium text-slate-900">TP. Hồ Chí Minh</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
