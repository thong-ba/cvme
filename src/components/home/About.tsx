// About Me section
const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">About Me</h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            3–5 dòng giúp recruiter hiểu nhanh về background và định hướng của bạn.
          </p>
        </div>
        <div className="space-y-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300">
          <p>
            Frontend developer tập trung vào React, TypeScript và UI hiện đại. Thoải mái làm việc với design system,
            component-based architecture và performance optimization.
          </p>
          <p>
            Mục tiêu: trở thành key member trong team frontend, tham gia định hình kiến trúc UI và trải nghiệm người
            dùng cho các sản phẩm web scale lớn.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

