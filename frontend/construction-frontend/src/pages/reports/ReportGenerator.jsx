import { useState } from "react";
import { useParams } from "react-router-dom";
import { generateReportPdf } from "../../api/aiApi";


export default function ReportGenerator() {

    const {siteId} = useParams();
    const [reportType, setReportType] = useState("daily");
    const [siteName, setSiteName] = useState("");
    const [percentComplete, setPercentComplete] = useState(0);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setPdfUrl(null);

        try{
            const result = await generateReportPdf(Number(siteId), reportType, {
                siteName,
                reportDate: new Date().toISOString().slice(0, 10),
                percentComplete: Number(percentComplete),
                description,
                submittedBy: localStorage.getItem("userId"),
            });
            setPdfUrl(result.pdfUrl);

        } catch (err) {
          setError("Report generation failed — the AI service may be temporarily unavailable. Try again shortly.");  
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="p-6 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Generate Report — Site #{siteId}</h1>

            <form onSubmit={handleGenerate} className="bg-white shadow rounded p-4">
                <label className="block text-sm font-medium mb-1">Report Type</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="completion">Completion</option>
                </select>

                <label className="block text-sm font-medium mb-1">Site Name</label>
                <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" required />

                <label className="block text-sm font-medium mb-1">Percent Complete</label>
                <input type="number" min="0" max="100" value={percentComplete} onChange={(e) => setPercentComplete(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" required />

                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 mb-4 h-24" required />

                <button type="submit" disabled={loading} className="bg-teal-700 text-white px-4 py-2 rounded disabled:opacity-50">
                {loading ? "Generating PDF..." : "Generate Report"}
                </button>
            </form>

            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

            {pdfUrl && (
                <div className="bg-white shadow rounded p-4 mt-4">
                <p className="mb-2 text-green-700 font-medium">Report generated successfully.</p>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">
                    Download PDF Report
                </a>
                </div>
            )}
    </div>

    )
}