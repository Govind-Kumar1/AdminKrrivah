import React from "react";
import DashboardContent from "../components/DashboardContent.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { LogOut } from "lucide-react"; // Logout icon import karein

const DashboardPage = () => {
  return (
    <div className="relative md:flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Administrator Panel</h1>
          <button title="Logout" className="text-gray-600 hover:text-red-500">
            <LogOut size={22} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="text-sm text-gray-500 mb-4">
            Home &gt; Dashboard
          </div>
          <DashboardContent />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardPage;