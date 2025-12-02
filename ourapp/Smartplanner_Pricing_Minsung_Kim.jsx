import React from "react";
import "./style.css"; // or your global CSS

export default function Pricing() {
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

      <h2 style={{ textAlign: "center", fontSize: "24px" }}>Pricing Table</h2>

      <section className="pricing">
        <p>
          Smart planners are offered at a very reasonable price because students
          are our main customers. Even with the free plan, there is absolutely
          no problem using it lightly.
          <br />
          Please see the price table below for more information.
        </p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Basic Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free</td>
              </tr>
              <tr>
                <td>Support 2 devices</td>
              </tr>
              <tr>
                <td>50 tasks/month</td>
              </tr>
              <tr>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$15/month</td>
              </tr>
              <tr>
                <td>Support 10 devices</td>
              </tr>
              <tr>
                <td>Unlimited tasks/month</td>
              </tr>
              <tr>
                <td>Third-party calendar integration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          If you would like to purchase a business plan, please contact us at{" "}
          <a href="tel:123-456-7890">(123) 456-7890</a>.
        </p>
      </section>

      <footer>
        <p>
          Disclaimer Statement: This is a fictitious company made by Smart
          Planner Team and is developed as an education project.
        </p>
        <p>© 2025 Smart Planner. All rights reserved.</p>

        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
