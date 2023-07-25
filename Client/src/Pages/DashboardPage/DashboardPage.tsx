import SideBarDash from "../../components/DashboardSide/SideBarDash";
import { DashStore } from "../../Store";
import DashboardHotel from "../../components/Dashboard/DashboardHotels";
import ReservesDashboard from "../../components/Dashboard/DashboardReserves";
import ComentsDashboard from "../../components/Dashboard/DashboardComents";
import { useEffect, useState } from "react";

const DashBoardPage = () => {
  const { coments, hotels, reserves } = DashStore((state) => state)
  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (coments === true) {
      setRenderComponent(< ComentsDashboard />);
    } else if (hotels === true) {
      setRenderComponent(<DashboardHotel />);
    } else if (reserves === true) {
      setRenderComponent(<ReservesDashboard />);
    } else {
      setRenderComponent(<div>No se seleccionó ninguna opción.</div>);
    }
  }, [coments, hotels, reserves]);

  return (
    <div className="flex">
      <div className="w-[300px]">
        <SideBarDash />
      </div>
      <div className="flex-grow bg-blue-600 p-4">
        {renderComponent}
      </div>
    </div>
  );
};

export default DashBoardPage;
