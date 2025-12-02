import React from "react";
import "./style.css"; // or your globals.css if using Tailwind

export default function Contact() {
  return (
    <div>
      <header>
        <h1>Smart Planner</h1>
        <p>Plan Smarter, Stress Less</p>
      </header>

      <nav>
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
        <a href="/contact">Contact</a>
      </nav>

      <section className="contact">
        <h2>Contact Us</h2>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8093.864054030498!2d-77.31174709999999!3d38.831457799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64e607b427ebd%3A0xd766a653e6557544!2sGeorge%20Mason%20University!5e1!3m2!1sen!2sus!4v1757020714022!5m2!1sen!2sus"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GMU Map"
          ></iframe>
        </div>

        <p>Please contact us using one of two methods.</p>

        <p>
          Email:{" "}
          <a href="mailto:example@gmu.edu">example@gmu.edu</a>
          {" "}
          Telephone:{" "}
          <a href="tel:123-456-7890">(123) 456-7890</a>
        </p>
      </section>

      <footer>
        <p>
          Disclaimer Statement: This is a fictitious company made by Smart Planner
          Team and is developed as an education project.
        </p>
        <p>© 2025 Smart Planner. All rights reserved.</p>

        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
