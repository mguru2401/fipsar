import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FileUpload from "./components/file_upload";
import FilePreview from "./components/file_preview";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Route for file upload */}
            <Route path="/" element={<FileUpload name="Fipsar User" />} />

            {/* Route for file preview */}
            <Route path="/preview/:file_id" element={<FilePreview />} />
          </Routes>
        </main>
      </div>
       <ToastContainer />
    </Router>
  );
}

export default App;
