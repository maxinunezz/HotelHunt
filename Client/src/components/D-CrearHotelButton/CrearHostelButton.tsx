
import { Button } from '@rewind-ui/core';
import { Link } from 'react-router-dom';

function CrearHostelButton() {
    return (
        <Link to='/formHotel'><Button  className="w-44" color="purple" shadow="base" shadowColor="blue" radius="base" size="lg" >
            <span className='text-2xl'>Registrar</span>
        </Button> </Link>
    );
}

export default CrearHostelButton;

