import DashboardDetails from "../../components/Dashboard/DashboardDetails";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import NavBarDashboard1 from "../../components/Dashboard/NavBarDashboard1";

const DashBoardPage = () => {
    return (
        <div className="flex bg-slate-100 h-full overflow-hidden">
            <div className="flex flex-col flex-1">
                <div className="p-4">
                    <DashboardHeader />
                </div>
                <div className="flex-1 bg-white p-4 flex flex-col">
                    <NavBarDashboard1 />
                    <div className="mt-4">
                        <DashboardDetails />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DashBoardPage;
