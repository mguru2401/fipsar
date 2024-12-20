import React from 'react';
import DragAndDrop from '../pages/drag_and_drop';

interface FileUploadProps {
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ name }) => {
  return (

      <DragAndDrop/>
  )
};

export default FileUpload;
