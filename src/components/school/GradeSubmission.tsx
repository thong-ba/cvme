// Grade Submission Component for Teachers
import { useState, useMemo } from 'react';
import { Send, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Modal, Pagination } from 'antd';
import { toastSuccess } from '../../utils/toast';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

interface SubmissionRecord {
  id: number;
  class: string;
  semester: string;
  year: string;
  submittedDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  submittedBy: string;
  approvedBy?: string;
  notes?: string;
}

const mockSubmissions: SubmissionRecord[] = [
  {
    id: 1,
    class: '10A1',
    semester: 'Học kỳ 1',
    year: '2024-2025',
    submittedDate: '2024-12-15',
    status: 'approved',
    submittedBy: 'Nguyễn Văn A',
    approvedBy: 'Hiệu trưởng',
    notes: 'Đã duyệt',
  },
  {
    id: 2,
    class: '10A2',
    semester: 'Học kỳ 1',
    year: '2024-2025',
    submittedDate: '2024-12-15',
    status: 'approved',
    submittedBy: 'Nguyễn Văn A',
    approvedBy: 'Hiệu trưởng',
    notes: 'Đã duyệt',
  },
  {
    id: 3,
    class: '11A1',
    semester: 'Học kỳ 1',
    year: '2024-2025',
    submittedDate: '',
    status: 'pending',
    submittedBy: 'Nguyễn Văn A',
  },
];

const GradeSubmission = () => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(mockSubmissions);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmRecord, setConfirmRecord] = useState<SubmissionRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const itemsPerPage = 8;

  const filteredSubmissions = useMemo(() => {
    let result = [...submissions];

    if (selectedClass !== 'all') {
      result = result.filter((sub) => sub.class === selectedClass);
    }

    if (selectedStatus !== 'all') {
      result = result.filter((sub) => sub.status === selectedStatus);
    }

    return result;
  }, [submissions, selectedClass, selectedStatus]);

  const paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openConfirm = (record: SubmissionRecord) => setConfirmRecord(record);
  const closeConfirm = () => {
    if (!submitting) setConfirmRecord(null);
  };

  const handleConfirmSubmit = () => {
    if (!confirmRecord) return;
    setSubmitting(true);
    // Giả lập gọi API
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === confirmRecord.id
            ? {
                ...s,
                status: 'submitted' as const,
                submittedDate: new Date().toISOString().slice(0, 10),
              }
            : s
        )
      );
      setSubmitting(false);
      setConfirmRecord(null);
      toastSuccess('Đã nộp điểm thành công!');
    }, 400);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'submitted':
        return 'Đã nộp';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Chưa nộp';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Send size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Thống kê nộp điểm</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{submissions.length}</p>
            <p className="text-xs text-blue-700 mt-1">lớp</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Đã duyệt</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {submissions.filter((s) => s.status === 'approved').length}
            </p>
            <p className="text-xs text-emerald-700 mt-1">lớp</p>
          </div>
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Đã nộp</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">
              {submissions.filter((s) => s.status === 'submitted').length}
            </p>
            <p className="text-xs text-blue-700 mt-1">lớp</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-amber-700 mb-1">Chưa nộp</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">
              {submissions.filter((s) => s.status === 'pending').length}
            </p>
            <p className="text-xs text-amber-700 mt-1">lớp</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả lớp</option>
            {currentTeacher.classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chưa nộp</option>
            <option value="submitted">Đã nộp</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </section>

      {/* Submissions Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <FileText size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Danh sách nộp điểm</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Lớp
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Học kỳ
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Năm học
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Ngày nộp
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Người duyệt
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Ghi chú
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {submission.class}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">{submission.semester}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{submission.year}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{formatDate(submission.submittedDate)}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(submission.status)}`}>
                      {submission.status === 'approved' && <CheckCircle size={12} className="mr-1" />}
                      {submission.status === 'rejected' && <XCircle size={12} className="mr-1" />}
                      {getStatusLabel(submission.status)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                    {submission.approvedBy || '—'}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">
                    {submission.notes || '—'}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                    {submission.status === 'pending' && (
                      <button
                        onClick={() => openConfirm(submission)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
                      >
                        <Send size={12} />
                        <span>Nộp điểm</span>
                      </button>
                    )}
                    {submission.status === 'submitted' && (
                      <span className="text-xs text-slate-500">Đang chờ duyệt</span>
                    )}
                    {submission.status === 'approved' && (
                      <span className="text-xs text-emerald-600">Đã duyệt</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal xác nhận nộp điểm */}
        <Modal
          title="Xác nhận nộp điểm"
          open={!!confirmRecord}
          onCancel={closeConfirm}
          onOk={handleConfirmSubmit}
          okText="Nộp điểm"
          cancelText="Hủy"
          confirmLoading={submitting}
          closable={!submitting}
          maskClosable={!submitting}
          okButtonProps={{ className: 'bg-indigo-600 hover:!bg-indigo-700' }}
        >
          {confirmRecord && (
            <p className="text-slate-600">
              Bạn có chắc chắn muốn nộp điểm cho lớp <strong className="text-slate-900">{confirmRecord.class}</strong> (Học kỳ {confirmRecord.semester}, {confirmRecord.year})?
            </p>
          )}
        </Modal>

        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredSubmissions.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`}
          />
        </div>
      </section>
    </div>
  );
};

export default GradeSubmission;
