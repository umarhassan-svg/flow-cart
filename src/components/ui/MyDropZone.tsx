import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Toast } from "./Toast";

type Props = {
  onUpload: (file: File) => void;
  fileExtensions: string[]; // Example: ['.csv', '.pdf']
};

const MyDropzone: React.FC<Props> = ({ onUpload, fileExtensions }: Props) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type?: "error" | "success";
  } | null>(null);

  const showError = (msg: string) => setToast({ msg, type: "error" });

  const isValidExtension = (fileName: string) => {
    const ext = fileName.toLowerCase().slice(fileName.lastIndexOf("."));
    return fileExtensions.includes(ext);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false);
      acceptedFiles.forEach((file) => {
        if (isValidExtension(file.name)) {
          onUpload(file);
          setToast({ msg: `Uploaded: ${file.name}`, type: "success" });
        } else {
          showError(`Unsupported file type: ${file.name}`);
        }
      });
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <>
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg py-10 px-6 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 scale-[1.01] shadow-md"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        <div className="text-4xl mb-2 text-gray-400">📁</div>

        <p className="text-gray-700 font-medium">
          Drag & drop files here or{" "}
          <span className="text-blue-600 underline">browse</span>
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Allowed: {fileExtensions.join(", ").toUpperCase()}
        </p>
      </div>
    </>
  );
};

export default MyDropzone;
