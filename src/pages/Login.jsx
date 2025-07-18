import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image Background */}
      <div
        className="relative hidden lg:block w-3/5 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic2.png')" }}
      >
        <div className="absolute top-8 left-8">
          {/* Assuming Logo.png is the logo shown in the image */}
          <img src="/Logo.png" alt="KRRIVAH Logo" className="h-10" /> {/* Adjust height as needed */}
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-[#4F594D] p-8">
        <div className="w-full max-w-md">
          <h2 className="text-white text-3xl font-normal mb-8 text-center uppercase tracking-wider">
            Login
          </h2>
          <form>
            <div className="mb-6">
              
              <label htmlFor="username" className="text-white px-4 py-3 ">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Krrivah"
                className="w-full px-4 py-3 bg-transparent  focus:outline-none focus:border-b-2 focus:border-white transition-all duration-200"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="text-white px-4 py-3 ">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-4 py-3 bg-transparent border-b border-white text-white placeholder-white focus:outline-none focus:border-b-2 focus:border-white transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-[#4F594D] py-3 text-lg font-semibold rounded hover:bg-gray-200 transition-colors duration-200 uppercase tracking-wider"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;