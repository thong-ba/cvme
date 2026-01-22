// Header / Navbar
import { useEffect, useState } from 'react';
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Mail,
  SunMedium,
  MoonStar,
  Menu,
  X,
  MapPin,
  Loader2,
  AlertCircle,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useGeolocation, useVietnamTime } from '../../hooks';
import { geocodingService } from '../../services/geocoding.service';

const Header = () => {
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('cv-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationTimeDropdownOpen, setIsLocationTimeDropdownOpen] = useState(false);
  
  // Geolocation
  const { position, error, loading, permissionGranted, retry } = useGeolocation();
  const [address, setAddress] = useState<string>('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
  // Vietnam Time
  const vietnamTime = useVietnamTime(1000); // Cập nhật mỗi giây

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Lấy địa chỉ từ tọa độ
  useEffect(() => {
    if (position) {
      setIsLoadingAddress(true);
      geocodingService
        .reverseGeocode(position.latitude, position.longitude)
        .then((result) => {
          if (result) {
            setAddress(geocodingService.formatShortAddress(result));
          } else {
            setAddress(`${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`);
          }
        })
        .catch(() => {
          // Nếu không lấy được địa chỉ, hiển thị tọa độ
          setAddress(`${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`);
        })
        .finally(() => {
          setIsLoadingAddress(false);
        });
    }
  }, [position]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('cv-theme', next);
      return next;
    });
  };

  const navItems = [
    { href: '#about', icon: User, label: 'About' },
    { href: '#experience', icon: Briefcase, label: 'Experience' },
    { href: '#projects', icon: FolderGit2, label: 'Projects' },
    { href: '#skills', icon: Code2, label: 'Skills' },
    { href: '#contact', icon: Mail, label: 'Contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
              TLN
            </span>
            <span className="text-sm tracking-tight text-slate-800 dark:text-slate-100">Thong Ly Ngoc</span>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-slate-500 md:flex dark:text-slate-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-xs">
            {/* Location & Time Dropdown */}
            <div 
              className="hidden md:block relative"
              onMouseEnter={() => setIsLocationTimeDropdownOpen(true)}
              onMouseLeave={() => setIsLocationTimeDropdownOpen(false)}
            >
              {/* Trigger Button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-emerald-100 text-indigo-700 hover:from-indigo-200 hover:to-emerald-200 transition-all dark:from-indigo-900/30 dark:to-emerald-900/30 dark:text-indigo-400 dark:hover:from-indigo-900/50 dark:hover:to-emerald-900/50">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span className="text-[10px] font-medium whitespace-nowrap">
                    {vietnamTime.time}
                  </span>
                </div>
                {position && address && (
                  <>
                    <span className="text-indigo-400 dark:text-indigo-500">•</span>
                    <MapPin size={12} />
                    <span className="text-[10px] font-medium truncate max-w-[120px]" title={address}>
                      {address.split(',')[0]}
                    </span>
                  </>
                )}
                <ChevronDown size={10} className={`transition-transform ${isLocationTimeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Content */}
              {isLocationTimeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white shadow-xl border border-slate-200 p-4 z-50 dark:bg-slate-900 dark:border-slate-700">
                  <div className="space-y-4">
                    {/* Time Section */}
                    <div className="border-b border-slate-200 pb-3 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Thời gian Việt Nam</h3>
                      </div>
                      <div className="space-y-1 pl-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Giờ hiện tại:</span>
                          <span className="text-sm font-mono font-semibold text-slate-900 dark:text-slate-100">{vietnamTime.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Ngày:</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{vietnamTime.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Thứ:</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{vietnamTime.dayOfWeek}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Vị trí</h3>
                      </div>
                      <div className="space-y-2 pl-6">
                        {loading && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <Loader2 size={14} className="animate-spin" />
                            <span>Đang lấy vị trí...</span>
                          </div>
                        )}
                        {error && permissionGranted === false && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                              <AlertCircle size={14} />
                              <span>Chưa cho phép truy cập vị trí</span>
                            </div>
                            <button
                              onClick={retry}
                              className="w-full px-3 py-1.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50"
                            >
                              Thử lại
                            </button>
                          </div>
                        )}
                        {position && isLoadingAddress && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <Loader2 size={14} className="animate-spin" />
                            <span>Đang lấy địa chỉ...</span>
                          </div>
                        )}
                        {position && !isLoadingAddress && address && (
                          <div className="space-y-1">
                            <div className="text-xs text-slate-600 dark:text-slate-400">Địa chỉ:</div>
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{address}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                              Tọa độ: {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)}
                            </div>
                          </div>
                        )}
                        {position && !isLoadingAddress && !address && (
                          <div className="space-y-1">
                            <div className="text-xs text-slate-600 dark:text-slate-400">Tọa độ:</div>
                            <div className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                              {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={handleNavClick}>
          <nav
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-4">
              {/* Vietnam Time in Mobile Menu */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-2">
                <Clock size={16} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{vietnamTime.time}</div>
                  <div className="text-xs opacity-75">{vietnamTime.dayOfWeek}, {vietnamTime.date}</div>
                </div>
              </div>
              
              {/* Location in Mobile Menu */}
              {loading && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 mb-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Đang lấy vị trí...</span>
                </div>
              )}
              {error && permissionGranted === false && (
                <button
                  onClick={retry}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 mb-2 w-full text-left"
                >
                  <AlertCircle size={16} />
                  <span className="text-sm">Nhấn để thử lại lấy vị trí</span>
                </button>
              )}
              {position && !isLoadingAddress && address && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm font-medium truncate">{address}</span>
                </div>
              )}
              {position && isLoadingAddress && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 mb-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Đang lấy địa chỉ...</span>
                </div>
              )}
              {position && !isLoadingAddress && !address && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">
                    {position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}
                  </span>
                </div>
              )}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;

