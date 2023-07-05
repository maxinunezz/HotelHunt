import { Link } from "react-router-dom"

const LogingPage = () => {
    return (
        <div>
            <div className="bg-orange-400 text-3xl ">
                Este es el login page
            </div>
            <div>
                <Link to="/home">
                    Home
                </Link>
            </div>
        </div>


    )
}
export default LogingPage