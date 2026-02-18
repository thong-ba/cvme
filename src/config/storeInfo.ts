/**
 * Thông tin cửa hàng: địa chỉ, giờ hoạt động, liên hệ.
 * Dùng chung cho StoreFooter, StoreAboutPage, FloatingContactBar.
 */
export const storeInfo = {
  contact: {
    email: 'support@shop.demo',
    phone: '0397 090 051',
    phoneFormatted: '0397 090 051',
  },
  /** Địa chỉ đầy đủ (văn phòng / điểm giao dịch) */
  address: {
    line1: '123 Nguyễn Huệ',
    line2: 'Phường Bến Nghé, Quận 1',
    city: 'TP. Hồ Chí Minh',
    full: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  },
  /** Giờ hoạt động: hỗ trợ / mở cửa */
  openingHours: [
    { days: 'Thứ 2 – Thứ 6', hours: '8:00 – 22:00' },
    { days: 'Thứ 7', hours: '8:00 – 18:00' },
    { days: 'Chủ nhật', hours: '9:00 – 17:00' },
  ],
  /** Mô tả ngắn cho banner/tooltip (ví dụ: "8h–22h hàng ngày") */
  openingHoursShort: '8h–22h (T2–T6), 8h–18h (T7), 9h–17h (CN)',
} as const;
