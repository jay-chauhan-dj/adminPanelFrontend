// InvoiceUpload.tsx
import React, { useState } from "react";
import axios from "axios";

interface InvoiceForm {
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  currency: string;
  remarks: string;
}

const API = "http://localhost:3000/v1";

export default function InvoiceUpload() {
  const [form, setForm] = useState<InvoiceForm>({
    clientName: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: "",
    currency: "USD",
    remarks: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(key: keyof InvoiceForm, value: string) {
    setForm({ ...form, [key]: value });
  }

  const showMessage = (msg: string, success = false) => {
    setMessage(msg);
    setIsSuccess(success);
  };

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

  const handleUpload = async () => {
    setMessage("");
    if (!file) return showMessage("❌ Please select an invoice file.");
    if (!form.invoiceNumber || !form.invoiceDate) {
      return showMessage("❌ Invoice Number and Invoice Date are mandatory.");
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
      data.append("file", file as File);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken") ||
        "";

      const res = await axios.post(`${API}/invoices`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const fileName =
        res.data?.file?.storedName ||
        res.data?.file?.originalName ||
        res.data?.fileName ||
        "";

      showMessage(`✅ Upload successful! ${fileName ? "File: " + fileName : ""}`, true);

      setForm({
        clientName: "",
        invoiceNumber: "",
        invoiceDate: "",
        dueDate: "",
        amount: "",
        currency: "USD",
        remarks: "",
      });
      setFile(null);
    } catch (err: any) {
      console.error("Upload error:", err);
      const serverMsg = err?.response?.data?.message || "❌ Upload failed. Check server.";
      showMessage(serverMsg, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400 text-3xl">🧾</span> Upload Invoice
        </h2>
        <p className="text-gray-400 mt-1">Attach invoice and enter metadata. Files stored by invoice date.</p>
      </header>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
        <Input label="Client Name" value={form.clientName} onChange={(v) => update("clientName", v)} placeholder="Client name" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Invoice Number" value={form.invoiceNumber} onChange={(v) => update("invoiceNumber", v)} required />
          <Input label="Invoice Date" type="date" value={form.invoiceDate} onChange={(v) => update("invoiceDate", v)} required />
          <Input label="Payment Due Date" type="date" value={form.dueDate} onChange={(v) => update("dueDate", v)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Amount" type="number" value={form.amount} onChange={(v) => update("amount", v)} required />
          <Input label="Currency" value={form.currency} onChange={(v) => update("currency", v)} required />
          <div />
        </div>

        <TextArea label="Remarks (Optional)" value={form.remarks} onChange={(v) => update("remarks", v)} />

        <FileUpload setFile={setFile} fileName={file?.name || null} />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 ${
            loading ? "bg-sky-600/50 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {loading ? <><Spinner /> Uploading...</> : "Upload Invoice"}
        </button>

        {message && (
          <div className={`mt-2 p-3 rounded text-sm text-center ${isSuccess ? "bg-green-900/60 text-green-200" : "bg-red-900/60 text-red-300"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable UI components
interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Input({ label, value, onChange, type = "text", placeholder, required = false }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white" />
    </div>
  );
}

function FileUpload({ setFile, fileName }: { setFile: (f: File | null) => void; fileName: string | null }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">Select Invoice File (.pdf, .jpg, .png)</label>
      <div className="flex items-center gap-4 p-3 border border-gray-700 rounded bg-gray-900">
        <label className="cursor-pointer px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded text-white font-medium">
          {fileName ? "Change File" : "Choose File"}
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="sr-only" />
        </label>
        <div className="text-sm text-gray-400 truncate">{fileName ? <span className="text-sky-300">{fileName}</span> : "No file selected"}</div>
      </div>
    </div>
  );
}
