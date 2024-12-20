# Fipsar File Management System

## Overview
The Fipsar File Management System is a web application designed for users to upload, preview, and manage files with a clean and intuitive interface. The project is built using React (with TypeScript), Ant Design, and several supporting libraries, with a Node.js backend for handling file uploads.

## Features

1. **File Upload**
   - Drag-and-drop functionality for file uploads.
   - Supports multiple file formats:
     - .doc, .docx
     - .pdf
     - .ppt, .pptx
     - .xls, .xlsx
   - Real-time file validation for supported formats.
   - Toast notifications for successful or failed uploads.

2. **File Preview**
   - View files directly in the browser.
   - Preview types:
     - PDFs displayed using an inline iframe.
     - Excel files displayed in a table format.
     - Word documents rendered using `react-file-viewer`.
   - Search functionality.

3. **File Management**
   - List of uploaded files displayed with file type icons.
   - Hover-based actions for viewing and downloading files.
   - Responsive design for managing files across various screen sizes.

## Project Structure
```
.
├── public
├── src
│   ├── components
│   │   ├── file_upload.tsx
│   │   ├── file_preview.tsx
│   │   ├── upload_box.tsx
│   │   ├── uploaded_files.tsx
│   ├── pages
│   │   ├── drag_and_drop.tsx
│   │   ├── search.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
├── package.json
├── yarn.lock
└── README.md
```

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/fipsar.git
   cd fipsar
   ```

2. **Install Dependencies**
   Use Yarn to install all necessary dependencies:
   ```bash
   yarn install
   ```

3. **Start the Frontend Server**
   ```bash
   yarn start
   ```

4. **Run the Backend**
   Clone the backend repository `fipsar-api` and follow its setup instructions. Ensure the backend is running on `http://localhost:5000`.

## Key Components

### App.tsx
- The main entry point for the application.
- Handles routing for:
  - `/` (File Upload Page)
  - `/preview/:file_id` (File Preview Page)

### FileUpload Component
- Displays the drag-and-drop area for file uploads.
- Integrates with the `DragAndDrop` component for a user-friendly upload experience.

### DragAndDrop Component
- Uses Ant Design's `Card` component for styling.
- Embeds the `UploadBox` component for file handling.

### UploadBox Component
- Implements file upload functionality using Ant Design's `Upload` component.
- Sends files to the backend using Axios.
- Displays a list of uploaded files using the `UploadedFiles` component.

### UploadedFiles Component
- Displays a grid of uploaded files.
- Shows file type icons and hover actions for viewing and downloading files.
- Uses React Router's `useNavigate` for navigation to the file preview page.

### FilePreview Component
- Renders the preview of supported file types.
- Uses `react-file-viewer` for document previews.
- Displays Excel files in a table format with search functionality.

## Libraries and Tools Used

- **React**: For building the user interface.
- **Bootstrap**: For Responsive UI.
- **TypeScript**: For type safety.
- **Ant Design**: For UI components.
- **Axios**: For handling API requests.
- **React-Router-DOM**: For routing.
- **React-Toastify**: For notifications.
- **React-File-Viewer**: For document previews.
- **XLSX**: For parsing Excel files.

## Backend Integration

- The backend handles file uploads and returns URLs for the uploaded files.
- API Endpoint for file upload:
  ```
  POST http://localhost:5000/api/files/upload
  ```



## Outputs:

User Interface
![image](https://github.com/user-attachments/assets/d0b8d3d5-1a22-4d0e-9b7b-d9aeafddfb34)
Responsive User Interface (Mobile VIew)
![image](https://github.com/user-attachments/assets/9ba8b6de-ab79-4899-adfb-d195f5346da5)
Un Supported File Upload scenerio
![image](https://github.com/user-attachments/assets/345d1312-f1f1-49ad-81bb-fba461ddd74a)
Successfull File Upload 
![image](https://github.com/user-attachments/assets/1d1ed2d9-2910-4812-aaf5-aa14cb9da87c)
Uploaded Files Shown Here 

![image](https://github.com/user-attachments/assets/469b2a0d-8da0-40cd-a4e8-6502ad720b50)
![image](https://github.com/user-attachments/assets/9e9da55a-f94f-4eec-88f4-4a561a9106c3)
![image](https://github.com/user-attachments/assets/a5fbcfa0-301d-408d-a063-ca090a425a87)
![image](https://github.com/user-attachments/assets/6635a5f1-84d2-4b53-9d54-8d49e3003d94)
Uploading Multiple File Upload 
![image](https://github.com/user-attachments/assets/8ed689c4-9625-4eae-87c8-6bc2e057cce1)
Download Functions
![image](https://github.com/user-attachments/assets/8cb95f04-0825-49a7-a317-13518d0b1155)

