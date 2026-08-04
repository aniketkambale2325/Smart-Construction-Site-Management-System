import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Navbar(){
    const {user, logout} = useAuth();
    return(
         <nav className="bg-teal-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-5">
        <Link to="/projects">Projects</Link>
        <Link to="/employees">Employees</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.role}</span>
        <button onClick={logout} className="text-sm underline">Logout</button>
      </div>
    </nav>
    );
}