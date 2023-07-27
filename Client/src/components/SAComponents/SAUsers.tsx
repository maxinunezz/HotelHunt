import { useEffect, useState } from 'react'
import { SAStore, tokenStore } from "../../Store";
import { errorToast } from '../toast';
import axios from "axios";
import NavUserSA from '../NavBar/NavUserSa';
import SAUserRow from './SAUserRow';



export default function SAUsers() {
    const token = tokenStore((state) => state.userState);
    const url = import.meta.env.VITE_URL;
    const [users, setUsers] = useState<any[]>([])
    const update = SAStore((state) => state.updated)

    const getUsers = async () => {
        try {
            const response = await axios.get(
                `${url}/user`,
                {
                    headers:
                    {
                        authorization:
                            `Bearer ${token[1]}`,
                    },
                },
            )
            if (response.data) {
                setUsers(response.data);
            }
        } catch (error: any) {
            errorToast(error.response.data);

        }
    }


    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        getUsers()
    }, [update])



    return (
        <div className="flex flex-col h-full mt-4 bg-slate-600 rounded-xl p-4 shadow-md">
            <NavUserSA />
            <div className="flex flex-col h-full overflow-y-auto mt-4">
                {users?.length > 0 ? (
                    users?.map((element: { id: string, name: string, lastName: string, phoneNumber: string, disabled: boolean }) => (
                        <div key={element.id} className="  transition-transform transform hover:scale-95">
                            <SAUserRow
                                id={element.id}
                                name={element.name}
                                lastName={element.lastName}
                                phoneNumber={element.phoneNumber}
                                disabled={element.disabled}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-grow items-center justify-center p-4 bg-white rounded-lg shadow-md">
                        <p className="text-red-600 font-medium">No hay usuarios</p>
                    </div>
                )}
            </div>
        </div>

    );
}





