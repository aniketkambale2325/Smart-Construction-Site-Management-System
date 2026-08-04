import { useState } from "react";
import { useParams } from "react-router-dom";
import { generateSalary } from "../../api/salaryApi";


export default function SalaryPage(){

    const {employeeId} = useParams();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const data = await generateSalary(employeeId, Number(month), Number(year));
            setResult(data);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Generate Salary -- Employee #{employeeId}</h1>

      <form onSubmit={handleGenerate} className="bg-white shadow rounded p-4 flex gap-3 items-end mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Month</label>
          <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded px-3 py-2 w-20" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="border rounded px-3 py-2 w-24" />
        </div>
        <button type="submit" disabled={loading} className="bg-teal-700 text-white px-4 py-2 rounded">
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div className="bg-white shadow rounded p-4">
          <p>Days Present: <strong>{result.daysPresent}</strong></p>
          <p>Amount: <strong>₹{result.amount}</strong></p>
        </div>
      )}
    </div>

    )




}