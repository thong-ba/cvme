// Home page CV
import '../../App.css';
import { Header, Footer } from '../../components/common';
import { Hero, About, Skills, Experience, Projects, Contact } from '../../components/home';

function HomePage() {
  return (
    <div className="cv-page">
      <Header />
      <main className="cv-main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;

