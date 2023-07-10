import { Dropdown, Button, Input } from '@rewind-ui/core';
import { useState } from 'react';
import { tokenStore } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';


const AdminMenu = () => {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    return (
        <div>
            <Dropdown>
                <Dropdown.Trigger>
                    <Button className="w-500">{selectedOption ?? 'User'}</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={() => setSelectedOption("Perfil")}>
                        Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/dashboard')}>
                        
                        Admin
                        
                    </Dropdown.Item>



                    <Dropdown.Item onClick={() => setSelectedOption("LogOut")}>
                        LogOut
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}

export default AdminMenu;