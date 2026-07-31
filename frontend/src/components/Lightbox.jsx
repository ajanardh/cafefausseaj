import { useEffect } from 'react';
import './Lightbox.css';

function Lightbox({ image, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!image) {
    return null;
  }

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <img src={image.src} alt={image.alt} />
        <p>{image.caption}</p>
      </div>
    </div>
  );
}

export default Lightbox;
