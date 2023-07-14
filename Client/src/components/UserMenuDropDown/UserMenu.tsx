import { Dropdown, Button, Input } from '@rewind-ui/core';
import { useState, useEffect } from 'react';
import { tokenStore } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { farewellToast } from '../toast';


const UserMenu = () => {
    const navigate = useNavigate()
    const isAdmin = tokenStore((state) => state.userState)  //análogo a AdminMenu
    console.log('isAdmin' ,isAdmin);   
    const { reset } = tokenStore()



    const handleClick = (event) => {
        event.preventDefault()
        console.log(isAdmin[0])
        reset()
        farewellToast("Adiós y buena suerte!")
        navigate('/farewell')
    }
    return (
        <div>
            <Dropdown trigger="hover">
                <Dropdown.Trigger>
                    <Button className="w-500">{`${isAdmin[0].name} ${isAdmin[0].lastName[0]}.`}</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={() => navigate(`/userprofile/${isAdmin[0].name}+${isAdmin[0].lastName}`)}>
                        Perfil
                    </Dropdown.Item>

                    <Dropdown.Item onClick={(event) => handleClick(event)}>
                        LogOut
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}

export default UserMenu;