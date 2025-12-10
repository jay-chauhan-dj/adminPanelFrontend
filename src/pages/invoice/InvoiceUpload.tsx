// InvoiceUpload.tsx (Professional English & Clean UI)
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
    currency: "USD", // Changed default to USD for standard
    remarks: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(key: keyof InvoiceForm, value: string) {
    setForm({ ...form, [key]: value });
  }

  const showMessage = (msg: string, success: boolean) => {
    setMessage(msg);
    setIsSuccess(success);
  };

  const handleUpload = async () => {
    // Mandate checks
    if (!file) return showMessage("❌ Please select an invoice file.", false);
    if (!form.invoiceNumber || !form.invoiceDate) {
      return showMessage(
        "❌ Invoice Number and Invoice Date are mandatory fields.",
        false
      );
    }
    if (!form.clientName || !form.amount || !form.currency) {
      return showMessage(
        "⚠️ Client Name, Amount, and Currency are highly recommended.",
        false
      );
    }

    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("file", file);

    try {

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

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

      showMessage(
        `✅ Upload successful! ${fileName ? "File: " + fileName : ""}`,
        true
      );

      // Reset form after successful upload
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
      const serverMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "❌ Upload failed. Check server status/configuration.";
      showMessage(serverMsg, false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <span className="text-sky-400 text-4xl">🧾</span> Upload New Invoice
        </h2>
        <p className="text-gray-400 mt-2">
          Attach the invoice file and enter required metadata for organized storage.
        </p>
      </header>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl ">
        <Input
          label="Client Name"
          value={form.clientName}
          onChange={(v) => update("clientName", v)}
          placeholder="e.g., Global Tech Solutions"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Invoice Number"
            value={form.invoiceNumber}
            onChange={(v) => update("invoiceNumber", v)}
            placeholder="e.g., INV-2025-001"
            required
          />
          <Input
            label="Invoice Date"
            type="date"
            value={form.invoiceDate}
            onChange={(v) => update("invoiceDate", v)}
            required
          />
          <Input
            label="Payment Due Date"
            type="date"
            value={form.dueDate}
            onChange={(v) => update("dueDate", v)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(v) => update("amount", v)}
            placeholder="e.g., 15000.00"
            required
          />
          <Input
            label="Currency"
            value={form.currency}
            onChange={(v) => update("currency", v)}
            placeholder="e.g., USD, EUR"
            required
          />
          <div />
        </div>

        <TextArea
          label="Remarks (Optional)"
          value={form.remarks}
          onChange={(v) => update("remarks", v)}
          placeholder="Any internal notes about this invoice..."
        />

        <FileUpload setFile={setFile} fileName={file?.name || null} />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 ease-in-out transform hover:scale-[1.01] text-white
            ${
              loading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700 shadow-2xl shadow-sky-500/30"
            }
          `}
        >
          {loading ? "Uploading Invoice..." : "Upload Invoice"}
        </button>

        {message && (
          <div
            className={`mt-4 text-sm text-center p-4 rounded-lg font-semibold transition-colors duration-300
              ${
                isSuccess
                  ? "bg-green-900/40 text-green-400 border border-green-500/50"
                  : "bg-red-900/40 text-red-400 border border-red-500/50"
              }
            `}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable UI components (Input, TextArea, FileUpload - with professional English)

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 
                   focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition duration-150 shadow-inner"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

function TextArea({ label, value, onChange, placeholder }: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 
                   focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition duration-150 resize-y shadow-inner"
      />
    </div>
  );
}

interface FileUploadProps {
  setFile: (f: File | null) => void;
  fileName: string | null;
}

function FileUpload({ setFile, fileName }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Select Invoice File (.pdf, .jpg, .png)
      </label>
      <div className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg bg-gray-900">
        <label className="cursor-pointer flex items-center justify-center px-4 py-2 border border-sky-600 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition duration-150 shadow-md">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          {fileName ? "Change File" : "Choose File"}
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        <div className="text-sm text-gray-400 truncate flex-1">
          {fileName ? (
            <span className="text-sky-300 font-medium">{fileName}</span>
          ) : (
            "No file selected"
          )}
        </div>
      </div>
    </div>
  );
}