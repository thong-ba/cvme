import { primarySchools } from '../../../data';

const PrimarySchoolsPage = () => {
  return (
    <section className="px-4 pb-12 md:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-md">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Danh sách Trường Tiểu học</h1>
          <p className="text-slate-600">Theo dõi số lượng và tình trạng kiểm định.</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          {primarySchools.map((school) => (
            <div
              key={school.id}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm hover:border-blue-200 hover:shadow"
            >
              <h3 className="text-lg font-semibold text-slate-900">{school.name}</h3>
              <p className="text-sm text-slate-600">Học sinh: {school.students.toLocaleString()}</p>
              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  school.status === 'Đạt chuẩn'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {school.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimarySchoolsPage;


