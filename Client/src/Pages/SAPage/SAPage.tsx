import { SAStore } from "../../Store";
import SAHotels from "../../components/SAComponents/SAHotels";
import { useEffect, useState } from "react";
import SABar from "../../components/SAComponents/SideSap";
import SARooms from "../../components/SAComponents/SARoom";
import SAUsers from "../../components/SAComponents/SAUsers";
import SARatings from "../../components/SAComponents/SARatings";

const SAPage = () => {
  const { coments, hotels, users, rooms } = SAStore((state) => state)

  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (coments === true) {
      setRenderComponent(< SARatings />);
    } else if (hotels === true) {
      setRenderComponent(<SAHotels />);
    } else if (users === true) {
      setRenderComponent(<SAUsers />);
    } else if (rooms === true) {
      setRenderComponent(<SARooms/>);
    } else {
      setRenderComponent(<div>No se seleccionó ninguna opción. NELSON,PONELE ESTILO A ESTO, MINIMO</div>);
    }
  }, [coments, hotels, users]);

  return (
    <div className="flex-auto">
      <div className="flex">
        <SABar />
        <div>{renderComponent}</div>
      </div>
    </div>

  );
};

export default SAPage;
