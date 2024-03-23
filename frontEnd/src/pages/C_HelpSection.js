import React from 'react';
import './C_HelpSection.css';
import ContactMeFooter from '../components/Z_ContactMeFooter';

function HelpSection() {
  return (
    <section>
      <h2>Help Section</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h3 className="faq-question">What is Lorem Ipsum?</h3>
          <p className="faq-answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">Why do we use it?</h3>
          <p className="faq-answer">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">Where does it come from?</h3>
          <p className="faq-answer">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
        </div>
        {/* Add more FAQ items as needed */}
      </div>
      <ContactMeFooter />
      
    </section>
  );
}

export default HelpSection;
