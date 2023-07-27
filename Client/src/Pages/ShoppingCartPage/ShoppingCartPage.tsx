import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrencyDollar, Trash } from '@phosphor-icons/react';
import { userStore } from '../../Store/UserStore';
import { roomsStore, tokenStore } from '../../Store';

const ShoppingCartPage = () => {
  const navigate = useNavigate()
  const allRooms = roomsStore((state) => state.rooms);
  const urlPayment = userStore((state) => state.urlPayment)
  const token = tokenStore((state) => state.userState)

  const calculateDays = (item:any) => {
    const checkinDate = new Date(item.checkin);
    const checkoutDate = new Date(item.checkout);

    const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();

    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));



    return differenceInDays;
  };

  const userReserve = userStore((state) => state.reserves)
  const { reserveRoomPayment } = userStore()

  const [cartItems, setCartItems] = useState(userReserve); 


  const handleDeleteItem = (roomId: string) => {

    const newArray = cartItems.filter(element => element.roomId !== roomId)


    reserveRoomPayment(newArray)
    setCartItems(newArray)

  };


  const handleCheckout = () => {

    window.sessionStorage.setItem('token', JSON.stringify(token));

    console.log("Handler");

  };

  const roomName = (item: any) => {
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

  const roomPhoto = (item: any) => {
    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].id === item.roomId) {
        return allRooms[i].photo[0]
      }
    }
  };
  const totalValueCart = userReserve.reduce((total, reserve) => {
    const parcialPrice = Number(reserve.price) * calculateDays(reserve);
    return total + parcialPrice;
  }, 0);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

        {userReserve.length === 0 ? (
          <p className="text-xl text-gray-600">No items in the cart.</p>
        ) : (
          <div>
            {userReserve.map((item: any) => (
              <div key={item.roomId} className="flex items-center border-b border-gray-200 py-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                  <img src={roomPhoto(item)} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="text-xl font-medium">{roomName(item)}</div>
                  <p className="text-sm text-gray-600">Dias: {calculateDays(item)}</p>
                  <p className="text-sm text-gray-600">Precio por noche: ${item.price}</p>
                  <p className="text-sm text-gray-600">Precio por días: ${item.price * calculateDays(item)}</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.roomId)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between border-t border-gray-200 py-4">
              <h3 className="text-xl font-medium">Total:</h3>
              <span className="text-2xl font-bold">
                <CurrencyDollar size={24} className="inline-block align-middle" />
                {totalValueCart}
              </span>
            </div>
            <Link to={urlPayment}>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-bold transition-colors duration-200"
              >
                Efectuar pago
              </button>
            </Link>
          </div>
        )}

        <button onClick={() => navigate(-1)} className="mt-6 inline-block underline text-blue-500 hover:text-blue-700">
          Seguir Reservando
        </button>
      </div>
    </div>




  );
};

export default ShoppingCartPage;