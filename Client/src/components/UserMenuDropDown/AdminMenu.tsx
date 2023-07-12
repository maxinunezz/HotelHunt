import { Dropdown, Button, Input } from '@rewind-ui/core';
import { useState } from 'react';
import { tokenStore } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { farewellAdminToast } from '../toast';


const AdminMenu = () => {
    const navigate = useNavigate()
    const isAdmin = tokenStore((state) => state.userState)  //análogo a UserMenu
    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    const { reset } = tokenStore()
    const handleClick = (event) => {
        event.preventDefault()
        console.log(isAdmin[0])
        reset()
        farewellAdminToast("Gracias y éxito en sus ventas")
        navigate('/farewell')
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