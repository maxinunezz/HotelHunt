import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrencyDollar, ShoppingCart, Trash } from '@phosphor-icons/react';
import { userStore } from '../../Store/UserStore';

const ShoppingCartPage = () => {
    const navigate = useNavigate()
    
    const userReserve = userStore((state)=>state.reserves)
    const {reserveRoomPayment} = userStore()
    
    const [cartItems, setCartItems] = useState(userReserve); // Aquí se almacenarán los elementos del carrito


   const handleDeleteItem = (roomId:string) => {
    console.log(roomId);

  const newArray = cartItems.filter(element=> element.roomId !== roomId )

  console.log(userReserve);

    reserveRoomPayment(newArray)
    setCartItems(newArray)

  };
  

  const handleCheckout = () => {
    // Lógica para procesar el pago y completar la compra
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {userReserve.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          {userReserve.map((item: any) => (
            <div key={item.roomId} className="flex items-center border-b border-gray-200 py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-500">Price: ${item.price}</p>
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
             
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <button onClick={()=>navigate('/')} className="mt-4 inline-block underline">
        Continue Shopping
      </button>
    </div>
  );
};

export default ShoppingCartPage;