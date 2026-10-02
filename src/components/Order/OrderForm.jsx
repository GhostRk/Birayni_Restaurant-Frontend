

const OrderForm = ({error, form, handleChange,handleCancelEdit, handleSubmit, isSubmitting, submitError, successMessage, menuItems, menuError, totalCost, token, isEditing, handleEditSubmit }) => {
  return (
    <div className="order-form-container">

 <div className="section-heading">
      <h2>Orders</h2>
    </div>
   <form className="surface-panel mb-4" onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
  <div className="panel-heading">
    <div>
      {isEditing ? <h3>Edit Order</h3> : <h3>Add an order</h3>}
      <p className="panel-caption">Enter the customer and order details.</p>
    </div>
  </div>
  <div className="row g-3">
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor="order-username">Customer name</label>
      <input className="form-control" id="order-username" name="username" value={form.username} onChange={handleChange} minLength={3} required />
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
  {isEditing ?( <div className="col-12 d-flex align-items-center gap-3">
    <span><button className="btn btn-accent" onClick={handleCancelEdit} disabled={isSubmitting || !token} >Cancel Editing</button></span>
    <span><button className="btn btn-accent" type="submit" disabled={isSubmitting || !token} >
        {isSubmitting ? "Editing order..." : "Edit order"}
    </button></span>
      {submitError && <span className="text-danger" role="alert">{submitError}</span>}
      {successMessage && <span className="text-success" role="status">{successMessage}</span>}
  </div>) : (
    <div className="col-12 d-flex align-items-center gap-3">
      <button className="btn btn-accent" type="submit" disabled={isSubmitting || !token} >
        {isSubmitting ? "Adding order..." : "Add order"}
      </button>
      {submitError && <span className="text-danger" role="alert">{submitError}</span>}
      {successMessage && <span className="text-success" role="status">{successMessage}</span>}
    </div>)
    }
  </div>
  </div>


</form>

    {error && <p role="alert">{error}</p>}

</div>
  );
}

export default OrderForm;