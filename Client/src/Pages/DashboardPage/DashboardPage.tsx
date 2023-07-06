import CrearRoomButton from "../../components/D-CrearRoomButton/CrearRoomButton"
import CrearHostelButton from "../../components/D-CrearHotelButton/CrearHostelButton"


const DashBoardPage = () => {
    return (
        <div>
            <div>

                Este es el dashboard
            </div>

            <div>
              <CrearHostelButton/>
                <CrearRoomButton />
               
            </div>
        </div>
    );
};

export default DashBoardPage;

