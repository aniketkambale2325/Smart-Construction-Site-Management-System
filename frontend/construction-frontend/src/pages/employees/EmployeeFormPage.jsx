
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../api/employeeApi.js";

export default function EmployeeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    userId: Number(localStorage.getItem("userId")) || 1, // Replace 1 after login integration
    fullName: "",
    phone: "",
    designation: "",
    dailyRate: "",
    joiningDate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    getEmployeeById(id)
      .then((emp) => {
        setForm({
          userId: emp.userId ?? (Number(localStorage.getItem("userId")) || 1),
          fullName: emp.fullName ?? "",
          phone: emp.phone ?? "",
          designation: emp.designation ?? "",
          dailyRate: emp.dailyRate ?? "",
          joiningDate: emp.joiningDate
            ? emp.joiningDate.substring(0, 10)
            : "",
        });
      })
      .catch(() => setError("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      userId: Number(form.userId),
      dailyRate: Number(form.dailyRate),
      joiningDate: form.joiningDate,
    };

    console.log("Employee Payload:", payload);

    try {
      if (isEdit) {
        await updateEmployee(id, payload);
      } else {
        await createEmployee(payload);
      }

      navigate("/employees");
    } catch (err) {
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save employee."
      );
    }
  };

  if (loading) {
    return <p className="p-6">Loading employee...</p>;
  }

  return (
    <div className="max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Designation
          </label>

          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            required
          >
            <option value="">Select Designation</option>
            <option value="Admin">Admin</option>
            <option value="Contractor">Contractor</option>
            <option value="Site Engineer">Site Engineer</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Daily Rate
          </label>
          <input
            type="number"
            name="dailyRate"
            value={form.dailyRate}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            min="0"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Joining Date
          </label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
        >
          {isEdit ? "Update Employee" : "Save Employee"}
        </button>
      </form>
    </div>
  );
}