 
 const MenuView = ({ menuItems }) => {
  return (
 
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
  );
}

export default MenuView;