
import { Button } from '@rewind-ui/core';
import { Link } from 'react-router-dom';

function CrearHostelButton() {
    return (
        <Link to='/formHotel' className='ml-auto'><Button color="purple" shadow="base" shadowColor="blue" radius="base" size="lg" >
            <span className='text-2xl'>+ Agregar Hotel</span>
        </Button> </Link>
    );
}

export default CrearHostelButton;

