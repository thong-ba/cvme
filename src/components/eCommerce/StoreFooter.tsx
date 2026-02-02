import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const CONTACT_PHONE = '0397090051';
const CONTACT_EMAIL = 'support@shop.demo';

const StoreFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-950 text-amber-50/90 mt-auto relative border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/ecommerce/store" className="flex items-center gap-2 text-white font-bold text-lg hover:text-amber-200 transition-colors w-fit">
            <ShoppingBag size={24} className="text-amber-400" />
            Shop
          </Link>
          <div>
            <h3 className="font-semibold text-white mb-3">Về chúng tôi</h3>
            <p className="text-sm leading-relaxed text-amber-50/80 mb-2">
              Nền tảng mua sắm trực tuyến uy tín, đa dạng sản phẩm công nghệ với giá tốt nhất.
            </p>
            <Link to="/ecommerce/store/about" className="text-sm text-amber-200 hover:text-amber-100 transition-colors">
              Xem thêm →
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Chính sách & Điều khoản</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ecommerce/store/privacy" className="hover:text-amber-200 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/ecommerce/store/return-policy" className="hover:text-amber-200 transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="/ecommerce/store/terms" className="hover:text-amber-200 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/ecommerce/store/terms" className="hover:text-amber-200 transition-colors">
                  Điều khoản giao dịch
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-amber-200 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-amber-200 transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                TP. Hồ Chí Minh
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-amber-500/20 text-center text-sm text-amber-50/70">
          © {currentYear} Shop Demo. Chúc mừng năm mới — Dự án E-commerce.
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
