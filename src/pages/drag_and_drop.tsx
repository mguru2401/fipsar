import React from "react";
import { Card } from "antd";
import UploadBox from "../components/upload_box";

const DragAndDrop: React.FC = () => {
  return (
    <div className="drag-and-drop-container">
      <Card hoverable className="drag-and-drop-card" style={{ width: "100%" }}>
        <UploadBox />
      </Card>
    </div>
  );
};

export default DragAndDrop;
