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
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import FarewellPage from './Pages/FarewellPage/FarewellPage';
import AdminProfilePage from './Pages/ProfilePage/AdminProfilePage';
import RoomFilter from './Pages/RoomFilter/RoomFilter';


function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/login" element={<LogingPage />}></Route>
				<Route path="/userprofile/:name" element={<ProfilePage />}></Route>
				<Route path="/adminprofile/:name" element={<AdminProfilePage />}></Route>
				<Route path="/dashboard" element={<DashBoardPage />}></Route>
				<Route path="/dashboard/hoteldetail/:id" element={<DashboardPageHotelDetail />}></Route>
				<Route path="/formHotel" element={<FormPageH />}></Route>
				<Route path="/formRoom" element={<FormPageR />}></Route>
				<Route path="/usercreate" element={<FormPageUser />}></Route>
				<Route path="/hotelpage/:id" element={<HotelPage />}></Route>
				<Route path="/roompage/:id" element={<RoomPage />}></Route>
				<Route path="/farewell" element={<FarewellPage />}></Route>
				<Route path="/roomSearch" element={<RoomFilter />}></Route>

			</Routes>
		</div>
	);
}

export default App;
