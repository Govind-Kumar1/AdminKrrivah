import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Sahi path dein
import TableProject from "../components/projectComponents/TableProject.jsx"; // Sahi path dein

const ProjectPage = () => {
  const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Projects" }
    ];

    return (
        // AdminLayout ko use karein aur breadcrumbs pass karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Beech mein page ka content daal dein */}
            <TableProject />
        </AdminLayout>
    );
};

export default ProjectPage;