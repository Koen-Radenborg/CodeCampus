import { useState, useRef, useEffect } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import FaqWidget from './FaQ';

const allTags = [
  'web', 'javascript', 'frontend', 'react', 'backend', 'node', 'api', 'python',
  'data-science', 'analytics', 'html', 'css', 'java', 'enterprise', 'git', 'tools',
  'collaboration', 'fullstack'
];

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Init selectedTags from localStorage
  const [selectedTags, setSelectedTags] = useState(() => {
    const saved = localStorage.getItem('selectedTags');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync selectedTags to localStorage on change
  useEffect(() => {
    localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
  }, [selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    if (activeTab === 'all') {
      // geen filter
    } else if (activeTab === 'beginner') {
      filtered = filtered.filter(course => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter(course => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (activeTab === 'favorieten') {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      filtered = filtered.filter(course => favoriteIds.includes(course.id));
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(course =>
        selectedTags.every(tag => course.categories && course.categories.includes(tag))
      );
    }

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(lowerSearch) ||
        (course.instructor && course.instructor.toLowerCase().includes(lowerSearch))
      );
    }

    return filtered;
  };

  const tabTitle = () => {
    switch (activeTab) {
      case 'beginner':
        return 'Cursussen voor Beginners';
      case 'gevorderd':
        return 'Gevorderde Cursussen';
      case 'populair':
        return 'Meest Bekeken Cursussen';
      case 'favorieten':
        return 'Favoriete Cursussen';
      default:
        return 'Alle Cursussen';
    }
  };

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
        <div className="theme-switch-container">
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className='search-section'>
          <input
            type='text'
            placeholder='Naar cursussen zoeken'
            className='styled-search-input'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className='clear-search-button'
              onClick={() => setSearchTerm('')}
              aria-label='Zoekopdracht wissen'
            >
              ×
            </button>
          )}
        </div>

        <nav className='tab-buttons'>
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            Alle Cursussen
          </button>
          <button
            className={activeTab === 'beginner' ? 'active' : ''}
            onClick={() => setActiveTab('beginner')}
          >
            Voor Beginners
          </button>
          <button
            className={activeTab === 'gevorderd' ? 'active' : ''}
            onClick={() => setActiveTab('gevorderd')}
          >
            Gevorderd
          </button>
          <button
            className={activeTab === 'populair' ? 'active' : ''}
            onClick={() => setActiveTab('populair')}
          >
            Meest Bekeken
          </button>
          <button
            className={activeTab === 'favorieten' ? 'active' : ''}
            onClick={() => setActiveTab('favorieten')}
          >
            Favorieten
          </button>
        </nav>

        {/* TAGS: desktop buttons en mobiel dropdown */}
        <div className='tag-section'>
          {/* Desktop: zichtbare tag-buttons */}
          <nav className='tag-buttons'>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
              </button>
            ))}
          </nav>

          {/* Mobiel: dropdown toggle knop */}
          <div className='tag-dropdown-container' ref={dropdownRef}>
            <button
              className={`tag-dropdown-toggle ${tagDropdownOpen ? 'active' : ''}`}
              onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={tagDropdownOpen}
              type="button"
            >
              Tags ▾
            </button>

            {tagDropdownOpen && (
              <div className='tag-dropdown-menu'>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                    type="button"
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="clear-tags-text-container">
            <span
              className="clear-tags-text"
              onClick={() => setSelectedTags([])}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedTags([]); }}
              aria-label="Alle tags wissen"
            >
              Alle tags wissen
            </span>
          </div>
        )}
      </header>

      <div className='dashboard-content'>
        <section className='main-content'>
          <h2>{tabTitle()}</h2>
          <CourseList
            courses={filteredCourses()}
            onTagClick={toggleTag}
            selectedTags={selectedTags}
            setSearchTerm={setSearchTerm}
          />
        </section>

        <aside className='sidebar'>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
          <FaqWidget />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
