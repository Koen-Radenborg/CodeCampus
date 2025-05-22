import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const allTags = [
  'web', 'javascript', 'frontend', 'react', 'backend', 'node', 'api', 'python',
  'data-science', 'analytics', 'html', 'css', 'java', 'enterprise', 'git', 'tools',
  'collaboration', 'fullstack'
];

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    if (activeTab === 'beginner') {
      filtered = filtered.filter(course => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter(course => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
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

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
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
        </nav>

        <nav className='tab-buttons tag-buttons'>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
            </button>
          ))}
        </nav>

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
          <h2>
            {activeTab === 'all'
              ? 'Alle Cursussen'
              : activeTab === 'beginner'
              ? 'Cursussen voor Beginners'
              : activeTab === 'gevorderd'
              ? 'Gevorderde Cursussen'
              : 'Meest Bekeken Cursussen'}
          </h2>
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
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
