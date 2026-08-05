import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees, deleteEmployee } from "../../api/employeeApi";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function EmployeeListPage(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadEmployees = () =>
        getAllEmployees()
            .then(setEmployees)
            .catch(() => setError('Failed to load employees'));

    useEffect(() => {
        loadEmployees().finally(() => setLoading(false));
    }, []);

    const handleDeleteConfirm = async () => {
        if (!deleteTarget || deleting) return;
        setDeleting(true);
        try {
            await deleteEmployee(deleteTarget.id);
            setEmployees((prev) => prev.filter((emp) => emp.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch {
            setError('Failed to delete employee');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p className="p-6">Loading employees...</p>;
    if (error && employees.length === 0) return <p className="p-6 text-red-600">{error}</p>;

    return(
        <div className="p-6">
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-xl font-bold">Employees</h1>
                <Link to="/employees/new" className="bg-emerald-700 text-white px-4 py-2 rounded">
                    + Add Employee
                </Link>
            </div>

            <table className="w-full border-collapse bg-white shadow-sm rounded">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Name</th>
                        <th className="p-3">Designation</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Daily Rate</th>
                        <th className="p-3">Joining Date</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>  
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="border-t">
                            <td className="p-3">{emp.fullName}</td>
                            <td className="p-3">{emp.designation}</td>
                            <td className="p-3">{emp.phone}</td>
                            <td className="p-3">{emp.dailyRate}</td>
                            <td className="p-3">{emp.joiningDate}</td>
                            <td className="p-3">
                                <div className="flex flex-wrap gap-2">
                                    <Link to={`/employees/${emp.id}/edit`} className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteTarget(emp)}
                                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/attendance/${emp.id}`} className="text-emerald-700 text-sm">Attendance</Link>
                                    <Link to={`/salary/${emp.id}`} className="text-emerald-700 text-sm">Salary</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody> 
            </table>

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                onCancel={() => !deleting && setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </div>
    )
}
