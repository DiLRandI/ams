import React, { useState } from 'react';
import Sidebar from '../../features/navigation/components/Sidebar';

const MainLayout = ({ children, onLogout, userProfile }) => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    // You could add more functionality here in the future to actually navigate between pages
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeItem={activeNavItem} onNavigate={handleNavigation} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Asset Management Dashboard</h1>
              
              <div className="flex items-center">
                {/* User Profile Display */}
                {userProfile && (
                  <div className="flex items-center mr-4">
                    <img 
                      src={userProfile.profilePicture || '/assets/profile-default.png'} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-300"
                    />
                    <span className="text-gray-700 font-medium">{userProfile.username}</span>
                  </div>
                )}
                
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;