import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrencyDollar, ShoppingCart, Trash } from '@phosphor-icons/react';
import { userStore } from '../../Store/UserStore';
import { roomsStore, tokenStore } from '../../Store';

const ShoppingCartPage = () => {
  const navigate = useNavigate()
  const allRooms = roomsStore((state) => state.rooms);
  const urlPayment = userStore((state) => state.urlPayment)
  const sessionId = userStore((state) => state.sessionIdUser)
  const allSessionData = userStore((state) => state.allSessionData)
  const token = tokenStore((state) => state.userState)
  console.log(allSessionData);

  const calculateDays = (item) => {
    // Convertir las fechas a objetos Date
    const checkinDate = new Date(item.checkin);
    const checkoutDate = new Date(item.checkout);

    // Calcular la diferencia en milisegundos entre las fechas
    const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();

    // Convertir la diferencia en dÃ­as
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));



    return differenceInDays;
  };

  const userReserve = userStore((state) => state.reserves)
  const { reserveRoomPayment } = userStore()

  const [cartItems, setCartItems] = useState(userReserve); // Aquí se almacenarán los elementos del carrito


  const handleDeleteItem = (roomId: string) => {
    console.log(roomId);

    const newArray = cartItems.filter(element => element.roomId !== roomId)

    console.log(userReserve);

    reserveRoomPayment(newArray)
    setCartItems(newArray)

  };


  const handleCheckout = () => {
    // Lógica para procesar el pago y completar la compra

    window.sessionStorage.setItem('token', JSON.stringify(token));

    console.log("Handler");

  };

  const roomName = (item) => {
    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].id === item.roomId) {
        return (
          <div>
            <p>{allRooms[i].name}</p>
            <div className='bg-teal-300 flex space-x-2'>
              <p>checkin:{item.checkin}</p>
              <p>checkout:{item.checkout}</p>
            </div>
          </div>
        );
      }
    }
  };

  const roomPhoto = (item) => {
    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].id === item.roomId) {
        return allRooms[i].photo[0]
      }
    }
  };
  const totalValueCart = userReserve.reduce((total, reserve) => {
    const parcialPrice = reserve.price * calculateDays(reserve);
    return total + parcialPrice;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {userReserve.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          {userReserve.map((item: any) => (
            <div key={item.roomId} className="flex items-center border-b border-gray-200 py-2">
              <div className="w-[100px] h-[100px] flex justify-center items-center text-center">
                <img src={roomPhoto(item)} alt="" />
              </div>
              <div className="flex flex-col ml-2">
                <div>{roomName(item)}</div>
                <p>Dias: {calculateDays(item)}</p>
                <p>Precio por noche: ${item.price}</p>
                <p>Precio por días: ${item.price * calculateDays(item)}</p>
              </div>
              <button
                onClick={() => handleDeleteItem(item.roomId)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <h3 className="text-lg font-medium">Total:</h3>
            <span className="text-2xl font-bold">
              <CurrencyDollar size={24} className="inline-block align-middle" />
              {totalValueCart}
            </span>
          </div>
          <Link to={urlPayment}>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="mt-4 inline-block underline">
        Continue Shopping
      </button>
    </div>
  );
};

export default ShoppingCartPage;