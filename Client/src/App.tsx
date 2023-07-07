import { Route, Routes } from "react-router-dom"
import './App.css'
import LogingPage from "./Pages/LoginPage/LoginPage"
import HomePage from "./Pages/HomePage/HomePage"
import DashBoardPage from "./Pages/DashboardPage/DashboardPage"
import FormPageH from "./Pages/FormPageH/FormPageH"

function App() {

  return (
    <div id="app" className='flex items-center h-screen justify-center bg-slate-500'>
      <Routes>
        <Route path="/" element={<LogingPage/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<DashBoardPage/>}></Route>
        <Route path="/formHotel" element={<FormPageH/>}></Route>
      </Routes>
    </div>
  )
}

export default App
