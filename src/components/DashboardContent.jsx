import React from "react";
import StatCard from "./StatCard"; // StatCard component import karein
import { Users, FileText, LayoutPanelLeft } from "lucide-react"; // Icons import karein

const DashboardContent = () => {
  return (
    <div>
      {/* Aap yahan grid layout ka istemal karke aur bhi cards add kar sakte hain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Enquiry Card */}
        <StatCard
          icon={<Users size={28} className="text-blue-500" />}
          value="12"
          title="ENQUIRY"
          subtitle="Enquiry Count"
        />

        {/* Project Card (Example) */}
        <StatCard
          icon={<LayoutPanelLeft size={28} className="text-green-500" />}
          value="8"
          title="PROJECTS"
          subtitle="Total Projects"
        />
        
        {/* Blog Card (Example) */}
        <StatCard
          icon={<FileText size={28} className="text-orange-500" />}
          value="27"
          title="BLOGS"
          subtitle="Published Blogs"
        />

      </div>
    </div>
  ); 
};

export default DashboardContent;