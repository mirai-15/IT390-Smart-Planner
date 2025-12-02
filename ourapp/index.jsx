import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function AboutSmartPlanner() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBNwZRftT8Cn8DufLbmddKHvK0lMhRRxlU",
      authDomain: "smartplanner-f2540.firebaseapp.com",
      projectId: "smartplanner-f2540",
      storageBucket: "smartplanner-f2540.firebasestorage.app",
      messagingSenderId: "469173527661",
      appId: "1:469173527661:web:b27cff5519aedd4a338b64",
      measurementId: "G-7Y8EZVY7M0"
    };

    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginBtn = document.getElementById("loginBtn");
    const demoBtn = document.getElementById("demoBtn");

    function updateDemoButton(user) {
      if (!demoBtn) return;
      if (user) {
        demoBtn.textContent = "Access My Smart Planner";
        demoBtn.onclick = () => (window.location.href = "Smartplanner_demo_full_calendar.html");
      } else {
        demoBtn.textContent = "Try Smart Planner Demo";
        demoBtn.onclick = () => window.open("Smartplanner_demo_full_calendar.html", "_blank");
      }
    }

    onAuthStateChanged(auth, (user) => {
      if (!loginBtn) return;
      if (user) {
        loginBtn.textContent = `Welcome, ${user.displayName}! (Log out)`;
        localStorage.setItem("userUID", user.uid);
        loginBtn.onclick = () => {
          auth.signOut().then(() => {
            localStorage.removeItem("userUID");
            alert("You've logged out!");
          });
        };
        updateDemoButton(user);
      } else {
        loginBtn.textContent = "Log in with Google";
        loginBtn.onclick = () => {
          signInWithPopup(auth, provider)
            .then((res) => {
              const user = res.user;
              loginBtn.textContent = `Welcome, ${user.displayName}! (Log out)`;
              localStorage.setItem("userUID", user.uid);
              updateDemoButton(user);
            })
            .catch((err) => console.error("Login Error:", err));
        };
        updateDemoButton(null);
      }
    });
  }, []);

  function displayPricing() {
    alert("Basic Plan: Free\nPremium Plan: 15.99/month\nMore details on the pricing page.");
  }

  return (
    <div>
      <header>
        <h1>Smart Planner</h1>
        <p>Plan Smarter, Stress Less</p>
        <button className="page_Button" id="loginBtn">Login with Google</button>
      </header>

      <nav>
        <a href="/">About</a>
        <a href="/pricing">Pricing</a>
        <a href="/contact">Contact</a>
      </nav>

      <h2 style={{ textAlign: "center", fontSize: "24px" }}>About Smart Planner</h2>
      <button className="page_Button" onClick={displayPricing}>Show Pricing</button>
      <button className="page_Button" id="demoBtn">Try Smart Planner Demo</button>

      <img src="app_prototype.png" alt="Smart Planner Prototype" className="prototype" />

      <section className="about">
        <p>Smart Planner is designed for students to efficiently manage classes, assignments, personal tasks, and so on.</p>
        <p>
          Our intelligent scheduling system automatically identifies free time slots on the calendar and optimizes tasks to
          ensure a balanced and productive day.
        </p>
        <h2>With Smart Planner, you can:</h2>
        <ul>
          <li>Automatically fill your calendar with to-do lists.</li>
          <li>Maintain your fixed schedule without conflicts.</li>
          <li>Track your progress and stay organized effortlessly.</li>
        </ul>
        <p>
          Smart Planner empowers you to focus on what matters most, helping you stay productive, reduce stress, and achieve
          your goals efficiently.
        </p>
      </section>

      <footer>
        <p>Disclaimer Statement: This is a fictitious company made by Smart Planner Team and is developed as an education project.</p>
        <p>© 2025 Smart Planner. All rights reserved.</p>
        <a href="/privacy" target="_blank">Privacy Policy</a>
      </footer>
    </div>
  );
}