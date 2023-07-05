import { Route, Routes } from "react-router-dom"
import './App.css'
import Carrusel from "./components/Carrucel/Carrusel"

function App() {

  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Carrusel />} ></Route>
      </Routes>
    </div>
  )
}

export default App
