import Header from "../../components//Header.jsx";
import Customers from "../../components//Customers.jsx";
import Menu from "../../components/Menu.jsx";
import Order from "../../components/Order/Order.jsx";
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
        <Menu />
        <Customers />
      </main>
      <footer className="page-footer">Biryani Restaurant <span>•</span> Operations</footer>
    </div>
  );
}

export default DashboardPage;
