
import { Button } from '@rewind-ui/core';
import { useNavigate } from 'react-router-dom';

function CrearHostelButton() {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate('../formHotel')} className="w-44" color="purple" shadow="base" shadowColor="blue" radius="base" size="lg" >
            <span className='text-2xl'>Registrar</span>
        </Button>
    );
}

export default CrearHostelButton;

