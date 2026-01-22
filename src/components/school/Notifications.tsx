// Notifications Component for Students and Parents
import { useState, useMemo } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Pagination } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastInfo } from '../../utils/toast';

// Mock data - Thông báo
interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
  category: 'academic' | 'attendance' | 'exam' | 'general' | 'achievement';
  // tabKey: điều hướng về đúng tab trong StudentsPage/ParentsPage
  tabKey?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'info',
    title: 'Thông báo lịch thi học kỳ 1',
    content: 'Lịch thi học kỳ 1 sẽ bắt đầu từ ngày 15/01/2025. Vui lòng xem chi tiết trong phần Lịch thi.',
    date: '2024-12-20',
    time: '08:00',
    read: false,
    category: 'exam',
    tabKey: 'exam-schedule',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Cảnh báo vắng mặt',
    content: 'Học sinh đã vắng mặt 3 tiết trong tuần này. Vui lòng liên hệ giáo viên chủ nhiệm để được giải thích.',
    date: '2024-12-19',
    time: '14:30',
    read: false,
    category: 'attendance',
    tabKey: 'attendance',
  },
  {
    id: 3,
    type: 'success',
    title: 'Kết quả thi giữa kỳ',
    content: 'Điểm thi giữa kỳ môn Toán đã được cập nhật. Điểm số: 8.5/10. Xem chi tiết trong phần Điểm thi.',
    date: '2024-12-18',
    time: '10:15',
    read: true,
    category: 'academic',
    tabKey: 'exam-scores',
  },
  {
    id: 4,
    type: 'info',
    title: 'Thông báo họp phụ huynh',
    content: 'Cuộc họp phụ huynh học kỳ 1 sẽ được tổ chức vào ngày 25/12/2024 lúc 8:00 sáng tại phòng họp trường.',
    date: '2024-12-17',
    time: '09:00',
    read: true,
    category: 'general',
  },
  {
    id: 5,
    type: 'success',
    title: 'Thành tích học tập',
    content: 'Chúc mừng! Học sinh đã đạt danh hiệu "Học sinh giỏi" học kỳ 1 năm học 2024-2025.',
    date: '2024-12-16',
    time: '11:20',
    read: false,
    category: 'achievement',
    tabKey: 'achievements',
  },
  {
    id: 6,
    type: 'info',
    title: 'Cập nhật điểm số',
    content: 'Điểm số môn Văn đã được cập nhật. Vui lòng kiểm tra trong phần Điểm số.',
    date: '2024-12-15',
    time: '15:45',
    read: true,
    category: 'academic',
    tabKey: 'grades',
  },
  {
    id: 7,
    type: 'warning',
    title: 'Nhắc nhở nộp bài tập',
    content: 'Bài tập môn Lý tuần này chưa được nộp. Hạn nộp: 20/12/2024.',
    date: '2024-12-14',
    time: '13:00',
    read: false,
    category: 'academic',
  },
  {
    id: 8,
    type: 'error',
    title: 'Thông báo quan trọng',
    content: 'Lịch học tuần tới có thay đổi. Vui lòng xem chi tiết trong phần Thời khóa biểu.',
    date: '2024-12-13',
    time: '16:30',
    read: false,
    category: 'general',
    tabKey: 'schedule',
  },
];

const Notifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showRead, setShowRead] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (selectedCategory !== 'all') {
      result = result.filter((notif) => notif.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      result = result.filter((notif) => notif.type === selectedType);
    }

    if (!showRead) {
      result = result.filter((notif) => !notif.read);
    }

    return result.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateB - dateA;
    });
  }, [notifications, selectedCategory, selectedType, showRead]);

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const goToTab = (tabKey: string) => {
    const isParents = location.pathname.includes('/school-project/parents');
    const base = isParents ? '/school-project/parents' : '/school-project/students';
    const tab = isParents ? `children-${tabKey}` : tabKey;
    navigate(`${base}?tab=${encodeURIComponent(tab)}`);
    toastInfo('Đang chuyển đến trang chi tiết...');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info size={20} className="text-blue-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-amber-600" />;
      case 'success':
        return <CheckCircle size={20} className="text-emerald-600" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Info size={20} className="text-slate-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic':
        return 'Học tập';
      case 'attendance':
        return 'Điểm danh';
      case 'exam':
        return 'Thi cử';
      case 'general':
        return 'Chung';
      case 'achievement':
        return 'Thành tích';
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Bell size={18} className="sm:w-5 sm:h-5 text-purple-600" />
            <span>Thông báo</span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{notifications.length}</p>
            <p className="text-xs text-blue-700 mt-1">thông báo</p>
          </div>
          <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-red-700 mb-1">Chưa đọc</p>
            <p className="text-xl sm:text-2xl font-bold text-red-900">{unreadCount}</p>
            <p className="text-xs text-red-700 mt-1">thông báo</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Đã đọc</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {notifications.length - unreadCount}
            </p>
            <p className="text-xs text-emerald-700 mt-1">thông báo</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-purple-700 mb-1">Hôm nay</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {notifications.filter((n) => {
                const today = new Date().toISOString().split('T')[0];
                return n.date === today;
              }).length}
            </p>
            <p className="text-xs text-purple-700 mt-1">thông báo</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="academic">Học tập</option>
            <option value="attendance">Điểm danh</option>
            <option value="exam">Thi cử</option>
            <option value="general">Chung</option>
            <option value="achievement">Thành tích</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả loại</option>
            <option value="info">Thông tin</option>
            <option value="warning">Cảnh báo</option>
            <option value="success">Thành công</option>
            <option value="error">Lỗi</option>
          </select>
          <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={showRead}
              onChange={(e) => setShowRead(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-sm sm:text-base text-slate-700">Hiển thị đã đọc</span>
          </label>
        </div>
      </section>

      {/* Notifications List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Danh sách thông báo</h2>
        {paginatedNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto text-slate-400 mb-4" size={48} />
            <p className="text-slate-600">Không có thông báo nào</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {paginatedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  notification.read
                    ? getTypeColor(notification.type)
                    : `${getTypeColor(notification.type)} ring-2 ring-purple-300`
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-sm sm:text-base font-semibold ${
                              notification.read ? 'text-slate-700' : 'text-slate-900'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="inline-flex items-center justify-center w-2 h-2 bg-purple-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-2">{notification.content}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>{formatDate(notification.date)}</span>
                          <span>•</span>
                          <span>{notification.time}</span>
                          <span>•</span>
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            {getCategoryLabel(notification.category)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Đánh dấu đã đọc"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    {notification.tabKey && (
                      <button
                        type="button"
                        onClick={() => goToTab(notification.tabKey!)}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium mt-2"
                      >
                        Xem chi tiết →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredNotifications.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} thông báo`}
            responsive
          />
        </div>
      </section>
    </div>
  );
};

export default Notifications;
