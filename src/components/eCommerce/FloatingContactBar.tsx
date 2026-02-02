import { useState, useEffect } from 'react';
import { MessageCircle, Mail, ArrowUp, Send } from 'lucide-react';

const FACEBOOK_URL = 'https://www.facebook.com/thonglnse/';
const ZALO_URL = 'https://zalo.me';
const CONTACT_EMAIL = 'support@shop.demo';

export default function FloatingContactBar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'system'; text: string }[]>([
    { role: 'system', text: 'Chào bạn! Shop hỗ trợ bạn 24/7. Bạn cần tư vấn gì ạ?' },
  ]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: message.trim() }]);
    setMessage('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: 'Cảm ơn bạn! Đội ngũ sẽ phản hồi trong giây lát. Bạn có thể gọi 1900 xxxx hoặc email support@shop.demo.' },
      ]);
    }, 800);
  };

  const items = [
    {
      label: 'Chat với hệ thống',
      icon: MessageCircle,
      onClick: () => setChatOpen((o) => !o),
      className: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
    {
      label: 'Liên hệ',
      icon: Mail,
      href: `mailto:${CONTACT_EMAIL}`,
      className: 'bg-slate-600 hover:bg-slate-700 text-white',
    },
    {
      label: 'Facebook',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: FACEBOOK_URL,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
    },
    {
      label: 'Zalo',
      icon: () => <span className="text-lg font-bold leading-none">Z</span>,
      href: ZALO_URL,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'bg-[#0068FF] hover:bg-[#0052CC] text-white',
    },
  ];

  return (
    <>
      {/* Khung chat với hệ thống */}
      {chatOpen && (
        <div
          className="fixed right-20 bottom-24 z-50 w-80 max-w-[calc(100vw-6rem)] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col"
          style={{ height: '380px' }}
        >
          <div className="bg-gradient-to-r from-red-600 to-amber-600 px-4 py-3 text-white">
            <h3 className="font-semibold">Chat với Shop</h3>
            <p className="text-xs text-white/90">Hỗ trợ 24/7 • Phản hồi nhanh</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              aria-label="Gửi"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Thanh icon cố định bên phải */}
      <div className="fixed right-4 top-1/2 z-40 flex flex-col gap-2 -translate-y-1/2">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <span
              className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all ${item.className}`}
              title={item.label}
            >
              {typeof Icon === 'function' && (Icon as { length?: number }).length === 0 ? (
                <Icon />
              ) : (
                <Icon size={22} />
              )}
            </span>
          );
          const titleEl = (
            <span className="absolute right-full mr-2 whitespace-nowrap px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </span>
          );
          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="group relative"
                aria-label={item.label}
              >
                {titleEl}
                {content}
              </button>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.rel}
              className="group relative"
              aria-label={item.label}
            >
              {titleEl}
              {content}
            </a>
          );
        })}

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
            aria-label="Về đầu trang"
          >
            <ArrowUp size={22} />
          </button>
        )}
      </div>
    </>
  );
}
