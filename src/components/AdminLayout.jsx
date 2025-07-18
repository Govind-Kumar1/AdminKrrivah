import React from 'react';
import Sidebar from './Sidebar'; // Sidebar ka path adjust karein
import { LogOut } from 'lucide-react';

const AdminLayout = ({ breadcrumbs, children }) => {
  return (
    <div className="relative md:flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content Area (Sidebar ke bagal wala) */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header Bar (Dark wala) */}
        <header className="bg-[#393F36] text-white p-4 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Administrator Panel</h1>
          </div>
          <button title="Logout" className="hover:text-red-400">
            <LogOut size={22} />
          </button>
        </header>
        
        {/* Breadcrumb Bar (Halka grey wala) */}
        <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
            <p className="text-sm text-gray-600">
                {breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                        {/* Agar link hai to 'a' tag, warna simple text */}
                        {crumb.link ? 
                          <a href={crumb.link} className="hover:underline">{crumb.name}</a> 
                          : <span>{crumb.name}</span>
                        }
                        {/* Aakhri item ke baad '>' nahi dikhana */}
                        {index < breadcrumbs.length - 1 && <span className="mx-2">&gt;</span>}
                    </span>
                ))}
            </p>
        </div>

        {/* Page ka Asli Content (jaise Blog ka table/form) */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;