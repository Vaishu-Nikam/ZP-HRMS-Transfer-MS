import React from 'react';
import {
    Menu, Bell, User, LogOut, Lock,
    Search, ChevronDown, ChevronRight, Home, Settings
} from 'lucide-react';
import { useHeader } from './useHeader';

export const Header = ({ onMenuClick }) => {

    const {
        user,
        isProfileOpen,
        setIsProfileOpen,
        dropdownRef,
        handleLogout,
        getBreadcrumb,
        userInitial,
        navigate
    } = useHeader();

    return (
        <header className="sticky top-0 z-30 h-[68px] w-full bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-7">

            {/* LEFT */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-1">
                    <Home size={15} className="text-gray-400" />
                    <ChevronRight size={13} className="text-gray-300" />
                    <span className="text-xs text-gray-400">Pages</span>
                    <ChevronRight size={13} className="text-gray-300" />
                    <span className="text-sm font-semibold text-blue-700">
                        {getBreadcrumb() || 'Dashboard'}
                    </span>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

                {/* Search */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100">
                    <Search size={15} className="text-gray-400" />
                    <input
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm w-40 text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Bell */}
                <div className="relative">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition">
                        <Bell size={18} />
                    </button>
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] bg-red-500 text-white flex items-center justify-center rounded-full border-2 border-white">
                        3
                    </span>
                </div>

                {/* Divider */}
                <div className="w-px h-7 bg-gray-200" />

                {/* Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg transition border ${
                            isProfileOpen ? 'bg-gray-50 border-gray-200' : 'border-transparent'
                        }`}
                    >
                        <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold border-2 border-blue-200">
                            {userInitial}
                        </div>

                        <div className="text-left">
                            <div className="text-sm font-semibold text-gray-800 leading-tight">
                                {user?.full_name || 'Admin Officer'}
                            </div>
                            <div className="text-xs text-gray-400">
                                {user?.role_name || 'Super Admin'}
                            </div>
                        </div>

                        <ChevronDown
                            size={14}
                            className={`text-gray-400 transition ${isProfileOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-1">

                            {/* User Info */}
                            <div className="px-3 py-2 border-b text-sm">
                                <div className="font-semibold text-gray-800">
                                    {user?.full_name || 'Admin Officer'}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {user?.email || 'admin@maharashtra.gov.in'}
                                </div>
                                <div className="mt-1 inline-block text-[11px] px-2 py-[2px] rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                                    {user?.role_name || 'Super Admin'}
                                </div>
                            </div>

                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 rounded">
                                <User size={15} /> Profile
                            </button>

                            <button
                                onClick={() => navigate('/change-password')}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 rounded"
                            >
                                <Lock size={15} /> Change Password
                            </button>

                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 rounded">
                                <Settings size={15} /> Preferences
                            </button>

                            <div className="border-t my-1" />

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                            >
                                <LogOut size={15} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};