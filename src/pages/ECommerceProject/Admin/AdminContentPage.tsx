import { FileCode } from 'lucide-react';

const mockContent = [
  { id: '1', title: 'Trang chủ - Banner', type: 'Banner', updated: '2025-02-15' },
  { id: '2', title: 'Chính sách bảo mật', type: 'Page', updated: '2025-02-10' },
  { id: '3', title: 'Điều khoản sử dụng', type: 'Page', updated: '2025-02-01' },
  { id: '4', title: 'Flash sale - Nội dung', type: 'Block', updated: '2025-02-18' },
];

export default function AdminContentPage() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
          <FileCode size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quản lý nội dung</h1>
          <p className="text-sm text-slate-500">Banner, trang tĩnh, block nội dung</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Tiêu đề</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Loại</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Cập nhật</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockContent.map((row) => (
              <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{row.title}</td>
                <td className="px-4 py-3 text-slate-600">{row.type}</td>
                <td className="px-4 py-3 text-right text-slate-500">{row.updated}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-violet-600 hover:text-violet-700 font-medium text-sm">
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
