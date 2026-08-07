import { useState } from "react";
import { useParams } from "react-router-dom";
import { addDailyReport, uploadSitePhoto } from "../../api/siteApi";

export default function DailyReportForm() {
  const { siteId } = useParams();
  const [description, setDescription] = useState("");
  const [percentComplete, setPercentComplete] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);

    try {
      // upload each selected photo first, collect the returned URLs
      const imageUrls = [];
      for (const file of files) {
        const url = await uploadSitePhoto(siteId, file);
        imageUrls.push(url);
      }

      await addDailyReport(siteId, {
        description,
        imageUrls,
        percentComplete: Number(percentComplete),
      });

      setSuccess(true);
      setDescription("");
      setPercentComplete(0);
      setFiles([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Submit Daily Report -- Site #{siteId}</h1>

      {success && <p className="text-green-600 text-sm mb-3">Report submitted successfully.</p>}

      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3 h-24"
        required
      />

      <label className="block text-sm font-medium mb-1">Percent Complete</label>
      <input
        type="number"
        min="0"
        max="100"
        value={percentComplete}
        onChange={(e) => setPercentComplete(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
        required
      />

      <label className="block text-sm font-medium mb-1">Site Photos</label>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full mb-4" />

      <button type="submit" disabled={uploading} className="bg-teal-700 text-white px-4 py-2 rounded disabled:opacity-50">
        {uploading ? "Uploading & Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}