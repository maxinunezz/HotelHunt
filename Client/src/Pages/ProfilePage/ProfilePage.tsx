import { tokenStore } from "../../Store";

const fotoProvisoria = "https://i.pinimg.com/564x/2c/56/eb/2c56ebc89b30b98254177b1bb65b64cb.jpg"

const ProfilePage = () => {
    const userData = tokenStore((state) => state.userState)
    console.log(userData);
    
    const user = {
      name: `${userData[0].name} ${userData[0].lastName}`,
      dateOfBirth: `${userData[0].birthDate}`,
      phoneNumber: `${userData[0].phoneNumber}`,
      photoUrl: fotoProvisoria,
    };
  
    const reservations = [
      {
        hotel: "Hotel A",
        room: "Standard Room",
        checkInDate: "10/07/2023",
        checkOutDate: "15/07/2023",
        price: "$200",
      },
      {
        hotel: "Hotel B",
        room: "Deluxe Suite",
        checkInDate: "20/07/2023",
        checkOutDate: "25/07/2023",
        price: "$300",
      },
    ];
  
    return (
        //div padre
      <div className="flex justify-start mt-8 bg-green-700"> 
      {/*Div de la info de usuario */}
        <div className="w-[80%] max-w-[400px] h-[500px] rounded-lg shadow-lg p-8 bg-amber-300"> 
          <div className="flex items-center">
            <img
              src={user.photoUrl}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>   
              <p className="text-gray-600">Fecha de nacimiento: {user.dateOfBirth}</p>
              <p className="text-gray-600">Teléfono: {user.phoneNumber}</p>
            </div>
          </div>
        </div>
              {/*div de reservas */}
        <div className="ml-8 bg-lime-200 w-[70%]"> 
          <div className="text-2xl font-bold mb-4">Reservas</div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2">Hotel</th>
                  <th className="py-2">Habitación</th>
                  <th className="py-2">Fecha de ingreso</th>
                  <th className="py-2">Fecha de salida</th>
                  <th className="py-2">Precio</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td className="py-2">{reservation.hotel}</td>
                    <td className="py-2">{reservation.room}</td>
                    <td className="py-2">{reservation.checkInDate}</td>
                    <td className="py-2">{reservation.checkOutDate}</td>
                    <td className="py-2">{reservation.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  