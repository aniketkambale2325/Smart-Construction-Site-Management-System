import { useEffect, useState } from "react";
import {BarChart, Bar, Xaxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie, Cell} from "recharts";
import { getDashboardSummary, getProjectProgressChart, getExpenseByCategoryChart } from "../../api/dashboardApi";

const COLORS = ["#0F6E56", "#1F7A8C", "#D97706", "#6B4FBB", "#C2543E"];


export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
    getProjectProgressChart().then(setProgressData);
    getExpenseByCategoryChart().then(setExpenseData);
  }, []);

  if (!summary) return <p className="p-6">Loading dashboard...</p>;

  const cards = [
    { label: "Total Projects", value: summary.totalProjects },
    { label: "Active Sites", value: summary.activeSites },
    { label: "Avg Progress", value: `${summary.avgProgressPercent.toFixed(1)}%` },
    { label: "Total Expense", value: `₹${summary.totalExpense.toLocaleString()}` },
    { label: "Low Stock Items", value: summary.lowStockMaterialsCount },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white shadow rounded p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-teal-700">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-bold mb-3">Progress by Project</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="projectName" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgPercentComplete" fill="#0F6E56" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="font-bold mb-3">Expense by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={expenseData} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={90} label>
                {expenseData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}