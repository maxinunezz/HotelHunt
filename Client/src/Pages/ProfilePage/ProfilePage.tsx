import { tokenStore } from "../../Store";
import ProfileSideBar from "../../components/ProfileSideBar/U-ProfileSideBar";

const ProfilePage = () => {
  const userData = tokenStore((state) => state.userState)
  console.log(userData);

  const user = {
    name: `${userData[0].name}`,
    lastName: `${userData[0].lastName}`,
    dateOfBirth: `${userData[0].birthDate}`,
    phoneNumber: `${userData[0].phoneNumber}`,
  };

  return (
    <div className="flex-auto">
  <div className="flex">
    <ProfileSideBar />
    <div className="w-3/4 mx-auto p-8">
      <h3 className="text-2xl font-bold mb-6 ml-4">Cuenta de Administrador</h3>
      <div className="bg-white rounded shadow p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <span className="text-gray-700 font-semibold">Nombres:</span>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div className="mb-4">
            <span className="text-gray-700 font-semibold">Fecha de Nacimiento:</span>
            <p className="text-gray-900">{user.dateOfBirth}</p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <span className="text-gray-700 font-semibold">Apellidos:</span>
            <p className="text-gray-900">{user.lastName}</p>
          </div>
          <div className="mb-4">
            <span className="text-gray-700 font-semibold">Número de Contacto:</span>
            <p className="text-gray-900">{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
  };
  
  export default ProfilePage;
  