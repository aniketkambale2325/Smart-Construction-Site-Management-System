import { useEffect, useState } from "react";
import { getClients, createClient } from "../../api/clientApi";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", contactEmail: "", contactPhone: "" });

  const loadClients = () => getClients().then(setClients);

  useEffect(() => {
    loadClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClient(form);
    setForm({ name: "", contactEmail: "", contactPhone: "" });
    loadClients();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 flex gap-3 flex-wrap items-end">
        <input placeholder="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded px-3 py-2" required />
        <input placeholder="Email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="border rounded px-3 py-2" required />
        <input placeholder="Phone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">Add Client</button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.contactEmail}</td>
              <td className="p-3">{c.contactPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}