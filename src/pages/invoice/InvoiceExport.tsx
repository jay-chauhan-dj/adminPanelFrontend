// InvoiceExport.tsx
import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/v1";

export default function InvoiceExport() {
  const [zipStartDate, setZipStartDate] = useState("");
  const [zipEndDate, setZipEndDate] = useState("");
  const [zipEmail, setZipEmail] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);

  const showMessage = (msg: string, success = false) => {
    setMessage(msg);
    setIsSuccess(success);
  };

  // ↓ spinner element reused
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  // ----------------- ZIP DOWNLOAD (email required) -----------------
  const handleDownloadZip = async () => {
    setMessage("");
    if (!zipStartDate || !zipEndDate) {
      return showMessage("❌ Start Date and End Date are required.");
    }
    if (zipStartDate > zipEndDate) {
      return showMessage("❌ Start Date cannot be after End Date.");
    }
    if (!zipEmail) {
      return showMessage("⚠️ Enter an email to receive the ZIP password (email is required).");
    }

    setLoadingDownload(true);
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken") ||
        "";

      const url = `${API}/invoices/zip/download?startDate=${encodeURIComponent(
        zipStartDate
      )}&endDate=${encodeURIComponent(zipEndDate)}&email=${encodeURIComponent(zipEmail)}`;

      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      // Trigger download
      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `Invoices_${zipStartDate}_to_${zipEndDate}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      showMessage(`✅ ZIP downloaded. Password has been emailed to ${zipEmail}.`, true);
    } catch (err: any) {
      console.error("ZIP Download Error:", err);
      const serverMsg = err?.response?.data?.message || "❌ Download failed. Check server or mail config.";
      showMessage(serverMsg, false);
    } finally {
      setLoadingDownload(false);
    }
  };

  // ----------------- SEND ZIP VIA EMAIL -----------------
  const handleZipEmail = async () => {
    setMessage("");
    if (!zipStartDate || !zipEndDate || !zipEmail) {
      return showMessage("❌ Start Date, End Date and Email are required for emailing the ZIP.");
    }
    if (zipStartDate > zipEndDate) {
      return showMessage("❌ Start Date cannot be after End Date.");
    }

    setLoadingMail(true);
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken") ||
        "";

      const res = await axios.post(
        `${API}/invoices/zip-range`,
        { startDate: zipStartDate, endDate: zipEndDate, email: zipEmail },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      showMessage(res.data?.message || `📩 Email sent to ${zipEmail}.`, true);
    } catch (err: any) {
      console.error("Mail ZIP Error:", err);
      const serverMsg = err?.response?.data?.message || "❌ Failed to send. Check server or mail config.";
      showMessage(serverMsg, false);
    } finally {
      setLoadingMail(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400 text-3xl">📦</span> Export Invoices
        </h2>
        <p className="text-gray-400 mt-1">Select date range and enter email to receive password for the ZIP.</p>
      </header>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-5 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-gray-300 mb-1">Start Date *</div>
            <input
              type="date"
              value={zipStartDate}
              onChange={(e) => setZipStartDate(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </label>

          <label className="block">
            <div className="text-sm text-gray-300 mb-1">End Date *</div>
            <input
              type="date"
              value={zipEndDate}
              onChange={(e) => setZipEndDate(e.target.value)}
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </label>
        </div>

        <label className="block">
          <div className="text-sm text-gray-300 mb-1">Email for ZIP (Required — password will be emailed)</div>
          <input
            type="email"
            value={zipEmail}
            onChange={(e) => setZipEmail(e.target.value)}
            placeholder="billing@company.com"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
          />
        </label>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={!zipEmail || loadingDownload}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              !zipEmail || loadingDownload
                ? "bg-emerald-600/40 cursor-not-allowed opacity-80"
                : "bg-emerald-600 hover:bg-emerald-700"
            } text-white flex items-center justify-center gap-2`}
          >
            {loadingDownload ? <><Spinner /> Downloading...</> : <>⬇ Download ZIP</>}
          </button>

          <button
            onClick={handleZipEmail}
            disabled={loadingMail}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              loadingMail ? "bg-sky-600/40 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
            } text-white flex items-center justify-center gap-2`}
          >
            {loadingMail ? <><Spinner /> Sending...</> : <>✉ Send ZIP via Email</>}
          </button>
        </div>

        {message && (
          <div
            className={`mt-2 p-3 rounded text-sm text-center ${
              isSuccess ? "bg-green-900/60 text-green-200" : "bg-red-900/60 text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
