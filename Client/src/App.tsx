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

function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/login" element={<LogingPage />}></Route>
				<Route path="/dashboard" element={<DashBoardPage />}></Route>
				<Route path="/dashboard/hoteldetail/:id" element={<DashboardPageHotelDetail />}></Route>
				<Route path="/formHotel" element={<FormPageH />}></Route>
				<Route path="/formRoom" element={<FormPageR />}></Route>
				<Route path="/usercreate" element={<FormPageUser />}></Route>
				<Route path="/hotelpage/:id" element={<HotelPage />}></Route>
				<Route path="/roompage/:id" element={<RoomPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
