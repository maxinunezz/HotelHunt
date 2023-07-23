import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogingPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import DashBoardPage from './Pages/DashboardPage/DashboardPage';
import FormPageH from './Pages/FormPageH/FormPageH';
import FormPageUser from './Pages/FormPageUser/FormPageUser';
import HotelPage from './Pages/HotelPage/HotelPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import FormPageR from './Pages/FormPageR/ForrmPageR';
import DashboardPageHotelDetail from './Pages/DashboardPage/DashboardPageHotelDetail';
import FarewellPage from './Pages/FarewellPage/FarewellPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ReservasPage from './Pages/ReservasPage/ReservasPage';
import UserSettings from './Pages/UserSettings/UserSettings';
import ShoppingCartPage from './Pages/ShoppingCartPage/ShoppingCartPage';
import RoomFilter from './Pages/RoomFilter/RoomFilter';
import FormPageHotelUpdate from './Pages/FormPageH/FormPageHotelUpdate';
import RecuPassword from './Pages/RecuperacionPassword/RecuPassword'
import FormPagePass from './Pages/RecuperacionPassword/FormPass';
import AddRatingPage from './Pages/AddRatingPage/AddRatingPage';
import FormPageRoomUpdate from './Pages/FormPageR/FormPageRoomUpdate';
import { useEffect } from 'react';


function App() {
	useEffect(() => {
		document.title = 'Hotel Hunt';
	  }, []);
	return (
		<div id="app">
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/login" element={<LogingPage />}></Route>
				<Route path="/profile/:name" element={<ProfilePage />}></Route>
				<Route path="/profile/reservas" element={<ReservasPage />}></Route>
				<Route path='/profile/configuracion' element={<UserSettings />}></Route>
				<Route path="/dashboard" element={<DashBoardPage />}></Route>
				<Route path="/dashboard/hoteldetail/:id" element={<DashboardPageHotelDetail />}></Route>
				<Route path="/dashboard/hotelupdate/:id" element={<FormPageHotelUpdate />}></Route>
				<Route path="/dashboard/roomupdate/:id" element={<FormPageRoomUpdate />}></Route>
				<Route path="/formHotel" element={<FormPageH />}></Route>
				<Route path="/formRoom" element={<FormPageR />}></Route>
				<Route path="/usercreate" element={<FormPageUser />}></Route>
				<Route path="/hotelpage/:id" element={<HotelPage />}></Route>
				<Route path="/roompage/:id" element={<RoomPage />}></Route>
				<Route path="/farewell" element={<FarewellPage />}></Route>
				<Route path="/shoppingcart" element={<ShoppingCartPage />}></Route>
				<Route path="/roomSearch" element={<RoomFilter />}></Route>
				<Route path="/RecuPassword" element={<RecuPassword/>}></Route>
				<Route path='/SetNewPass' element={<FormPagePass/>}></Route>
				<Route path="/addcomment/:hotelId" element={<AddRatingPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
