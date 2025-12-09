// InvoiceExport.tsx (Fully Corrected + Auth + ZIP Download)
import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/v1";

export default function InvoiceExport() {
  const [zipStartDate, setZipStartDate] = useState("");
  const [zipEndDate, setZipEndDate] = useState("");
  const [zipEmail, setZipEmail] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);

  const showMessage = (msg: string, success: boolean) => {
    setMessage(msg);
    setIsSuccess(success);
  };

  // ----------------- ZIP DOWNLOAD WITH AUTH -----------------
  const handleDownloadZip = async () => {
    if (!zipStartDate || !zipEndDate) {
      return showMessage("❌ Both Start Date and End Date are required.", false);
    }

    if (zipStartDate > zipEndDate) {
      return showMessage("❌ Start Date cannot be after End Date.", false);
    }

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

      const response = await axios.get(
        `${API}/invoices/zip/download?startDate=${zipStartDate}&endDate=${zipEndDate}`,
        {
          responseType: "blob",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute(
        "download",
        `Invoices_${zipStartDate}_to_${zipEndDate}.zip`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      showMessage("✅ ZIP downloaded successfully!", true);
    } catch (err: any) {
      console.error("ZIP Download Error:", err);
      showMessage("❌ Unauthorized or No data found!", false);
    }
  };

  // ----------------- EMAIL ZIP (Later Step) -----------------
  const handleZipEmail = async () => {
    if (!zipStartDate || !zipEndDate || !zipEmail) {
      return showMessage("❌ All fields are required.", false);
    }

    if (zipStartDate > zipEndDate) {
      return showMessage("❌ Start Date cannot be after End Date.", false);
    }

    setLoadingMail(true);
    setMessage("");

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

      const res = await axios.post(
        `${API}/invoices/zip-range`,
        {
          startDate: zipStartDate,
          endDate: zipEndDate,
          email: zipEmail,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      showMessage(
        res.data?.message || "📩 Email sent successfully!",
        true
      );
    } catch (err: any) {
      console.error("Mail ZIP Error:", err);
      showMessage("❌ Failed! Check server or mail config.", false);
    }

    setLoadingMail(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <span className="text-sky-400 text-4xl">📦</span> Export Invoices
        </h2>
        <p className="text-gray-400 mt-2">
          Download invoices by selecting a date range.
        </p>
      </header>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6 shadow-2xl">
        {/* Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SimpleInput
            label="Start Date *"
            type="date"
            value={zipStartDate}
            onChange={setZipStartDate}
          />
          <SimpleInput
            label="End Date *"
            type="date"
            value={zipEndDate}
            onChange={setZipEndDate}
          />
        </div>

        {/* Email Input */}
        <div className="pt-4 border-t border-gray-700">
          <SimpleInput
            label="Email for ZIP (Optional)"
            type="email"
            value={zipEmail}
            onChange={setZipEmail}
            placeholder="billing@company.com"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 text-white">
          <button
            onClick={handleDownloadZip}
            className="flex-1 py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 transition"
          >
            ⬇ Download ZIP
          </button>

          <button
            onClick={handleZipEmail}
            disabled={loadingMail}
            className={`flex-1 py-4 rounded-xl font-bold transition ${
              loadingMail
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loadingMail ? "Sending..." : "✉ Send ZIP via Email"}
          </button>
        </div>

        {/* Status */}
        {message && (
          <div
            className={`mt-4 p-3 text-center text-sm rounded ${
              isSuccess ? "bg-green-800 text-green-300" : "bg-red-800 text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

function SimpleInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
      />
    </div>
  );
}
