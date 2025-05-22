import CourseCard from './CourseCard';

const CourseList = ({ courses, onTagClick, selectedTags, setSearchTerm }) => {
  if (!courses || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          onTagClick={onTagClick}
          selectedTags={selectedTags}
          setSearchTerm={setSearchTerm}
        />
      ))}
    </section>
  );
};

export default CourseList;
