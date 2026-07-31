import './About.css';

function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>About Us</h1>
          <p>
            A passion for Italian tradition, modern innovation, and unforgettable hospitality.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container about-intro card">
          <h2>About Café Fausse</h2>
          <p>
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse
            blends traditional Italian flavors with modern culinary innovation. Our mission is
            to provide an unforgettable dining experience that reflects both quality and
            creativity.
          </p>
          <p>
            Every dish celebrates locally sourced ingredients, time-honored techniques, and a
            commitment to excellence that has earned recognition from critics and guests alike.
          </p>
        </div>
      </section>

      <section className="section about-founders">
        <div className="container founders-grid">
          <article className="card founder-card">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce0268709ace?w=600&q=80"
              alt="Chef Antonio Rossi"
            />
            <h3>Chef Antonio Rossi</h3>
            <p className="founder-role">Co-Founder & Executive Chef</p>
            <p className="text-muted">
              Trained in Florence and Rome, Chef Rossi brings decades of experience in
              classical Italian cuisine. His approach honors tradition while embracing
              contemporary techniques to create dishes that surprise and delight.
            </p>
          </article>

          <article className="card founder-card">
            <img
              src="https://images.unsplash.com/photo-1595276673982-883145f92213?w=600&q=80"
              alt="Maria Lopez"
            />
            <h3>Maria Lopez</h3>
            <p className="founder-role">Co-Founder & Restaurateur</p>
            <p className="text-muted">
              With a background in hospitality and design, Maria shapes every detail of the
              Café Fausse experience—from the warm ambiance to partnerships with local farms
              and artisans who share our values.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container about-values card">
          <h2>Our Commitment</h2>
          <div className="values-grid">
            <div>
              <h3>Unforgettable Dining</h3>
              <p className="text-muted">
                We craft each evening to be memorable—from the first welcome to the final
                course.
              </p>
            </div>
            <div>
              <h3>Excellent Food</h3>
              <p className="text-muted">
                Seasonal menus, precise technique, and presentation that honors the ingredients.
              </p>
            </div>
            <div>
              <h3>Locally Sourced</h3>
              <p className="text-muted">
                We partner with regional producers to bring the freshest ingredients to your
                table.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
