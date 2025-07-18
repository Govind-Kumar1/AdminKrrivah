import React from "react";
import TableProject from "../components/projectComponents/TableProject.jsx";
import Sidebar from "../components/Sidebar.jsx";

const ProjectPage = () => {
  return (
    // 1. Main container with flex display
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* 2. Main content area that fills remaining space */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <TableProject />
      </main>
    </div>
  );
};

export default ProjectPage;