// Contact section
import { Mail, Github, Phone, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section className="cv-section" id="contact">
      <div className="cv-section__header">
        <h2>Contact</h2>
        <p>Tạo hành động tiếp theo: email, mạng xã hội, call.</p>
      </div>
      <div className="cv-contact cv-card">
        <div className="cv-contact__info">
          <p>
            <Phone size={16} />{' '}
            <a href="tel:+84397090051" target="_blank" rel="noreferrer">
              0397090051 || (+84).397.090.051
            </a>
          </p>
          <p>
            <Mail size={16} />{' '}
            <a href="mailto:thonglyngocse@gmail.com" target="_blank" rel="noreferrer">
              thonglyngocse@gmail.com
            </a>
          </p>
          <p>
            <Github size={16} />{' '}
            <a href="https://github.com/thong-ba" target="_blank" rel="noreferrer">
              github.com/thong-ba
            </a>
          </p>
          <p>
            <Facebook size={16} />{' '}
            <a href="https://www.facebook.com/thonglnse/" target="_blank" rel="noreferrer">
              facebook.com/thonglnse
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

