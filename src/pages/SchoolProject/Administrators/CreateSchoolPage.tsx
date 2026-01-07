const CreateSchoolPage = () => {
  return (
    <section className="px-4 pb-12 md:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-md">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Thêm trường mới</h1>
          <p className="text-slate-600">Checklist nhanh để admin tạo và cấu hình trường.</p>
        </header>
        <ol className="space-y-3 text-slate-700">
          <li className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="font-semibold text-slate-900">1. Thông tin chung</p>
            <p className="text-sm text-slate-600">Tên trường, cấp học, địa chỉ, liên hệ, mã định danh.</p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="font-semibold text-slate-900">2. Cấu hình năm học & học kỳ</p>
            <p className="text-sm text-slate-600">Thiết lập niên khóa, số học kỳ, quy chế điểm.</p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="font-semibold text-slate-900">3. Tài khoản quản trị trường</p>
            <p className="text-sm text-slate-600">Tạo admin trường, gán vai trò, chính sách mật khẩu.</p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="font-semibold text-slate-900">4. Tích hợp & nhập liệu</p>
            <p className="text-sm text-slate-600">Import danh sách lớp, giáo viên, học sinh; cấu hình SSO/API.</p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default CreateSchoolPage;


