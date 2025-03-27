import { useLocation } from "react-router-dom";
import DashboardPenjahit from "./../components/dashboard/DashboardPenjahit";
import DashboardUser from "../components/dashboard/DashboardUser";

const DashboardPage = () => {
  const location = useLocation();

  const isUserPage = location.pathname === "/dashboard";

  return (
    <div className=" container mx-auto min-h-screen max-w-screen overflow-x-hidden px-8 lg:px-16 py-8 ">
      <h1 className="text-lg sm:text-2xl font-semibold mb-8">
        {isUserPage ? "Dashboard User" : "Dashboard Penjahit"}
      </h1>
      {isUserPage ? <DashboardUser /> : <DashboardPenjahit />}
    </div>
  );
};

export default DashboardPage;
