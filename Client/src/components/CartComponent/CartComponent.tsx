import { Dropdown, Button } from "@rewind-ui/core";
import {
  CurrencyDollar,
  Money,
  ShoppingCart,
  Trash,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../Store/UserStore";
import { useEffect, useState } from "react";
import { roomsStore } from "../../Store/RoomsStores";
import { tokenStore } from "../../Store";
import { ReserveBooking } from "../../Pages/RoomPage/RoomPage";
import { farewellToast } from "../toast";

const CartComponent = () => {
  const navigate = useNavigate();
  const userReserve = userStore((state) => state.reserves);
  const allRooms = roomsStore((state) => state.rooms);
  const token = tokenStore((state) => state.userState);

  const calculateDays = (item:any) => {
    // Convertir las fechas a objetos Date
    const checkinDate = new Date(item.checkin);
    const checkoutDate = new Date(item.checkout);

    // Calcular la diferencia en milisegundos entre las fechas
    const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();

    // Convertir la diferencia en dÃ­as
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));



    return differenceInDays;
  };

  const { reserveRoomPayment, roomPayment } = userStore();

  const [cartItems, setCartItems] = useState(userReserve); // Aquí se almacenarán los elementos del carrito

  const handleDeleteItem = (roomId: string) => {
    const newArray = cartItems.filter((element) => element.roomId !== roomId);

    reserveRoomPayment(newArray);
    setCartItems(newArray);


  };

  const calculateTotalPay = () => {

    const totales = userReserve.map(element => {


      return (Number(element.price) * calculateDays(element))
    })

    const sum = totales.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return sum


  }

  const roomPhoto = (item: any) => {
    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].id === item.roomId) {
        return allRooms[i].photo[0]
      }
    }
  };

  const roomName = (item: any) => {

    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].id === item.roomId) {
        return (
          <div>
            <p>{allRooms[i].name}</p>
            <p>
              checkin:{item.checkin}
              checkout:{item.checkout}
            </p>
          </div>
        );
      }
    }
  };
  
  const [reserveLocal, setReserveLocal] = useState<ReserveBooking[]>([])

  useEffect(() => {
    setReserveLocal(userReserve);
  }, [userReserve]);
  

  const handleCheckout = async () => {
    if (userReserve.length === 0) {
      return alert('Agregar habitación');
    }

    const data = {
      roomsToReserve: reserveLocal
    }

   farewellToast('Loading...')
    await roomPayment(data, token[1]);
  
    
    navigate('/shoppingcart')

    //  reset() //esta linea resetea el estado global del carrito  porque la app aun no tiene respuesta del pago

  };





  return (
    <div>
      <Dropdown
        itemColor="red"
        radius="none"
        shadow="sm"
        size="lg"
        outsidePress={false}
        trigger="hover"
        tone="light"
        withChevron={false}
        className="relative"
      >
        <Dropdown.Trigger className="flex items-center">
          <Button
            className="  font-medium hover:text-blue-500"
          >
            <ShoppingCart size={30} weight="duotone" className="mr-2" />
            Carrito ({userReserve.length})
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content >
          <div>
            {userReserve.map((item: any) => (
              <Dropdown.Item
                className="flex items-center justify-between py-4"
                key={item.roomId}
              >
                <div className="flex items-center ">
                  <img
                    src={roomPhoto(item)}
                    alt=""
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                   <div className="font-medium mb-1">{roomName(item)}</div>
                    <p className="text-sm text-gray-600">Dias: {calculateDays(item)}</p>
                    <p className="text-sm text-gray-600">Precio: ${item.price * calculateDays(item)}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleDeleteItem(item.roomId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  variant="danger"
                >
                  <Trash size={25} weight="duotone" />
                </Button>
              </Dropdown.Item>
            ))}
          </div>

          <Dropdown.Divider color="slate" />

          <div className="flex items-center justify-center py-4">
            <div className="font-bold text-black">Total:</div>
            <span className="text-green-500 font-bold">
              <CurrencyDollar size={21} weight="duotone" />
            </span>
            <div className="font-bold text-green-500">
              {calculateTotalPay()}
            </div>
          </div>


          <Dropdown.Divider color="dark" />

          <Dropdown.Item
            onClick={handleCheckout}
            color="green"
            className="flex justify-center items-center py-4"
          >
            <Money size={20} weight="duotone" className="mr-2" />
            Verificar
          </Dropdown.Item>

          <Dropdown.Divider />
        </Dropdown.Content>
      </Dropdown>
    </div>

  );
};

export default CartComponent;
