import React, { useState } from "react";
import { Upload, UploadProps } from "antd";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import UploadedFiles from "./uploaded_files";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Dragger } = Upload;

const UploadBox: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);

  const allowedFileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc
    "application/pdf", // .pdf
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "application/vnd.ms-powerpoint", // .ppt
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/plain", // .txt
  ];

  const handleFileUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success(`${file.name} Uploaded successfully.`);
        const fileURL = response.data.fileUrl;
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          { name: file.name, url: fileURL },
        ]);
      } else {
        toast.error(`${file.name} Upload failed.`);
      }
    } catch (error) {
      toast.error(`${file.name} upload failed.`);
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    fileList: [],
    beforeUpload: (file) => {
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(`Unsupported file format: ${file.name}`);
        return false; // Reject the file
      }
      handleFileUpload(file);
      return false; // Prevent default upload behavior
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger {...props} className="upload-box">
        <p className="ant-upload-drag-icon">  
          <IoCloudUploadSharp />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </Dragger>
      <div style={{ marginTop: "20px" }}>
        <UploadedFiles files={uploadedFiles} />
      </div>
    </>
  );
};

export default UploadBox;
