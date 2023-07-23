import { Dropdown, Button, Input } from '@rewind-ui/core';
import { useState } from 'react';
import { tokenStore } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { farewellAdminToast, reserveErrorToast } from '../toast';
import { userStore } from '../../Store/UserStore';


const AdminMenu = () => {
    const navigate = useNavigate()
    const hotelFavorite= userStore((state)=>state.favoriteHotel)
    const {reset} = userStore()
    const isAdmin = tokenStore((state) => state.userState)  //análogo a UserMenu
    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    const { resetToken } = tokenStore()
    const handleClick = (event) => {
        event.preventDefault()
        document.cookie = "json=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        resetToken()
        farewellAdminToast("Gracias y éxito en sus ventas")
        navigate('/farewell')
        reset('favoriteHotel')

    }
    return (
        <div>
            <Dropdown trigger="hover">
                <Dropdown.Trigger>
                    <Button className="w-500">{selectedOption ?? `${isAdmin[0].name} ${isAdmin[0].lastName[0]}.`}</Button>
                    
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={() => navigate(`/adminprofile/${isAdmin[0].name}+${isAdmin[0].lastName}`)}>
                        Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/dashboard')}>

                        Admin

                    </Dropdown.Item>



                    <Dropdown.Item onClick={(event) => handleClick(event)}>
                        LogOut
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}

export default AdminMenu;