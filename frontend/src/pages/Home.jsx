import { Link } from 'react-router-dom';
import { contactInfo } from '../data/content';
import './Home.css';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="section-label">Fine Dining in Washington, DC</span>
          <h1>Café Fausse</h1>
          <p>
            An unforgettable dining experience blending traditional Italian flavors with
            modern culinary innovation.
          </p>
          <div className="hero-actions">
            <Link to="/reservations" className="btn btn-primary">
              Reserve a Table
            </Link>
            <Link to="/menu" className="btn">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container home-info">
          <div className="card">
            <span className="section-label">Visit Us</span>
            <h3>Location</h3>
            <p>{contactInfo.address}</p>
            <p>
              <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
            </p>
          </div>

          <div className="card">
            <span className="section-label">Hours</span>
            <h3>Open Daily</h3>
            <p>{contactInfo.hours.weekday}</p>
            <p>{contactInfo.hours.sunday}</p>
          </div>

          <div className="card">
            <span className="section-label">Experience</span>
            <h3>Culinary Excellence</h3>
            <p>
              Award-winning cuisine, locally sourced ingredients, and an ambiance designed
              for memorable evenings.
            </p>
            <Link to="/gallery" className="text-gold">
              Explore our gallery →
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-feature">
        <div className="container home-feature-grid">
          <div>
            <span className="section-label">Our Story</span>
            <h2>Crafted with Passion Since 2010</h2>
            <p className="text-muted">
              Founded by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse has
              become a destination for those who appreciate quality, creativity, and warm
              hospitality.
            </p>
            <Link to="/about" className="btn">
              Learn More
            </Link>
          </div>
          <div className="home-feature-image">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80"
              alt="Chef preparing a gourmet dish"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
