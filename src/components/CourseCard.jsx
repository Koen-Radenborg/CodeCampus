import { useState, useEffect } from 'react';
import '../styles/CourseCard.css';
import '../styles/Dashboard.css';

const CourseCard = ({ course, onTagClick, selectedTags, setSearchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(course.id));
  }, [course.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== course.id)
      : [...favorites, course.id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modalContainer')) {
      setShowModal(false);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (!course) {
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );
  }

  return (
    <>
      <article className='course-card'>
        <figure className='course-image'>
          <img src={course.imageUrl} alt={course.title} />
        </figure>
        <div className='course-content'>
          <h3>{course.title}</h3>
          <p className='course-description'>{course.description}</p>
          <dl className='course-details'>
            <div>
              <dd className='level'>Niveau: {course.level}</dd>
            </div>
            <div>
              <dd className='duration'>Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className='course-stats'>
            <span className='members'>{course.members} leden</span>
            <span className='views'>{course.views} weergaven</span>
            <span className='rating'>⭐ {course.rating}</span>
          </footer>
          <div className='course-actions'>
            <button className='course-button' onClick={handleOpenModal}>
              Meer informatie
            </button>
          </div>
        </div>
      </article>

      {showModal && (
        <div className='modalContainer' onClick={handleCloseModal}>
          <div className='modal'>
            <button
              className='favorite-button'
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Verwijder van favorieten' : 'Voeg toe aan favorieten'}
            >
              <ion-icon
                name={isFavorite ? 'star' : 'star-outline'}
                class='favorite-icon'
              ></ion-icon>
            </button>

            <div className='video-wrapper'>
              <iframe
                src={getYoutubeEmbedUrl(course.videoUrl)}
                title={course.title}
                allowFullScreen
              />
            </div>
            <div className='modal-info'>
              <h2 className='modal-title'>{course.title}</h2>
              <p className='modal-instructor'>
                <strong>Instructeur:</strong> {course.instructor}{' '}
                <span
                  className='modal-instructor-link'
                  onClick={() => {
                    setSearchTerm(course.instructor);
                    setShowModal(false);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSearchTerm(course.instructor);
                      setShowModal(false);
                    }
                  }}
                >
                  meer van {course.instructor}
                </span>
              </p>
              <p>{course.description}</p>
              <dl className='modal-details'>
                <div><dd><strong>Niveau:</strong> {course.level}</dd></div>
                <div><dd><strong>Duur:</strong> {course.duration}</dd></div>
                <div className='modal-tags'>
                  {course.categories.map(tag => (
                    <button
                      key={tag}
                      className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => onTagClick(tag)}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </dl>
              <footer className='modal-footer'>
                <span>{course.members} leden</span>
                <span>{course.views} weergaven</span>
                <span>⭐ {course.rating}</span>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
