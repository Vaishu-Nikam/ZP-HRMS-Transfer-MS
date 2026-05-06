// src/pages/roster/RosterPage.jsx
import React, { useState } from 'react';
import RosterDashboard from './RosterDashboard';
import RosterPoints    from './RosterPoints';
import RosterEntry     from './RosterEntry';
import { LayoutDashboard, ClipboardList, UserCheck } from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'डॅशबोर्ड',    icon: LayoutDashboard },
  { id: 'points',    label: 'रोस्टर तक्ता', icon: ClipboardList   },
  { id: 'entry',     label: 'रोस्टर नोंद',  icon: UserCheck       },
];

const RosterPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">रोस्टर व्यवस्थापन</h2>
        <p className="text-xs text-gray-500 mt-0.5">100-point roster नोंदी व स्थिती</p>
      </div>

      {/* Tab container */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        {/* Tab bar */}
        <div className="flex border-b border-gray-100 bg-gray-50/60">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === 'dashboard' && <RosterDashboard />}
          {activeTab === 'points'    && <RosterPoints />}
          {activeTab === 'entry'     && <RosterEntry />}
        </div>
      </div>
    </div>
  );
};

export default RosterPage;