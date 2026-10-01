import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getMenu, createMenuItem } from "../services/menuService.js";

const emptyForm = {
itemName: "",
quantityAvailable: 0,
price: 0,
unit: "full"
};

function Menu() {
  const { token } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => ({ ...emptyForm }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadError, setLoadError] = useState("");



  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
}
  
   function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSuccessMessage("");

   

    createMenuItem(form, token)
      .then((newMenuItem) => {
       
        setMenuItems((previousItems) => [...previousItems, newMenuItem]);
        setForm({ ...emptyForm });
        setSuccessMessage("Menu item added successfully!");
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

    getMenu(token)
      .then(setMenuItems)
      .catch((requestError) => {
        setError(requestError.message);
        setLoadError("Failed to load menu items.");
      });
  }, [token]);

  if (error) return <p role="alert">{error}</p>;


  return (
    <section className="workspace-section" id="menu">
      <div className="section-heading">
        <h2>Menu</h2>
      </div>

      <form className="surface-panel mb-4" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <div>
            <h3>Add menu item</h3>
            <p className="panel-caption">Enter the item and available quantity.</p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="menu-item-name">
              Item name
            </label>
            <input
              className="form-control"
              id="menu-item-name"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="menu-quantity">
              Quantity available
            </label>
            <input
              className="form-control"
              id="menu-quantity"
              name="quantityAvailable"
              type="number"
              min="0"
              value={form.quantityAvailable}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label" htmlFor="menu-price">
              Price
            </label>
            <input
              className="form-control"
              id="menu-price"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label" htmlFor="menu-unit">
              Unit
            </label>
            <select
              className="form-select"
              id="menu-unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              required
            >
              <option value="full">Full</option>
              <option value="half">Half</option>
            </select>
          </div>

          <div className="col-12 col-md-2 d-flex align-items-end">
            <button
              className="btn btn-accent w-100"
              type="submit"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? "Adding..." : "Add item"}
            </button>
          </div>
        </div>

        {submitError && <p className="text-danger mt-3 mb-0" role="alert">{submitError}</p>}
        {successMessage && <p className="text-success mt-3 mb-0" role="status">{successMessage}</p>}
      </form>

      {loadError && <p className="text-danger" role="alert">{loadError}</p>}

      <div className="orders-scroll">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity available</th>
              <th scope="col">Price</th>
              <th scope="col">Unit</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length === 0 ? (
              <tr>
                <td colSpan="4">No menu items found.</td>
              </tr>
            ) : (
              menuItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.quantityAvailable}</td>
                  <td>{item.price}</td>
                  <td>{item.unit}</td>
                  <td>
                    <button type="button" class="btn btn-danger" >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Menu;
