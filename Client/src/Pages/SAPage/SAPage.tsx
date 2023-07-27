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
      setRenderComponent(<SARatings />);
    } else if (hotels === true) {
      setRenderComponent(<SAHotels />);
    } else if (users === true) {
      setRenderComponent(<SAUsers />);
    } else if (rooms === true) {
      setRenderComponent(<SARooms />);
    } else {
      setRenderComponent(
        <div className="bg-slate-600 h-screen w-full flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            ¡Bienvenido al Panel de Superadmin de{" "}
            <span className="text-[40px] font-bold tracking-wider">HOTEL</span>
            <span className="text-blue-500 text-[40px] font-extrabold tracking-wider">HUNT</span>!
          </h1>
          <p className="text-2xl text-center">
            Gestiona y administra todos los aspectos de hoteles en HotelHunt.
          </p>
          <p className="text-xl text-center mt-4">
            Explora, administra y descubre los mejores hoteles para nuestros usuarios.
          </p>
        </div>
      );
    }
  }, [coments, hotels, users, rooms]);

  return (
    <div className="flex-auto bg-slate-600">
      <div className="flex">
        <SABar />
        <div className="w-full">{renderComponent}</div>
      </div>
    </div>
  );




};

export default SAPage;
