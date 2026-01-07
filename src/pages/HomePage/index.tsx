// Home page CV
import { Header, Footer } from '../../components/common';
import { Hero, About, Skills, Experience, Projects, Contact } from '../../components/home';

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-10 pt-6">
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

