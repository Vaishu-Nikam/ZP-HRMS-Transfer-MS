// src/pages/roster/RosterPage.jsx
import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import RosterPoints from './RosterPoints';
import RosterEntry from './RosterEntry';
import { ClipboardList, UserCheck } from 'lucide-react';

const TABS = [
  { id: 'points', label: 'रोस्टर तक्ता', icon: ClipboardList },
  { id: 'entry',  label: 'रोस्टर नोंद',  icon: UserCheck },
];

const RosterPage = () => {
  const [activeTab, setActiveTab] = useState('points');

  return (
    <div className="space-y-6">
     

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all border-b-2
                ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'points' && <RosterPoints />}
          {activeTab === 'entry'  && <RosterEntry />}
        </div>
      </div>
    </div>
  );
};

export default RosterPage;