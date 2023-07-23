import SideBarDash from "../../components/DashboardSide/SideBarDash"
import { DashStore } from "../../Store";
import DashboardHotel from "../../components/Dashboard/DashboardHotels";

const DashBoardPage = () => { 
    const { coments, hotels } = DashStore((state)=> state)

    const render = () => {

        if(coments === true){
            return // componente coments
        }else if(hotels === true){
            return DashboardHotel();
        }else{
            return // component reservs
        }
    }

    return (
        <div className="flex-auto">
            <div className="flex">
                <SideBarDash />
                <div>
                    {render()}
                </div>
            </div>
        </div>

    );
};

export default DashBoardPage;
