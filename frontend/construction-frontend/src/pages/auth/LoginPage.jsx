import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

export  default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/projects');
        }
        catch (err){
            setError('Invalid username ot password');
        }
        finally {
            setLoading(false);
        }
    };

        return(
           <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Construction ERP Login</h1>
            {error && <p className="text-red-600 mb-6 text-sm">{error}</p>}

            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4" required
            />

            <button type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-2 rounded font-medium"
            >

                {loading ? 'Logging in...' : 'Log In'}

            </button>
            </form>
           </div>

        );
}