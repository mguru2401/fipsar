import React, { useState } from "react";
import { Card, Empty } from "antd";
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaFileExcel,
  FaDownload,
  FaRegEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoDocumentAttach } from "react-icons/io5";

interface UploadedFilesProps {
  files: { name: string; url: string }[];
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ files }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const getFileIcon = (fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf className="uploadfiles-icon text-danger" size={36} />;
      case "ppt":
      case "pptx":
        return (
          <FaFilePowerpoint
            className="uploadfiles-icon text-warning"
            size={36}
          />
        );
      case "xls":
      case "xlsx":
        return (
          <FaFileExcel className="uploadfiles-icon text-success" size={36} />
        );
      case "doc":
      case "docx":
        return (
          <IoDocumentAttach
            className="uploadfiles-icon text-primary"
            size={36}
          />
        );
      default:
        return (
          <FaFilePdf className="uploadfiles-icon text-secondary" size={36} />
        );
    }
  };

  const handleActionClick = (
    action: string,
    file: { name: string; url: string }
  ) => {
    if (action === "View") {
      navigate(`/preview/${file.name}`, {
        state: { fileUrl: file.url },
      });
    } else if (action === "Download") {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(`${action} clicked for file: ${file.name}`);
    }
  };

  return (
    <Card
      title={<div style={{ textAlign: "center", width: "100%" }}>Uploaded Files</div>}
      className="uploadfiles-container"
      bordered
    >
      {files.length > 0 ? (
        <div className="container">
          <div className="row">
            {files.map((file, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
                <div
                  className="uploadfiles-item card position-relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === index ? (
                    <div className="hover-actions">
                      <FaRegEye
                        className="action-icon mb-2"
                        size={20}
                        onClick={() => handleActionClick("View", file)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <FaDownload
                        className="action-icon mb-2"
                        size={18}
                        onClick={() => handleActionClick("Download", file)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                    </div>
                  ) : (
                    <>
                      {getFileIcon(file.name)}
                      <div
                        className="uploadfiles-name mt-2 text-center"
                        style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          wordWrap: "break-word",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "120px",
                        }}
                      >
                        {file.name}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty
          description="No files uploaded yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="uploadfiles-empty"
        />
      )}
    </Card>
  );
};

export default UploadedFiles;
