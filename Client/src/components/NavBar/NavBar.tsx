import React from "react"
import { Link, NavLink } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"

export default function NavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 flex items-center mr-auto justify-between w-full">
            <Link to="/">
                Login Page
            </Link>

            <SearchBar />
            
            <div>
                <select className="bg-slate-800">
                    <option value="All">Filtrar por hotel</option>
                    <option value="created">Filtar por ubicación</option>
                    <option value="api">Filtrar por capacidad</option>
                    <option value="api">Filtrar por servicio</option>
                </select>
            </div>

            <button>User</button>

        </nav>
    )
}