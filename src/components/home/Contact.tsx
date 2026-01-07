// Contact section
import { Mail, Github, Phone, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Contact</h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            Tạo hành động tiếp theo: email, mạng xã hội, call.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-base shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-emerald-500" />
              <a
                href="tel:+84397090051"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
              >
                0397090051 || (+84).397.090.051
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-indigo-500" />
              <a
                href="mailto:thonglyngocse@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
              >
                thonglyngocse@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Github size={18} className="text-slate-700 dark:text-slate-200" />
              <a
                href="https://github.com/thong-ba"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
              >
                github.com/thong-ba
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Facebook size={18} className="text-sky-500" />
              <a
                href="https://www.facebook.com/thonglnse/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
              >
                facebook.com/thonglnse
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

