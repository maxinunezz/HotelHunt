import { Dropdown, Button, Checkbox } from '@rewind-ui/core';
import { CurrencyDollar, MagnifyingGlass, Money, ReceiptX, ShoppingCart, Trash } from '@phosphor-icons/react';


const CartComponent = () => {

    const handleChange = () => {
        console.log("This is the handler");

    }
    return (
        <div>
            <Dropdown itemColor="red" radius="none" shadow="sm" size="lg" outsidePress={false} trigger="hover" tone="light" withChevron={false}>
                <Dropdown.Trigger>
                    <Button>
                        <ShoppingCart size={30} weight="duotone" className="mr-1.5" />
                        Cart
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Divider />
                    <Dropdown.Item className="my-2">
                        <Button className='w-[80px]' variant="danger" >
                            <Trash size={25} weight="duotone" className="mr-1.5" />

                        </Button>
                        <p className='w-[100px] h-[100px] flex justify-center items-center text-center'>
                            Aqui una foto
                        </p>
                        Aqui el nombre y datos de la reserva
                    </Dropdown.Item>
                    <Dropdown.Divider color="slate"/>
                    <Dropdown.Item className="my-2">
                        <Button className='w-[80px]' variant="danger" >
                            <Trash size={25} weight="duotone" className="mr-1.5" />

                        </Button>
                        <p className='w-[100px] h-[100px] flex justify-center items-center text-center'>
                            Aqui una foto
                        </p>
                        Aqui el nombre y datos de la reserva
                    </Dropdown.Item>
                    
                    <Dropdown.Divider color="dark"/>
                    <Dropdown.Label className='flex justify-start items-center' weight="Bold">
                        Total
                        <span className="ml-20 flex justify-start items-center">
                            <CurrencyDollar size={21} weight="duotone" />
                            99999
                        </span>
                    </Dropdown.Label>
                    <Dropdown.Divider />
                    <Dropdown.Item color="green" className='flex justify-center items-center'>
                        <Money size={20} weight="duotone" className="mr-1.5" />
                        Checkout
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className='flex justify-center items-center'>
                        <ShoppingCart size={20} weight="duotone" className="mr-1.5" />
                        View cart
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}

export default CartComponent;