import { Route, Routes } from "react-router-dom"
import './App.css'



import LogingPage from "./Pages/LoginPage/LoginPage"
import HomePage from "./Pages/HomePage/HomePage"
import DashBoardPage from "./Pages/DashboardPage/DashboardPage"
import FormPageH from "./Pages/FormPageH/FormPageH"
import FormPageUser from "./Pages/FormPageUser/FormPageUser"
import HotelPage from "./Pages/HotelPage/HotelPage"
import FormPageR from "./Pages/FormPageR/ForrmPageR"



function App() {

  return (
    <div id="app">
      <Routes>

        <Route path="/" element={<LogingPage/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<DashBoardPage/>}></Route>
        <Route path="/formHotel" element={<FormPageH/>}></Route>
        <Route path="/formRoom" element={<FormPageR/>}></Route>
        <Route path="/usercreate" element={<FormPageUser/>}></Route>
        <Route path="/hotelpage" element={<HotelPage/>}></Route>
        

      </Routes>
    </div>
  )
}

export default App
