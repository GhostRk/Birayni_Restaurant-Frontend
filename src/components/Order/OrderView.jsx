import OrderFilterByDate from "./OrderViewComponent/OrderFilterByDate.jsx";


const OrderView = ({ orders, handleEdit, dateRange, setDateRange, handleFilterSubmit }) => {
  return (
    <div className="orders-view">

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
                <button type="button" onClick={() => handleEdit(order)}>
                  Edit
                </button>
              </td>
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
   
   </div>
   
  );
}

export default OrderView;