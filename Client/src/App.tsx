import { Route, Routes } from "react-router-dom"
import './App.css'

import Carrusel from "./components/Carrucel/Carrusel"

import LogingPage from "./Pages/LoginPage/LoginPage"
import HomePage from "./Pages/HomePage/HomePage"
import DashBoardPage from "./Pages/DashboardPage/DashboardPage"
import FormPageUser from "./Pages/FormPageUser/FormPageUser"
import HotelPage from "./Pages/HotelPage/HotelPage"
import RoomPage from "./Pages/RoomPage/RoomPage"


function App() {

  return (
    <div id="app">
      <Routes>

        <Route path="/" element={<LogingPage/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<DashBoardPage/>}></Route>
        <Route path="/usercreate" element={<FormPageUser/>}></Route>
        <Route path="/hotelpage/:id" element={<HotelPage/>}></Route>
        <Route path="/roompage/:id" element={<RoomPage/>}></Route>

      </Routes>
    </div>
  )
}

export default App
