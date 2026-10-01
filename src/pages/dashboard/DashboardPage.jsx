import Header from "../../components//Header.jsx";
import Customers from "../../components//Customers.jsx";
import Inventory from "../../components//Inventory.jsx";
import Order from "../../components//Order.jsx";
import "../../App.css";


const DashboardPage = () => {
  
  return (
    <div className="app-frame" id="top">
      <Header />
      <main className="admin-main">
        <div className="page-intro">
          <p className="eyebrow">Restaurant operations</p>
          <h1>Today at a glance</h1>
        </div>
        <Order />
        <Inventory />
        <Customers />
      </main>
      <footer className="page-footer">Biryani Restaurant <span>•</span> Operations</footer>
    </div>
  );
}

export default DashboardPage;

