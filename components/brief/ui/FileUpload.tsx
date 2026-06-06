"use client";

import { useState, useRef } from "react";
import Icon from "./Icon";

type FileItem = File | { name: string; size: number; type: string; url: string };

export default function FileUpload({
  label,
  accept = ".pdf,.png,.jpg,.jpeg,.svg,.eps,.ai",
  description,
  files = [],
  onFilesChange,
}: {
  label?: string;
  accept?: string;
  description?: string;
  files?: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesChange([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesChange([...files, ...Array.from(e.target.files)]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging ? "border-accent bg-accent/5" : "border-card-border hover:border-accent/50 bg-card"
        }`}
      >
        <Icon name="cloud_upload" className="text-accent text-4xl mb-3" />
        <p className="font-semibold text-primary mb-1">Arrastra tus archivos aquí o haz clic</p>
        <p className="text-sm text-muted">{description || "PDF, PNG, JPG, SVG, EPS"}</p>
        <input ref={inputRef} type="file" accept={accept} multiple onChange={handleChange} className="hidden" />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-surface-muted rounded-lg hover:bg-card-border/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name={file.type?.includes("pdf") ? "description" : "image"} className="text-accent" />
                <div>
                  <p className="text-sm font-semibold text-primary">{file.name}</p>
                  <p className="text-[0.7rem] text-muted uppercase font-bold tracking-tight">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="text-muted-light hover:text-accent transition-colors"
              >
                <Icon name="close" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
