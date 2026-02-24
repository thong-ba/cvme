// Root app component
import { Layout } from './components/common';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}

export default App;
