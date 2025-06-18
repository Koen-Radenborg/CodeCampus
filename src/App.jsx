import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { courses } from './data/coursesData.js';
import './styles/App.css';

function App() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark'); // Default dark
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('theme-transition');
    }, 1000);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const fetchData = () => {
      try {
        setCourseData(courses);
        setIsLoading(false);
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de cursussen.');
        setIsLoading(false);
      }
    };

    setTimeout(fetchData, 1000);
  }, []);

  return (
    <main className='app'>
      <header className='app-header'>
        <div className='logo-container'>
          <h1 className='brand-logo'>CodeCampus</h1>
          <p className='brand-tagline'>Ontdek, Leer, Excelleer</p>
        </div>
      </header>
      {isLoading ? (
        <section className='loading'>Cursussen worden geladen...</section>
      ) : error ? (
        <section className='error'>{error}</section>
      ) : (
        <Dashboard courseData={courseData} />
      )}
    </main>
  );
}

export default App;
