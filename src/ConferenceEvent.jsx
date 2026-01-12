import React, { useState } from "react";
import "./ConferenceEvent.css";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const venueItems = useSelector((state) => state.venue);
  const dispatch = useDispatch();

  const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

  const handleToggleItems = () => setShowItems(!showItems);

  const handleAddToCart = (index) => {
    if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) return;
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) dispatch(decrementQuantity(index));
  };

  const calculateTotalCost = () => {
    return venueItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  };
  const venueTotalCost = calculateTotalCost();

  const navigateToProducts = (idType) => {
    const section = document.querySelector(idType);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    if (!showItems) setShowItems(true);
  };

  return (
    <>
      <nav className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>Meals</a>
          </div>
          <button className="details_button" onClick={handleToggleItems}>
            {showItems ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </nav>

      <div className="main_container">
        {showItems && (
          <div className="items-information">

            {/* Venue Section */}
            <div id="venue" className="venue_container container_main">
              <h1>Venue Room Selection</h1>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img"><img src={item.img} alt={item.name} /></div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-disabled" : "btn-minus"}
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        −
                      </button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className={
                          item.name === "Auditorium Hall (Capacity:200)"
                            ? remainingAuditoriumQuantity === 0 ? "btn-disabled" : "btn-plus"
                            : item.quantity === 10 ? "btn-disabled" : "btn-plus"
                        }
                        onClick={() => handleAddToCart(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* Add-ons Section */}
            <div id="addons" className="venue_container container_main">
              <h1>Add-ons Selection</h1>
              <div className="addons_selection">{/* Add-ons UI */}</div>
              <div className="total_cost">Total Cost: $0</div>
            </div>

            {/* Meals Section */}
            <div id="meals" className="venue_container container_main">
              <h1>Meals Selection</h1>
              <div className="input-container venue_selection">{/* Meals UI */}</div>
              <div className="meal_selection">{/* Meal items */}</div>
              <div className="total_cost">Total Cost: $0</div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;