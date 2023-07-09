import { Dropdown, Button, Input } from '@rewind-ui/core';
import { useState, useEffect } from 'react';
import { tokenStore } from '../../Store';


const AdminMenu = () => {   

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

                    <Dropdown.Item onClick={() => setSelectedOption("Admin")}>
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