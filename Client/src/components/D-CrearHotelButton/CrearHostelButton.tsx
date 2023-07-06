import { Button } from '@rewind-ui/core';

function CrearHostelButton() {
    return (
        <Button  className="w-44" color="purple" shadow="base" shadowColor="blue" radius="base" size="lg" disabled={true}>
            <span className='text-2xl'>Registrar</span> 
        </Button>
    );
}

export default CrearHostelButton;