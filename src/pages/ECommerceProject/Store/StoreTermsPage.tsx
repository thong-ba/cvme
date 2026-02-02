import StoreStaticPage from './StoreStaticPage';

export default function StoreTermsPage() {
  return (
    <StoreStaticPage title="Điều khoản sử dụng">
      <h2 className="text-lg font-semibold text-slate-900 mt-6 mb-2">1. Chấp nhận điều khoản</h2>
      <p>
        Việc sử dụng website và dịch vụ của Shop đồng nghĩa với việc bạn đồng ý với các điều khoản và điều kiện dưới đây.
      </p>
      <h2 className="text-lg font-semibold text-slate-900 mt-6 mb-2">2. Giao dịch và thanh toán</h2>
      <p>
        Giá sản phẩm hiển thị đã bao gồm VAT (nếu có). Khách hàng có trách nhiệm cung cấp thông tin chính xác khi đặt hàng. Shop có quyền từ chối đơn hàng nếu phát hiện thông tin không hợp lệ.
      </p>
      <h2 className="text-lg font-semibold text-slate-900 mt-6 mb-2">3. Vận chuyển và giao hàng</h2>
      <p>
        Thời gian giao hàng phụ thuộc vào khu vực và đơn vị vận chuyển. Miễn phí vận chuyển cho đơn từ 500.000đ trở lên (theo chương trình hiện hành).
      </p>
      <h2 className="text-lg font-semibold text-slate-900 mt-6 mb-2">4. Bảo mật và tài khoản</h2>
      <p>
        Bạn có trách nhiệm bảo mật tài khoản và mật khẩu. Mọi hoạt động từ tài khoản của bạn được coi là do bạn thực hiện.
      </p>
      <p className="mt-6 text-slate-500 text-sm">
        Mọi thắc mắc về điều khoản: support@shop.demo — 0397 090 051.
      </p>
    </StoreStaticPage>
  );
}
