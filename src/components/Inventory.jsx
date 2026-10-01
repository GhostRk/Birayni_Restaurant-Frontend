import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getInventory } from "../services/inventoryService.js";
import { createInventory } from "../services/inventoryService.js";

const emptyForm = {
itemName: "",
quantityAvailable: 0,
price: 0,
unit: "full"
};

function Inventory() {
  const { token } = useAuth();
  const [inventory, setInventory] = useState([]);
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

   

    createInventory(form, token)
      .then((newInventoryItem) => {
       
        setInventory((prevInventory) => [...prevInventory, newInventoryItem]);
        setForm({ ...emptyForm });
        setSuccessMessage("Inventory item added successfully!");
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

    getInventory(token)
      .then(setInventory)
      .catch((requestError) => {
        setError(requestError.message);
        setLoadError("Failed to load inventory.");
      });
  }, [token]);

  if (error) return <p role="alert">{error}</p>;


  return (
    <section className="workspace-section" id="inventory">
      <div className="section-heading">
        <h2>Inventory</h2>
      </div>

      <form className="surface-panel mb-4" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <div>
            <h3>Add inventory item</h3>
            <p className="panel-caption">Enter the item and available quantity.</p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="inventory-item-name">
              Item name
            </label>
            <input
              className="form-control"
              id="inventory-item-name"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="inventory-quantity">
              Quantity available
            </label>
            <input
              className="form-control"
              id="inventory-quantity"
              name="quantityAvailable"
              type="number"
              min="0"
              value={form.quantityAvailable}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label" htmlFor="inventory-price">
              Price
            </label>
            <input
              className="form-control"
              id="inventory-price"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label" htmlFor="inventory-unit">
              Unit
            </label>
            <select
              className="form-select"
              id="inventory-unit"
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
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="4">No inventory items found.</td>
              </tr>
            ) : (
              inventory.map((item) => (
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

export default Inventory;