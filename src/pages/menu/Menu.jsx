import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMenu, createMenuItem } from "../../services/menuService.js";
import MenuForm from "../../components/Menu/MenuForm.jsx";
import MenuView from "../../components/Menu/MenuView.jsx";

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

    <MenuForm token={token} form={form} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} successMessage={successMessage} loadError={loadError} />

     {loadError && <p className="text-danger" role="alert">{loadError}</p>}

     <MenuView menuItems={menuItems} />
    </section>
  );
}

export default Menu;
