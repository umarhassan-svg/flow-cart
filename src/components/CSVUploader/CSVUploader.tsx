import React, { useState } from "react";
import { useParseCSV } from "../../hooks/useParseCSV";

type CSVUploaderProps = {
  requiredFields: string[];
  onSubmit: (
    mappedRows: Record<string, string | number>[]
  ) => void | Promise<void>;
  previewCount?: number;
};

const CSVUploader: React.FC<CSVUploaderProps> = ({
  requiredFields,
  onSubmit,
  previewCount = 5,
}) => {
  const {
    data: rows,
    headers: rawHeaders,
    loading: parsing,
    error: parseError,
    parseFile,
    reset: resetParser,
  } = useParseCSV();

  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMappingChange = (field: string, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);

    // Ensure all required fields are mapped
    for (const req of requiredFields) {
      if (!mapping[req]) {
        setError(`Please map required field: "${req}"`);
        return;
      }
    }

    // Remap rows using the selected header mapping
    const mappedRows = rows.map((row) => {
      const mapped: Record<string, string> = {};
      for (const req of requiredFields) {
        const col = mapping[req];
        mapped[req] = row[col] ?? "";
      }
      return mapped;
    });

    try {
      setSubmitting(true);
      await onSubmit(mappedRows);
      reset();
      alert("Bulk data uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    resetParser();
    setMapping({});
    setError(null);
  };

  return (
    <div className="bg-white border rounded-md p-5 shadow-sm max-w-3xl mx-auto">
      {/* Upload Field */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload CSV File
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => void parseFile(e.target.files?.[0])}
        className="mb-4 text-sm"
      />

      {parsing && <p className="text-sm text-gray-500 mb-3">Parsing CSV…</p>}

      {parseError && <p className="text-sm text-red-600 mb-3">{parseError}</p>}

      {/* Mapping Section */}
      {rawHeaders.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Map CSV Columns to Required Fields
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requiredFields.map((reqField) => (
              <div key={reqField} className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">{reqField}</label>
                <select
                  value={mapping[reqField] ?? ""}
                  onChange={(e) =>
                    handleMappingChange(reqField, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="">-- Select CSV Column --</option>
                  {rawHeaders.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Table */}
      {rows.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Preview (first {previewCount} rows)
          </p>
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  {rawHeaders.map((h) => (
                    <th key={h} className="px-3 py-2 text-xs text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, previewCount).map((r, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-50">
                    {rawHeaders.map((h) => (
                      <td key={h} className="px-3 py-2">
                        {r[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={reset}
          className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting || rows.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit Bulk Orders"}
        </button>
      </div>
    </div>
  );
};

export default CSVUploader;
