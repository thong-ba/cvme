// Login Modal Component
import { useState } from 'react';
import { X, User, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (username === 'admin' && password === 'admin123') {
        onLogin(username, password);
        setUsername('');
        setPassword('');
        onClose();
      } else {
        setError('Tài khoản hoặc mật khẩu không đúng');
      }
    }, 1000);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="login-modal__header">
          <div className="login-modal__icon">
            <LogIn size={32} />
          </div>
          <h2>Đăng nhập</h2>
          <p>Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <form className="login-modal__form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-modal__error">
              <span>{error}</span>
            </div>
          )}

          <div className="login-modal__field">
            <label htmlFor="username">
              <User size={18} />
              Tài khoản
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="login-modal__field">
            <label htmlFor="password">
              <Lock size={18} />
              Mật khẩu
            </label>
            <div className="login-modal__password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="login-modal__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-modal__options">
            <label className="login-modal__remember">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="login-modal__forgot">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="login-modal__submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="login-modal__spinner"></span>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Đăng nhập
              </>
            )}
          </button>
        </form>

        <div className="login-modal__footer">
          <p>
            Demo: Tài khoản: <strong>admin</strong> / Mật khẩu: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

