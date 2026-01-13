import React from "react";
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
  // Calculate total amount by summing all sections
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <p className="preheading">
            <h3>Общая стоимость мероприятия</h3>
          </p>
        </div>

        {/* Display total amount */}
        <h2 id="pre_fee_cost_display" className="price">
          ${total_amount}
        </h2>

        {/* Render the selected items table */}
        <div className="render_items">
          <ItemsDisplay />
        </div>
      </div>
    </div>
  );
};

export default TotalCost;