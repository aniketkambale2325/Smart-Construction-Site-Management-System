import { useEffect, useState } from "react";
import { getVendors, createVendor } from "../../api/vendorApi";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", contactNumber: "", materialSupplied: "" });

  const loadVendors = () => getVendors().then(setVendors);

  useEffect(() => {
    loadVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVendor(form);
    setForm({ name: "", contactNumber: "", materialSupplied: "" });
    loadVendors();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 flex gap-3 flex-wrap items-end">
        <input placeholder="Vendor Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded px-3 py-2" required />
        <input placeholder="Contact Number" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} className="border rounded px-3 py-2" required />
        <input placeholder="Material Supplied" value={form.materialSupplied} onChange={(e) => setForm({ ...form, materialSupplied: e.target.value })} className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">Add Vendor</button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Supplies</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-3">{v.name}</td>
              <td className="p-3">{v.contactNumber}</td>
              <td className="p-3">{v.materialSupplied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}