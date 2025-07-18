import React, { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import logo from "/Logo.png"; // adjust path as needed
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const [homeDrawerOpen, setHomeDrawerOpen] = useState(false);

  const navLinks = [
    { name: "DASHBOARD" },
    { name: "HOME", path: "/", hasDrawer: true },
    { name: "DESIGN",path:'/design' },
    { name: "PROJECT", path: "/project" },
    { name: "BLOG",path:'/design' },
    { name: "STATISTICS",path:'/design' },
    { name: "CONTACT",path:'/design' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Hamburger menu (mobile only) */}
      <div className="md:hidden p-4 flex items-center justify-between">
        <img src={logo} alt="logo" className="h-8" />
        <button onClick={() => setOpenMobile(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar (desktop or mobile full screen) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transition-transform duration-300 
        ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        {/* Header with logo */}
        <div className="flex items-center gap-2 px-6 py-4">
          <img src={logo} alt="logo" className="h-12" />
          {/* <h1 className="text-lg font-semibold text-[#373D35]"></h1> */}
        </div>

        {/* Close button (mobile) */}
        <div className="md:hidden text-right px-6">
          <button onClick={() => setOpenMobile(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mt-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <div key={link.name}>
              <div
                className={`flex items-center justify-between px-6 py-2 text-sm font-semibold cursor-pointer
              ${
                isActive(link.path)
                  ? "bg-[#373D35] text-white"
                  : "text-[#373D35] hover:bg-gray-100"
              }`}
                onClick={() => {
                  if (link.hasDrawer) {
                    setHomeDrawerOpen(!homeDrawerOpen);
                  } else {
                    navigate(link.path);
                  }
                }}
              >
                <span>{link.name}</span>
                {link.hasDrawer && <Plus size={16} />}
              </div>

              {/* Home Drawer Links */}
              {link.name === "Home" && homeDrawerOpen && (
                <div className="pl-10 flex flex-col gap-1 text-sm font-medium text-[#373D35]">
                  <Link
                    to="/banner"
                    className={`py-1 hover:underline ${
                      isActive("/banner") ? "font-semibold text-black" : ""
                    }`}
                  >
                    Banner
                  </Link>
                  <Link
                    to="/gallery"
                    className={`py-1 hover:underline ${
                      isActive("/gallery") ? "font-semibold text-black" : ""
                    }`}
                  >
                    Gallery
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
