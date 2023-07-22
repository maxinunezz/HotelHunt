import { Form, useNavigate, useParams } from 'react-router-dom';
import { hotelStore, roomsStore, tokenStore } from '../../Store';
import RoomList from '../../components/RoomList/RoomList';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { MapPinLine } from '@phosphor-icons/react'
import Footer from "../../components/Footer/Footer";
import axios from 'axios';

const url = import.meta.env.VITE_URL;

const HotelPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [hotelOnScreen, setroomsId] = useState([]);
	const [hotelRatings, setHotelRatings] = useState([]);
	const { hotelIdSetter } = roomsStore();
	const { fetchHotels } = hotelStore();
	const [hotelsLoaded, setHotelsLoaded] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState(false);

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
			} catch (error) {
				console.error(error);
			}
		};

		fetchRating();
	}, [id]);
	console.log(hotelRatings);


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
		window.localStorage.setItem("hotelId", id)
		window.open(newWindowRoute, '_blank', windowFeatures);
	};

	return (
		<div className="bg-slate-600 min-h-screen flex flex-col overflow-hidden">
			<NavBar />
			<div className="flex-grow mt-20 overflow-y-auto">
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
								<div>
									overallScore: {overallScoreHandler()}
								</div>
								<h3 className="text-lg font-bold mb-4">Descripción</h3>
								<p>{hotelOnScreen?.description}</p>

							</div>
						</div>
					</div>
				</div>

				<div className="max-w-screen-lg mx-auto p-8 mt-8 overflow-hidden">
					{hotelOnScreen ? (
						<div className="room-list transform transition duration-300">
							<RoomList />
						</div>
					) : (
						<p className="text-white">No hay habitaciones disponibles.</p>
					)}
				</div>
				{
					token.length && <button onClick={handleOpenNewWindow} className="bg-yellow-300 mt-4">
						Agregar comentario
					</button>
				}
			</div>
			<div className="h-96 overflow-y-scroll border border-gray-300 rounded-lg p-4 shadow-lg">
				<h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
				<div className="space-y-4">
					{hotelRatings.map((rating, index) => (
						<div key={index} className="border-b border-gray-300 pb-2">
							<p className="text-lg font-semibold">Score: {rating.score}</p>
							<p className="text-gray-950">{rating.comment}</p>
						</div>
					))}
				</div>

			</div>
			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
};

export default HotelPage;
