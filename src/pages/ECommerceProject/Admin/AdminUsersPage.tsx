import { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import { adminUsers } from '../../../data/admin';
import type { AdminUser } from '../../../data/admin';

const roleLabel: Record<string, string> = {
  admin: 'Admin',
  seller: 'Người bán',
  staff: 'Nhân viên',
  customer: 'Khách hàng',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    if (!search.trim()) return adminUsers;
    const q = search.trim().toLowerCase();
    return adminUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q) ||
        (roleLabel[u.role] && roleLabel[u.role].toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
          <Users size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quản lý user</h1>
          <p className="text-sm text-slate-500">User & tài khoản hệ thống</p>
        </div>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo email, tên, vai trò..."
          className="flex-1 max-w-md px-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
        />
        <span className="text-sm text-slate-500">{filtered.length}/{adminUsers.length} user</span>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Họ tên</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Vai trò</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-900">Trạng thái</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u: AdminUser) => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{u.email}</td>
                <td className="px-4 py-3 text-slate-700">{u.fullName}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-violet-100 text-violet-700">{roleLabel[u.role]}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={u.status === 'active' ? 'inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700' : 'inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600'}>
                    {u.status === 'active' ? 'Hoạt động' : 'Tắt'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-500">{u.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-slate-500">Không tìm thấy user.</p>}
      </div>
    </div>
  );
}
