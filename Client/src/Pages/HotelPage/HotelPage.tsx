import {  useNavigate, useParams } from 'react-router-dom';
import { SAStore, hotelStore, roomsStore, tokenStore } from '../../Store';
import RoomList from '../../components/RoomList/RoomList';
import { useEffect, useState } from 'react';
import { MapPinLine } from '@phosphor-icons/react'
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { Hotel } from '../../models';
import NavbarDetail from '../../components/NavBarDetail/NavBarDetail';

const url = import.meta.env.VITE_URL;

interface Rating{
score: number;
comment:string;
hotelId:string;
}

const HotelPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [hotelOnScreen, setroomsId] = useState <Hotel>();
	const [hotelRatings, setHotelRatings] = useState<Rating[]>([]);
	const { hotelIdSetter } = roomsStore();
	const { fetchHotels } = hotelStore();
	const [hotelsLoaded, setHotelsLoaded] = useState(false);
	const update = SAStore((state)=>state.updated)

	const allHotels = hotelStore((state) => state.hotels);
	const token = tokenStore((state) => state.userState);

	useEffect(() => {
		const fetchAllHotels = async () => {
			await fetchHotels();
			setHotelsLoaded(true);
		};
		fetchAllHotels();
	}, [fetchHotels]);

	useEffect(() => {
		if (hotelsLoaded) {
			const hotelOnScreen = allHotels.find((hotel) => hotel.id === id);
			setroomsId(hotelOnScreen);
			hotelIdSetter(hotelOnScreen?.roomsId);
		}
	}, [hotelsLoaded, allHotels, hotelIdSetter, id]);

	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await axios.get(`${url}/rating/${id}`);
				setHotelRatings(response.data);
				console.log(response.data);
				
			} catch (error) {
				console.error(error);
			}
		};

		fetchRating();
	}, [id,update]);



	const overallScoreHandler = () => {
		let sum = 0;
		for (let i = 0; i < hotelRatings.length; i++) {
			sum += hotelRatings[i].score;
		}
		const average = sum / hotelRatings.length;
		return Math.round(average);
	};


	const handleOpenNewWindow = () => {
		const newWindowRoute = `/addcomment/${id}`;
		const windowFeatures = 'height=500,width=800,resizable=yes,scrollbars=yes';
		window.localStorage.setItem("tokenInfo", JSON.stringify(token))
		window.localStorage.setItem("hotelId", id||hotelRatings[0].hotelId)
		window.open(newWindowRoute, '_blank', windowFeatures);
	};

	return (
		<div className="bg-slate-600 min-h-screen flex flex-col overflow-hidden">
			<NavbarDetail />
			<div className="flex-grow mt-10 overflow-y-auto">
				<div className="max-w-screen-lg mx-auto p-8">
					<div className="mt-2 flex justify-between">
						<button onClick={() => navigate('/')} className="bg-blue-500 font-bold w-[80px] border-neutral-950">Back</button>
						<div className="w-1/3 mr-6">
							<div className="w-full h-full rounded-lg overflow-hidden">
								<img
									src={hotelOnScreen?.photo}
									alt="Foto de la habitación"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						<div className="w-2/3">
							<div className="bg-white p-6 rounded-lg shadow-lg">
								<h2 className="text-3xl font-bold mb-4">🏨{hotelOnScreen?.name}</h2>
								<div className="flex items-center">
									<MapPinLine size={20} className="mr-2" />
									<h3>{hotelOnScreen?.country}, {hotelOnScreen?.city}</h3>
								</div>
								{token.length > 0 && hotelRatings.length > 0 && (
									<div>
										puntuación general: {overallScoreHandler()}
									</div>
								)}
								<h3 className="text-lg font-bold mb-4">Descripción</h3>
								<p>{hotelOnScreen?.description}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Ordered Services */}
				{hotelOnScreen?.services && hotelOnScreen?.services.length > 0 && (
					<div className="bg-white max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg w-[960px]">
						<h3 className="text-[22px] font-bold mb-4">Servicios</h3>
						<ul className="list-disc list-inside space-y-2">
							{hotelOnScreen.services.map((service, index) => (
								<li key={index} className="text-gray-700">{service}</li>
							))}
						</ul>
					</div>
				)}


				{/* Render Rooms */}

				<div className="max-w-screen-lg mx-auto p-8 mt-8 overflow-hidden">
					{hotelOnScreen ? (
						<div className="room-list transform transition duration-300 mt-8">
							<RoomList />
						</div>
					) : (
						<p className="text-white">No hay habitaciones disponibles.</p>
					)}
				</div>

				{/* Agregar comentario button */}

			</div>

			{/* Comentarios section */}

			<div className="max-h-[500px] w-[970px] border border-gray-300 rounded-lg p-4 shadow-lg bg-white  mx-auto mb-2">
				{token.length > 0 && (
					<div className="flex justify-center mt-4">
						<button
							onClick={handleOpenNewWindow}
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring focus:border-blue-400"
						>
							Agregar comentario
						</button>
					</div>
				)}

				<div className="mt-4">
					<h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
					<div className="max-h-[300px] overflow-y-scroll">
						{hotelRatings.length > 0 ? (
							hotelRatings.map((rating, index) => (
								<div key={index} className="border-b border-gray-300 pb-2">
									<div className="flex items-center mb-2">
										<p className="text-lg font-semibold text-blue-500">Puntaje: {rating.score}</p>
										<div className="flex ml-2">
											{/* Agrega aquí cualquier contenido adicional si es necesario */}
										</div>
									</div>
									<p className="text-gray-700 break-words">{rating.comment}</p>
								</div>
							))
						) : (
							<p className="text-gray-700">No hay comentarios disponibles.</p>
						)}
					</div>
				</div>


			</div>
			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);


};

export default HotelPage;