import { useLocation } from "react-router-dom";
import DashboardPenjahit from "./../components/dashboard/DashboardPenjahit";
import DashboardUser from "../components/dashboard/DashboardUser";

const DashboardPage = () => {
  const location = useLocation();

  const isUserPage = location.pathname === "/dashboard";

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">
        {isUserPage ? "Dashboard User" : "Dashboard Penjahit"}
      </h1>
      {isUserPage ? <DashboardUser /> : <DashboardPenjahit />}
    </div>
  );
};

export default DashboardPage;
