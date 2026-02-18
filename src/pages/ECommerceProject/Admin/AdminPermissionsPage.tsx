import { Key } from 'lucide-react';
import { adminRoles } from '../../../data/admin';

export default function AdminPermissionsPage() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
          <Key size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Phân quyền vai trò</h1>
          <p className="text-sm text-slate-500">Quản lý vai trò và quyền hạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminRoles.map((role) => (
          <div
            key={role.id}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-slate-900 mb-2">{role.name}</h3>
            <p className="text-xs text-slate-500 mb-3">ID: {role.id}</p>
            <ul className="space-y-1">
              {role.permissions.map((p) => (
                <li key={p} className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
