import { message, notification } from 'antd';

export type AppErrorCode =
  | 'NETWORK'
  | 'TIMEOUT'
  | 'PERMISSION_DENIED'
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'UNKNOWN';

export const COMMON_MESSAGES = {
  success: {
    saved: 'Lưu thành công.',
    updated: 'Cập nhật thành công.',
    deleted: 'Xóa thành công.',
    sent: 'Gửi thành công.',
    markedRead: 'Đã đánh dấu là đã đọc.',
  },
  error: {
    network: 'Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.',
    timeout: 'Yêu cầu quá thời gian. Vui lòng thử lại.',
    permission: 'Bạn không có quyền thực hiện thao tác này.',
    notFound: 'Không tìm thấy dữ liệu hoặc trang yêu cầu.',
    validation: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
    unknown: 'Có lỗi xảy ra. Vui lòng thử lại.',
  },
} as const;

export function toastSuccess(content: string) {
  message.success({ content, duration: 2 });
}

export function toastInfo(content: string) {
  message.info({ content, duration: 2.5 });
}

export function toastWarning(content: string) {
  message.warning({ content, duration: 3 });
}

export function toastError(content: string) {
  message.error({ content, duration: 3 });
}

export function toastFromCode(code: AppErrorCode, override?: string) {
  const content =
    override ||
    (code === 'NETWORK'
      ? COMMON_MESSAGES.error.network
      : code === 'TIMEOUT'
        ? COMMON_MESSAGES.error.timeout
        : code === 'PERMISSION_DENIED'
          ? COMMON_MESSAGES.error.permission
          : code === 'NOT_FOUND'
            ? COMMON_MESSAGES.error.notFound
            : code === 'VALIDATION'
              ? COMMON_MESSAGES.error.validation
              : COMMON_MESSAGES.error.unknown);
  toastError(content);
}

export function notifySuccess(title: string, description?: string) {
  notification.success({ message: title, description, placement: 'topRight', duration: 3 });
}

export function notifyError(title: string, description?: string) {
  notification.error({ message: title, description, placement: 'topRight', duration: 4 });
}

export function notifyWarning(title: string, description?: string) {
  notification.warning({ message: title, description, placement: 'topRight', duration: 4 });
}

export function notifyInfo(title: string, description?: string) {
  notification.info({ message: title, description, placement: 'topRight', duration: 3 });
}

