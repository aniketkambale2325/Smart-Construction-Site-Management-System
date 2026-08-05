import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../api/employeeApi";

export default function EmployeeListPage(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllEmployees()
        .then(setEmployees)
        .catch(()=> setError('Failed to load employees'))
        .finally(()=> setLoading(false));
    }, []);

    if (loading) return <p className="p-6">Loading employees...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return(
        <div className="p-6">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-xl font-bold">Employees</h1>
                <Link to="/employees/new" className="bg-emerald-700 text-white px-4 py-2 rounded">
                    + Add Employee
                </Link>
            </div>

            <table className="w-full border-collapse bg-white shadow-sm rounded">
                <thread>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Name</th>
                        <th className="p-3">Designation</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Daily Rate</th>
                        <th className="p-3">Joining Date</th>
                    </tr>
                </thread>  
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="border-t">
                            <td className="p-3">{emp.fullName}</td>
                            <td className="p-3">{emp.designation}</td>
                            <td className="p-3">{emp.phone}</td>
                            <td className="p-3">{emp.dailyRate}</td>
                            <td className="p-3">{emp.joiningDate}</td>
                        </tr>
                    ))}
                    
                </tbody> 
            </table>
        </div>
    )
}