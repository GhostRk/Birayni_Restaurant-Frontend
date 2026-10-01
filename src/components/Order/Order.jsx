import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getOrders } from "../../services/orderService.js";
import { createOrder } from "../../services/orderService.js";
import { getMenu } from "../../services/menuService.js";
import { updateOrder } from "../../services/orderService.js";
import OrderForm from "./OrderComponents/OrderForm.jsx";
import OrderView from "./OrderComponents/OrderView.jsx";

const emptyForm = {
  username: "",
  phoneNumber: "",
  location: "",
  item: "",
  quantity: 0,
  size: "",
  cost: 0,
};

function Order() {
  const { token } = useAuth();
  
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => ({ ...emptyForm }));
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dateRange, setDateRange] = useState({
  startDate: "",
  endDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
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
    setDateChangeFlag((prev) => !prev);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditOrderId(null);
    setForm({ ...emptyForm });
  }


   function handleEdit(order) {
    setIsEditing(true);
    setEditOrderId(order._id);
    setForm({
      username: order.username,
  
      phoneNumber: order.phoneNumber,
      location: order.location,
      item: order.item,
      quantity: order.quantity,
      size: order.size,
      cost: order.cost,
    });

  }


   function handleEditSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSuccessMessage("");
    

    setForm({
      username: form.username,
     
      phoneNumber: form.phoneNumber,
      location: form.location,
      item: form.item,
      quantity: Number(form.quantity),
      size: form.size,
      cost: totalCost,
    });

    const orderId = editOrderId;

    updateOrder(orderId, {
      ...form,
      quantity: (Number(form.quantity)),
      cost: totalCost,
    }, token)
    .then((updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setForm({ ...emptyForm });
      setIsEditing(false);
      setEditOrderId(null);
      setSuccessMessage("Order updated successfully!");
    })
    .catch((requestError) => {
      setSubmitError(requestError.message);
    })
    .finally(() => {
      setIsSubmitting(false);
    });

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
   <OrderForm error={error} form={form} handleCancelEdit={handleCancelEdit} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} successMessage={successMessage} menuItems={menuItems} menuError={menuError} totalCost={totalCost} token={token} isEditing={isEditing} handleEditSubmit={handleEditSubmit} />
    <OrderView orders={orders} handleEdit={handleEdit} dateRange={dateRange} setDateRange={setDateRange} handleFilterSubmit={handleFilterSubmit} />
  </section>
  </>
);
}

export default Order;
