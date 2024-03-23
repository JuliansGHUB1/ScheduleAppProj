import React from 'react';
import './C_HelpSection.css';
import ContactMeFooter from '../components/Z_ContactMeFooter';

function HelpSection() {
  return (
    <section>
      <h2>Help Section</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h3 className="faq-question"><p>🚧 This section is under construction. 🚧</p>
</h3>
          <p className="faq-answer">😀</p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">(...)</h3>
          <p className="faq-answer">(...)</p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">(...)</h3>
          <p className="faq-answer">(...)</p>
        </div>
        {/* Add more FAQ items as needed */}
      </div>
      <ContactMeFooter />
      
    </section>
  );
}

export default HelpSection;
