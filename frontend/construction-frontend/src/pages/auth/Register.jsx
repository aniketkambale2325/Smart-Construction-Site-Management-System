import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";

const ROLES = [
  { id: 1, label: "Admin" },
  { id: 2, label: "Contractor" },
  { id: 3, label: "Site Engineer" },
  { id: 4, label: "Supervisor" },
  { id: 5, label: "Client" },
];

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", roleId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ ...form, roleId: Number(form.roleId) });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const message = err.response?.data?.error || "Registration failed — the username or email may already be taken.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold mb-6">Create an Account</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">Account created! Redirecting to login...</p>}

        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          minLength={6}
          required
        />

        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="roleId"
          value={form.roleId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-6"
          required
        >
          <option value="" disabled>Select a role</option>
          {ROLES.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-700 underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}