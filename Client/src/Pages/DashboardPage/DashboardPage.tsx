import CrearRoomButton from '../../components/D-CrearRoomButton/CrearRoomButton';
import CrearHostelButton from '../../components/D-CrearHotelButton/CrearHostelButton';
import UpdateAndDeleteHotel from '../../components/UpdateAndDeleteHotels/UpdateAndDeleteHotels';

const DashBoardPage = () => {
	return (
		<div>
			<div>Este es el dashboard</div>

			<div>
				<CrearHostelButton />
				<CrearRoomButton />
			</div>
			<div className='bg-amber-800 w-[1500px] h-[500px] flex-col text-center items-center justify-center'>
				Acá
				
			</div>
		</div>
	);
};

export default DashBoardPage;
