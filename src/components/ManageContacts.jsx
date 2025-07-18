import React, { useState, useEffect } from "react";

// Real application me aap API se data fetch karenge
// import { fetchContacts } from "../api/contactAPI";

export default function ManageContacts() {
  // Abhi ke liye sample data use kar rahe hain
  const [contacts, setContacts] = useState([
    {
      id: "123456789",
      timestamp: "18-07-2025 11:30 AM",
      firstName: "Aarav",
      lastName: "Sharma",
      email: "aarav.sharma@example.com",
      phone: "9876543210",
      message: "This is a test message regarding an inquiry.",
    },
    {
      id: "123456790",
      timestamp: "18-07-2025 10:15 AM",
      firstName: "Priya",
      lastName: "Patel",
      email: "priya.patel@example.com",
      phone: "9123456780",
      message: "Interested in your design services. Please call back.",
    },
    {
      id: "123456791",
      timestamp: "17-07-2025 05:45 PM",
      firstName: "Rohan",
      lastName: "Singh",
      email: "rohan.singh@example.com",
      phone: "9988776655",
      message: "Hello, can I get a quote for a project?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // API se data fetch karne ka example
  /*
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);
  */

  return (
    <div className="bg-white p-1 rounded-lg">
      {/* Header */}
      <div className="bg-[#393F36] text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-medium">Manage Contacts</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-t-0 rounded-b-lg">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-black/80">
                <th className="p-3 font-semibold">Id</th>
                <th className="p-3 font-semibold">Time Stamp</th>
                <th className="p-3 font-semibold">First Name</th>
                <th className="p-3 font-semibold">Last Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Phone Number</th>
                <th className="p-3 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="p-3 text-gray-600">{contact.id}</td>
                  <td className="p-3 text-gray-700">{contact.timestamp}</td>
                  <td className="p-3 font-medium">{contact.firstName}</td>
                  <td className="p-3 font-medium">{contact.lastName}</td>
                  <td className="p-3 text-blue-600 hover:underline">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td className="p-3">{contact.phone}</td>
                  <td className="p-3 text-gray-700 max-w-xs truncate" title={contact.message}>
                    {contact.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 