import DashboardDetails from "../../components/Dashboard/DashboardDetails";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import NavBarDashboard1 from "../../components/Dashboard/NavBarDashboard1";






const DashBoardPage = () => {
    return (
        <div className="flex flex-col bg-slate-100 rounded-lg p-4 h-full overflow-hidden">
            <DashboardHeader />
            <NavBarDashboard1 />
            <DashboardDetails/>
        </div>
    );
};

export default DashBoardPage;
