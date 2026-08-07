import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { markAttendance, getAttendanceHistory } from "../../api/attendanceApi";

export default function AttendancePage() {
  const { employeeId } = useParams();
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("PRESENT");

  const loadHistory = () => {
    getAttendanceHistory(employeeId).then(setHistory);
  };

  useEffect(() => {
    loadHistory();
  }, [employeeId]);

  const handleMark = async (e) => {
    e.preventDefault();
    await markAttendance(Number(employeeId), date, status);
    loadHistory();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance — Employee #{employeeId}</h1>

      <form onSubmit={handleMark} className="bg-white shadow rounded p-4 mb-6 flex gap-3 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2">
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="HALF_DAY">Half Day</option>
          </select>
        </div>
        <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">
          Mark
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Marked By</th>
          </tr>
        </thead>
        <tbody>
          {history.map((rec) => (
            <tr key={rec.id} className="border-t">
              <td className="p-3">{rec.date}</td>
              <td className="p-3">{rec.status}</td>
              <td className="p-3">{rec.markedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
