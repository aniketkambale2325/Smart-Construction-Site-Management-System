import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../api/employeeApi.js';

export default function EmployeeFormPage() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        userId: '',
        fullName: '',
        phone: '',
        designation: '',
        dailyRate: '',
        joiningDate: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee({
            ...form,
            userId: Number(form.userId),
            dailyRate: Number(form.dailyRate),
        });
        navigate('/employees');
    }
    catch (err) {
        setError('Failed to create employee - check the fields and try again');
    }
  };

  return(
  <div className="p-6 max-w-lg">
    <h1 className="text-xl" font-bold mb-4>Add Employee</h1>
    {error && <p className="text-red-600 mb-4">{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input name="userId" value={form.userId} onChange={handleChange} className="w-full border rounded px-3 py-2"
            required
            />
        </div>
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
        <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded">Save Employee</button>
    </form>

</div>

);

}