import { Text } from "@rewind-ui/core";

const NavBarDashboard1 = () => {
    return (
        <div className="grid grid-cols-7 gap-4 bg-white">
                <div className="col-span-2">
                    <Text>

                    </Text>
                </div>
                <div className="col-span-1 flex flex-col justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Nombre
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Pais
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Ciudad
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">

                </div>
                <div className="col-span-1">
                    
                </div>
                
                
            </div>
    );
};
export default NavBarDashboard1