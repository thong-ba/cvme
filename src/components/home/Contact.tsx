// Contact section
import { useState, useEffect } from 'react';
import { Mail, Github, Phone, Facebook, MapPin, Send, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const contacts = [
    {
      icon: Phone,
      label: 'Phone',
      value: '0397090051',
      href: 'tel:+84397090051',
      color: 'emerald',
      copy: '+84397090051',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'thonglyngocse@gmail.com',
      href: 'mailto:thonglyngocse@gmail.com',
      color: 'indigo',
      copy: 'thonglyngocse@gmail.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/thong-ba',
      href: 'https://github.com/thong-ba',
      color: 'slate',
      copy: 'https://github.com/thong-ba',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'facebook.com/thonglnse',
      href: 'https://www.facebook.com/thonglnse/',
      color: 'sky',
      copy: 'https://www.facebook.com/thonglnse/',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:bg-emerald-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-200' },
      slate: { bg: 'bg-slate-100', text: 'text-slate-600', hover: 'hover:bg-slate-200' },
      sky: { bg: 'bg-sky-100', text: 'text-sky-600', hover: 'hover:bg-sky-200' },
    };
    return colors[color] || colors.slate;
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Contact</h2>
          </div>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Hãy liên hệ với tôi nếu bạn có bất kỳ câu hỏi nào hoặc muốn hợp tác!
          </p>
        </div>

        <div className={`grid gap-4 sm:grid-cols-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            const colors = getColorClasses(contact.color);
            return (
              <div
                key={contact.label}
                className="group relative rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                        {contact.label}
                      </p>
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-base font-semibold text-slate-900 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(contact.copy, contact.label)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 transition-all duration-300 hover:scale-110 hover:shadow-md dark:border-slate-600 ${
                      copied === contact.label ? 'bg-emerald-50 border-emerald-300' : 'bg-white dark:bg-slate-800'
                    }`}
                    aria-label={`Copy ${contact.label}`}
                  >
                    {copied === contact.label ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location */}
        <div className={`mt-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-lg transition-all duration-1000 delay-400 dark:border-slate-700 dark:from-indigo-900/20 dark:to-purple-900/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Location
              </p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Hóc Môn, Thành phố Hồ Chí Minh</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="mailto:thonglyngocse@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Send size={18} />
            Send me a message
            <Send size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

