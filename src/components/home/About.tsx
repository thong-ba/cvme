// About Me section
import { useState, useEffect } from 'react';
import { GraduationCap, Code, Users, Target, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const highlights = [
    { icon: GraduationCap, text: 'Tốt nghiệp Đại học FPT', color: 'text-indigo-600' },
    { icon: Code, text: 'Chuyên ngành Frontend Development', color: 'text-purple-600' },
    { icon: Users, text: 'Tư duy hệ thống & làm việc nhóm', color: 'text-pink-600' },
    { icon: Target, text: 'Tập trung vào UX & Performance', color: 'text-emerald-600' },
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">About Me</h2>
          </div>
        </div>

        <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 p-4 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 ${highlight.color} dark:from-indigo-900/30 dark:to-purple-900/30`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{highlight.text}</span>
                </div>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="space-y-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-900/50">
              <p className="mb-4">
                Tôi là sinh viên tốt nghiệp <span className="font-semibold text-indigo-600 dark:text-indigo-400">Đại học FPT</span>, chuyên ngành{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">Frontend Development</span>, với nền tảng vững chắc về React và phát triển giao diện web hiện đại. Tôi có kinh nghiệm xây dựng các sản phẩm frontend theo hướng{' '}
                <span className="font-semibold text-pink-600 dark:text-pink-400">rõ ràng, dễ mở rộng</span>, tối ưu trải nghiệm người dùng và tuân thủ best practices trong phát triển giao diện.
              </p>
              <p>
                Bên cạnh kỹ năng kỹ thuật, tôi chú trọng <span className="font-semibold text-emerald-600 dark:text-emerald-400">tư duy hệ thống</span>, khả năng làm việc nhóm và chủ động học hỏi công nghệ mới để nâng cao chất lượng sản phẩm. Tôi mong muốn gia nhập một môi trường làm việc chuyên nghiệp, nơi tôi có thể tiếp tục trau dồi kỹ năng, đóng góp giá trị thực tế cho dự án và gắn bó lâu dài cùng sự phát triển của công ty.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
                <Award className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Chất lượng</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Code clean, maintainable, scalable</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
                <Lightbulb className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Đổi mới</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Luôn học hỏi công nghệ mới</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
                <Users className="text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Hợp tác</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Làm việc nhóm hiệu quả</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

