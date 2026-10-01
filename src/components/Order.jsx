import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getOrders } from "../services/orderService.js";
import { createOrder } from "../services/orderService.js";
import { getMenu } from "../services/menuService.js";
import OrderFilterByDate from "./OrderFilterByDate.jsx";

const emptyForm = {
  username: "",
  email: "",
  phoneNumber: "",
  location: "",
  item: "",
  quantity: 0,
  size: "",
  cost: 0,
};

function Order() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => ({ ...emptyForm }));
  const [menuItems, setMenuItems] = useState([]);
  const [dateRange, setDateRange] = useState({
  startDate: "",
  endDate: "",
  });
 
  const [menuError, setMenuError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateChangeFlag, setDateChangeFlag] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
     

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
      
  }


  function handleFilterSubmit(event) {
    event.preventDefault();
    
    console.log("Filter submitted with date range:", dateRange);
    setDateChangeFlag((prev) => !prev);


  }

  
   function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSuccessMessage("");


    createOrder({
    ...form,
    quantity: Number(form.quantity),
    cost: totalCost,
    }, token)
      .then((newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
        setForm({ ...emptyForm });
        setSuccessMessage("Order added successfully!");
      })
      .catch((requestError) => {
        setSubmitError(requestError.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  

  useEffect(() => {
    if (!token) return;

    getOrders(token, dateRange)
      .then(setOrders)
      .catch((requestError) => setError(requestError.message))
      .finally(() => {
        setDateChangeFlag(false);
      });
     
  }, [token, dateChangeFlag]);

  useEffect(() => {
    if (!token) return;

    getMenu(token)
      .then((items) => {
        return setMenuItems(items);
      })
      .catch((requestError) => setMenuError(requestError.message));

  }, [token]);


  const selectedItem = menuItems.find(
  (item) => item.itemName === form.item
  );

const quantity = Number(form.quantity) || 0;

const unitPrice = selectedItem
  ? form.size === "half"
    ? Number(selectedItem.price) / 2
    : form.size === "full"
      ? Number(selectedItem.price)
      : 0
  : 0;

const totalCost = unitPrice * quantity;
console.log("Selected item:", selectedItem);



  if (error) return <p role="alert">{error}</p>;
  

  return (
    <>
  <section className="workspace-section" id="orders">
    <div className="section-heading">
      <h2>Orders</h2>
    </div>
   <form className="surface-panel mb-4" onSubmit={handleSubmit}>
  <div className="panel-heading">
    <div>
      <h3>Add an order</h3>
      <p className="panel-caption">Enter the customer and order details.</p>
    </div>
  </div>
  <div className="row g-3">
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor="order-username">Customer name</label>
      <input className="form-control" id="order-username" name="username" value={form.username} onChange={handleChange} minLength={3} required />
    </div>
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor="order-email">Email</label>
      <input className="form-control" id="order-email" name="email" type="email" value={form.email} onChange={handleChange} required />
    </div>
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor="order-phone">Phone number</label>
      <input className="form-control" id="order-phone" name="phoneNumber" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} value={form.phoneNumber} onChange={handleChange} required />
    </div>
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor="order-location">Location</label>
      <input className="form-control" id="order-location" name="location" value={form.location} onChange={handleChange} required />
    </div>

    {menuError ? <p role="alert">{menuError}</p> :
    <div className="col-12 col-md-6">
  <label className="form-label" htmlFor="order-item">
    Item
  </label>

  <select
    className="form-select"
    id="order-item"
    name="item"
    value={form.item}
    onChange={handleChange}
    required
  >
    <option value="" disabled>
      Select an item
    </option>

    {menuItems
      .filter((item) => item.quantityAvailable > 0)
      .map((item) => (
        <option key={item._id} value={item.itemName}>
          {item.itemName} ({item.quantityAvailable} available)
        </option>
      ))}
  </select>

  {menuError && (
    <p className="text-danger mt-2" role="alert">
      Could not load menu: {menuError}
    </p>
  )}
</div>
    }
    <div className="col-6 col-md-2">
      <label className="form-label" htmlFor="order-quantity" placeholder="Quantity">
        {form.quantity}
      </label>
      <input className="form-control" id="order-quantity" name="quantity" type="number" min="1" max="100" value={form.quantity} onChange={handleChange} required />
    </div>
    <div className="col-6 col-md-2">
      <label className="form-label" htmlFor="order-size">Size</label>
      <select className="form-select" id="order-size" name="size" value={form.size} onChange={handleChange} required >
        <option value="" disabled>Select a size</option>
        <option value="half">Half</option>
        <option value="full">Full</option>
      </select>
    </div>
    <div className="col-12 col-md-2">
      <label className="form-label" htmlFor="order-cost">
  Total cost
</label>
<input
  className="form-control"
  id="order-cost"
  value={totalCost.toFixed(2)}
  readOnly
/>
    <div className="col-12 d-flex align-items-center gap-3">
      <button className="btn btn-accent" type="submit" disabled={isSubmitting || !token} >
        {isSubmitting ? "Adding order..." : "Add order"}
      </button>
      {submitError && <span className="text-danger" role="alert">{submitError}</span>}
      {successMessage && <span className="text-success" role="status">{successMessage}</span>}
    </div>
  </div>
  </div>


</form>

    {error && <p role="alert">{error}</p>}


    <OrderFilterByDate dateRange={dateRange} setDateRange={setDateRange} onFilterSubmit={handleFilterSubmit} />
    
    <div className="orders-scroll">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Placed</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.username}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.size}</td>
              <td>{order.cost}</td>
              <td>{order.status}</td>
              <td>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  </>
);
}

export default Order;
