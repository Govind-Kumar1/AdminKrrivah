import React from "react";
import ManageContacts from "../components/ManageContacts.jsx"; // Sahi path dein
import Sidebar from "../components/Sidebar.jsx"; // Sahi path dein

const ContactPage = () => {
  return (
    <div className="relative md:flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <ManageContacts />
      </main>
    </div>
  );
};

export default ContactPage; 