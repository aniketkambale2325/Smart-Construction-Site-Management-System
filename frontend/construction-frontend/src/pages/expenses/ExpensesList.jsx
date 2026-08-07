import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpensesByProject, createExpense } from "../../api/expenseApi";

export default function ExpenseList() {
  const { projectId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "", expenseDate: "" });

  const loadExpenses = () => getExpensesByProject(projectId).then(setExpenses);

  useEffect(() => {
    loadExpenses();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense({ ...form, projectId: Number(projectId), amount: Number(form.amount) });
    setForm({ category: "", amount: "", expenseDate: "" });
    loadExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses — Project #{projectId}</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 flex gap-3 flex-wrap items-end">
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded px-3 py-2" required />
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border rounded px-3 py-2" required />
        <input type="date" value={form.expenseDate} onChange={(e) => setForm({ ...form, expenseDate: e.target.value })} className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">Add Expense</button>
      </form>

      <table className="w-full bg-white shadow rounded mb-3">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-3">{e.category}</td>
              <td className="p-3">₹{e.amount}</td>
              <td className="p-3">{e.expenseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-right font-bold">Total: ₹{total}</p>
    </div>
  );
}