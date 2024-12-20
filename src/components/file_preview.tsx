import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import FileViewer from "react-file-viewer";
import Search from "./search";

const FilePreview: React.FC = () => {
  const { file_id } = useParams<{ file_id: string }>();
  const location = useLocation();

  const fileUrl = location.state?.fileUrl;
  const fileType = fileUrl?.split(".").pop()?.toLowerCase();

  const [excelData, setExcelData] = useState<any>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onError = (error: any) => {
    console.error("Error displaying the file preview:", error);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + " " + sizes[i];
  };

  useEffect(() => {
    if (fileUrl) {
      fetch(fileUrl, { method: "HEAD" })
        .then((response) => {
          const size = response.headers.get("content-length");
          if (size) {
            setFileSize(formatFileSize(Number(size)));
          }
        })
        .catch(onError);
    }
  }, [fileUrl]);

  useEffect(() => {
    if (fileType === "xls" || fileType === "xlsx") {
      fetch(fileUrl)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setExcelData(jsonData);
        })
        .catch(onError);
    }
  }, [fileUrl, fileType]);

  const filteredData = excelData
    ? excelData.filter((row: any) =>
        row.some((cell: any) =>
          cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  if (!fileUrl) {
    return <p>File not found.</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">File Preview</h2>
      <p>Previewing file: {file_id}</p>
      {fileSize && <p>File Size: {fileSize}</p>}

      {/* Search Box Component */}
      <Search onSearch={setSearchTerm} />

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        {/* Responsive File Preview Area */}
        {fileType === "pdf" ? (
          <iframe
            src={fileUrl}
            title={`File Preview: ${file_id}`}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            className="embed-responsive-item"
          ></iframe>
        ) : fileType === "docx" || fileType === "doc" ? (
          <div className="embed-responsive embed-responsive-16by9">
            <FileViewer
              fileType={fileType}
              filePath={fileUrl}
            //   onError={onError}
            />
          </div>
        ) : fileType === "xls" || fileType === "xlsx" ? (
          <div className="table-responsive">
            {filteredData.length > 0 ? (
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {filteredData[0].map((col: any, index: number) => (
                      <th key={index}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(1).map((row: any, index: number) => (
                    <tr key={index}>
                      {row.map((cell: any, idx: number) => (
                        <td key={idx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        ) : (
          <p>File type not supported for preview.</p>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
//fully functioned 
