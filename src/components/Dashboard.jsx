import { useState } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    if (activeTab === 'all') {
      return courseData;
    } else if (activeTab === 'beginner') {
      return courseData.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      return courseData.filter((course) => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      return [...courseData].sort((a, b) => b.views - a.views);
    }
    return courseData;
  };

  return (
    <section className='dashboard'>
      <header className='dashboard-header'>
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
          <CourseList courses={filteredCourses()} />
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
