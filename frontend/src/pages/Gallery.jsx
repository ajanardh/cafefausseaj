import { useState } from 'react';
import Lightbox from '../components/Lightbox';
import { awards, galleryImages, reviews } from '../data/content';
import './Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Gallery</span>
          <h1>Awards & Gallery</h1>
          <p>
            Explore our ambiance, cuisine, and the recognition we are proud to have earned.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <button
                key={image.src}
                type="button"
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-recognition">
        <div className="container recognition-grid">
          <div className="card">
            <span className="section-label">Recognition</span>
            <h2>Awards</h2>
            <ul className="awards-list">
              {awards.map((award) => (
                <li key={award.title}>
                  <strong>{award.title}</strong>
                  <span>{award.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <span className="section-label">Testimonials</span>
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
              {reviews.map((review) => (
                <blockquote key={review.source}>
                  <p>&ldquo;{review.quote}&rdquo;</p>
                  <cite>— {review.source}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}

export default Gallery;
