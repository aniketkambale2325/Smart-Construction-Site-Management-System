import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployeeById, updateEmployee } from '../../api/employeeApi.js';

export default function EmployeeFormPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        userId: '',
        fullName: '',
        phone: '',
        designation: '',
        dailyRate: '',
        joiningDate: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        if (!isEdit) return;
        getEmployeeById(id)
            .then((emp) => {
                setForm({
                    userId: '1',
                    fullName: emp.fullName ?? '',
                    phone: emp.phone ?? '',
                    designation: emp.designation ?? '',
                    dailyRate: emp.dailyRate ?? '',
                    joiningDate: emp.joiningDate ?? '',
                });
            })
            .catch(() => setError('Failed to load employee'))
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            userId: Number(form.userId),
            dailyRate: Number(form.dailyRate),
        };
        try {
            if (isEdit) {
                await updateEmployee(id, payload);
            } else {
                await createEmployee(payload);
            }
            navigate('/employees');
        }
        catch (err) {
            setError(isEdit ? 'Failed to update employee' : 'Failed to create employee - check the fields and try again');
        }
    };

    if (loading) return <p className="p-6">Loading employee...</p>;

  return(
  <div className="p-6 max-w-lg">
    <h1 className="text-xl font-bold mb-4">{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
    {error && <p className="text-red-600 mb-4">{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
        {!isEdit && (
        <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input name="userId" value={form.userId} onChange={handleChange} className="w-full border rounded px-3 py-2"
            required
            />
        </div>
        )}
        <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full border rounded px-3 py-2"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input name="designation" value={form.designation} onChange={handleChange} className="w-full border rounded px-3 py-2"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Daily Rate</label>
            <input name="dailyRate" value={form.dailyRate} onChange={handleChange} className="w-full border rounded px-3 py-2"
            type="number"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Joining Date</label>
            <input name="joiningDate" value={form.joiningDate} onChange={handleChange} className="w-full border rounded px-3 py-2"
            type="date"
            required
            />
        </div>
        <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded">
            {isEdit ? 'Update Employee' : 'Save Employee'}
        </button>
    </form>

</div>

);

}
