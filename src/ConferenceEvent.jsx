import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
import "./ConferenceEvent.css";

const ConferenceEvent = () => {
  const dispatch = useDispatch();

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // VENUE handlers
  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    )
      return;
    dispatch(incrementQuantity(index));
  };
  const handleRemoveFromCart = (index) => dispatch(decrementQuantity(index));

  // AV handlers
  const handleIncrementAvQuantity = (index) => dispatch(incrementAvQuantity(index));
  const handleDecrementAvQuantity = (index) => dispatch(decrementAvQuantity(index));

  // MEALS handlers
  const handleMealSelection = (index) => dispatch(toggleMealSelection(index));

  // Calculate total cost
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => (totalCost += item.cost * item.quantity));
    } else if (section === "av") {
      avItems.forEach((item) => (totalCost += item.cost * item.quantity));
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost * numberOfPeople;
        }
      });
    }
    return totalCost;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  // Gather all selected items for table display
  const getItemsFromTotalCost = () => {
    const items = [];

    venueItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "venue" });
    });

    avItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "av" });
    });

    mealsItems.forEach((item) => {
      if (item.selected) items.push({ ...item, type: "meals" });
    });

    return items;
  };

  const items = getItemsFromTotalCost();

  return (
    <>
      {/* VENUE */}
      <div className="venue_container container_main">
        <h1>Venue Selection</h1>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <img src={item.img} alt={item.name} />
              <div>{item.name}</div>
              <div>${item.cost}</div>
              <div className="button_container">
                <button onClick={() => handleRemoveFromCart(index)}>−</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleAddToCart(index)}
                  disabled={
                    item.name === "Auditorium Hall (Capacity:200)" &&
                    item.quantity >= 3
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

      {/* ADD-ONS / AV */}
      <div className="venue_container container_main">
        <h1>Add-ons Selection</h1>
        <div className="addons_selection">
          {avItems.map((item, index) => (
            <div className="av_data venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
              <div className="addons_btn">
                <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}>−</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${avTotalCost}</div>
      </div>

      {/* MEALS */}
      <div className="venue_container container_main">
        <h1>Meals Selection</h1>

        <div className="input-container venue_selection">
          <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
          <input
            type="number"
            id="numberOfPeople"
            className="input_box5"
            value={numberOfPeople}
            min="1"
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          />
        </div>

        <div className="meal_selection">
          {mealsItems.map((item, index) => (
            <div className="meal_item" key={index} style={{ padding: 15 }}>
              <div className="inner">
                <input
                  type="checkbox"
                  id={`meal_${index}`}
                  checked={item.selected}
                  onChange={() => handleMealSelection(index)}
                />
                <label htmlFor={`meal_${index}`}>{item.name}</label>
              </div>
              <div className="meal_cost">${item.cost}</div>
            </div>
          ))}
        </div>

        <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
      </div>

      {/* SELECTED ITEMS TABLE */}
      <div className="total_amount_detail">
        <h2>Selected Items Details</h2>
        <ItemsDisplay items={items} numberOfPeople={numberOfPeople} />
        <div className="total_cost">
          <strong>Total: ${venueTotalCost + avTotalCost + mealsTotalCost}</strong>
        </div>
      </div>
    </>
  );
};

// COMPONENT TO DISPLAY TABLE
const ItemsDisplay = ({ items, numberOfPeople }) => {
  return (
    <div className="display_box1">
      {items.length === 0 && <p>No items selected</p>}
      {items.length > 0 && (
        <table className="table_item_data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>
                  {item.type === "meals" ? `For ${numberOfPeople} people` : item.quantity}
                </td>
                <td>
                  {item.type === "meals" ? item.cost * numberOfPeople : item.cost * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConferenceEvent;