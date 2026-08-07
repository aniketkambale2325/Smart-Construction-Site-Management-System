import { useEffect, useState } from "react";
import { getMaterials, createMaterial } from "../../api/materialApi";

export default function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ name: "", unit: "", quantityAvailable: "", reorderLevel: "" });
  const [showForm, setShowForm] = useState(false);

  const loadMaterials = () => getMaterials().then(setMaterials);

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMaterial({
      ...form,
      quantityAvailable: Number(form.quantityAvailable),
      reorderLevel: Number(form.reorderLevel),
    });
    setForm({ name: "", unit: "", quantityAvailable: "", reorderLevel: "" });
    setShowForm(false);
    loadMaterials();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Materials</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-teal-700 text-white px-4 py-2 rounded">
          {showForm ? "Cancel" : "+ Add Material"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 flex gap-3 flex-wrap items-end">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded px-3 py-2" required />
          <input placeholder="Unit (bags, tons...)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="border rounded px-3 py-2" required />
          <input type="number" placeholder="Quantity Available" value={form.quantityAvailable} onChange={(e) => setForm({ ...form, quantityAvailable: e.target.value })} className="border rounded px-3 py-2 w-40" required />
          <input type="number" placeholder="Reorder Level" value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })} className="border rounded px-3 py-2 w-32" required />
          <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">Save</button>
        </form>
      )}

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Available</th>
            <th className="p-3">Reorder Level</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.unit}</td>
              <td className="p-3">{m.quantityAvailable}</td>
              <td className="p-3">{m.reorderLevel}</td>
              <td className="p-3">
                {m.isLowStock ? (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">Low Stock</span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">OK</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}