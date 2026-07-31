import { menuCategories } from '../data/content';
import './Menu.css';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function Menu() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Dining</span>
          <h1>Our Menu</h1>
          <p>
            Seasonal ingredients, classic techniques, and thoughtful presentation in every
            course.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container menu-grid">
          {menuCategories.map((category) => (
            <article key={category.name} className="menu-category card">
              <h2>{category.name}</h2>
              <ul className="menu-list">
                {category.items.map((item) => (
                  <li key={item.name} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{formatPrice(item.price)}</span>
                    </div>
                    <p className="text-muted">{item.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Menu;
