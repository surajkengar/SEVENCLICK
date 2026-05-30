


function Contactsection(){
    return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-description">
          Have questions or need support? Send us a message and we will get back
          to you.
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter your email" />
          <textarea
            rows="5"
            placeholder="Enter your message"
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
    )
}

export default Contactsection;