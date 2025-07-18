import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Sahi path dein
import TableProject from "../components/projectComponents/TableProject.jsx"; // Sahi path dein

const ProjectPage = () => {
    // Project page ke liye breadcrumbs
    const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Project" }
    ];

    return (
        // AdminLayout ko use karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Page ka content yahan daalein */}
            <TableProject />
        </AdminLayout>
    );
};

export default ProjectPage;