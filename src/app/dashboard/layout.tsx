'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Home, User, Settings, UserCircle, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-white shadow-md p-4 flex flex-col ${
          isCollapsed ? 'w-20 items-center' : 'w-64'
        }`}
      >
        {/* User and Toggle */}
        <div
          className={`w-full mb-6 ${
            isCollapsed
              ? 'flex flex-col items-center'
              : 'flex items-center justify-between'
          }`}
        >
          <div className="flex items-center gap-2">
            <UserCircle size={28} className="text-gray-600" />
            {!isCollapsed && (
              <span className="font-semibold text-gray-700 text-sm truncate">
                
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-gray-600 hover:text-blue-500 focus:outline-none ${
              isCollapsed ? 'mt-2' : ''
            }`}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`space-y-6 ${
            isCollapsed ? 'flex flex-col items-center' : ''
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <User size={20} />
            {!isCollapsed && <span>Profile</span>}
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <Settings size={20} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </nav>
        <div className="mt-auto pt-6">
            <button
            onClick={() => signOut()} 
            className="flex items-center gap-2 font-extrabold shadow-2xl rounded-lg bg-slate-100 mb-6 mt-2.5 border-none w-full px-2 py-2 hover:text-red-800"
            >
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Log out</span>}
            </button>
        </div>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {children}
      </main>


    </div>
  );
}
