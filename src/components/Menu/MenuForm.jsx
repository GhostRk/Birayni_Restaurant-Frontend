

const MenuForm = ({token, form, handleChange, handleSubmit , isSubmitting, submitError, successMessage }) => {
  return (
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

       

    );
}

export default MenuForm;