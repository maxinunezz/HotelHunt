import { SAStore } from "../../Store";
import DashboardHotel from "../../components/Dashboard/DashboardHotels";
import ReservesDashboard from "../../components/Dashboard/DashboardReserves";
import ComentsDashboard from "../../components/Dashboard/DashboardComents";
import { useEffect, useState } from "react";
import SABar from "../../components/SAComponents/SideSap";

const SAPage = () => { 
    const { coments, hotels, reserves, users } = SAStore((state)=> state)
    
    const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);

    useEffect(() => {
        if (coments === true) {
          setRenderComponent(< ComentsDashboard/>);
        } else if (hotels === true) {
          setRenderComponent(<DashboardHotel />);
        } else if (reserves === true) {
          setRenderComponent(<ReservesDashboard />);
        } else if (users === true){
            setRenderComponent(<div>User Component</div>)
        } else {
          setRenderComponent(<div>No se seleccionó ninguna opción.</div>);
        }
      }, [coments, hotels, reserves, users]);

    return (
        <div className="flex-auto">
            <SABar />
            <div className="flex">
                <div>{renderComponent}</div>
            </div>
        </div>

    );
};

export default SAPage;
