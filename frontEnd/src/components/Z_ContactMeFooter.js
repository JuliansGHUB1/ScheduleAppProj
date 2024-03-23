import React from 'react';

function ContactMeFooter() {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Feel free to reach out to me with any questions, comments, or inquiries!</p>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" placeholder="Your message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default ContactMeFooter;
