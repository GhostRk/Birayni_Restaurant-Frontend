import Header from "../../components/Header.jsx";

const CustomersPage = () => {
  return (
    <div className="app-frame" id="top">
      <Header />
      <main className="admin-main">
        <div className="page-intro">
          <p className="eyebrow">Customer Management</p>
          <h1>Manage Customers</h1>
        </div>
      </main>
      <footer className="page-footer">Biryani Restaurant <span>•</span> Operations</footer>
    </div>
  );
}

export default CustomersPage;
