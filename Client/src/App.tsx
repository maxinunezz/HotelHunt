import { Route, Routes } from "react-router-dom"
import './App.css'
import LogingPage from "./Pages/LoginPage/LoginPage"

function App() {

  return (
    <div id="app" className='flex items-center h-screen justify-center bg-slate-500'>
      <Routes>
        <Route path="/login" element={<LogingPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
