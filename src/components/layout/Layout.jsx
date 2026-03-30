import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

                {/* Header */}
                <Header onMenuClick={openSidebar} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-10">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};