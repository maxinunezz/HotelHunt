import { Dropdown, Button } from "@rewind-ui/core";
import { MouseEvent, useState } from "react";
import { tokenStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import { farewellAdminToast } from "../toast";
import { userStore } from "../../Store/UserStore";

const AdminMenu = () => {
  const navigate = useNavigate();
  const { reset } = userStore();
  const isAdmin = tokenStore((state) => state.userState); 
  const [selectedOption] = useState<string | undefined>();
  const { resetToken } = tokenStore();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.sessionStorage.removeItem('tokenUser');
    window.sessionStorage.removeItem('SALoginInfo');
    window.sessionStorage.removeItem('token');
    document.cookie = "json=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    resetToken();
    farewellAdminToast("Gracias y éxito en sus ventas");
    navigate("/farewell");
    reset("favoriteHotel");
  };
  return (
    <div>
      <Dropdown trigger="hover">
        <Dropdown.Trigger>
          <Button className="w-500">
            {selectedOption ?? `${isAdmin[0].name} ${isAdmin[0].lastName[0]}.`}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            onClick={() =>
              navigate(`/profile/${isAdmin[0].name}+${isAdmin[0].lastName}`)
            }
          >
            Perfil
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/dashboard")}>
            Admin
          </Dropdown.Item>

          <Dropdown.Item onClick={(event) => handleClick(event)}>
            Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};

export default AdminMenu;
