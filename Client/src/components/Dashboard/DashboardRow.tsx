import { Text } from "@rewind-ui/core";
import { FaTrashAlt, FaEdit } from "react-icons/fa";


export default function DashboardRow({
    name,
    country,
    city,
    photo,
}: {
    name: string;
    country: string;
    city: string;
    photo: string;
}) {
    const handleDelete = () => {
        // Acción de borrad
    };

    const handleEdit = () => {
        // Acción de edición
    };

    return (
        <div className="dashboard-row bg-white rounded-md p-4 mb-4">
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-2">
                    <img src={photo} alt={name} className="w-48 h-48 object-cover" />
                </div>
                <div className="col-span-1 flex flex-col justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {name}
                    </Text>
                    
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {country}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {city}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <button onClick={handleEdit}>
                        <FaEdit />
                    </button>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <button onClick={handleDelete}>
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}