import { useEffect } from 'react';
import './Lightbox.css';

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose]);

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
