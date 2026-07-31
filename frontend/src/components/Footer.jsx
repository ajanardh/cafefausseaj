import Newsletter from './Newsletter';
import { contactInfo } from '../data/content';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Café Fausse</h3>
          <p className="text-muted">
            Traditional Italian flavors with modern culinary innovation.
          </p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>{contactInfo.address}</p>
          <p>
            <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
          </p>
        </div>

        <div>
          <h4>Hours</h4>
          <p>{contactInfo.hours.weekday}</p>
          <p>{contactInfo.hours.sunday}</p>
        </div>

        <div>
          <Newsletter compact />
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
