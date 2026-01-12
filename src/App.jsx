import React, { useState } from "react";
import "./App.css";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => setShowVenue(true);

  return (
    <Provider store={store}>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1>
            <p className="budget_sentence">Plan your next major event with us!</p>
            <button onClick={handleGetStarted} className="get-started-btn">
              Get Started
            </button>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}>
        <ConferenceEvent />
      </div>
    </Provider>
  );
}

export default App;