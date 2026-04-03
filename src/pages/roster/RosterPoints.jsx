// src/pages/roster/RosterPoints.jsx
import React, { useEffect, useMemo, useState } from 'react';

const ROSTER_100 = [
  { point: 1, category: 'Open' }, { point: 2, category: 'Open' },
  { point: 3, category: 'SC' }, { point: 4, category: 'Open' },
  { point: 5, category: 'Open' }, { point: 6, category: 'ST' },
  { point: 7, category: 'Open' }, { point: 8, category: 'OBC' },
  { point: 9, category: 'Open' }, { point: 10, category: 'Open' },
  { point: 11, category: 'SC' }, { point: 12, category: 'Open' },
  { point: 13, category: 'Open' }, { point: 14, category: 'NT-B' },
  { point: 15, category: 'Open' }, { point: 16, category: 'SC' },
  { point: 17, category: 'Open' }, { point: 18, category: 'Open' },
  { point: 19, category: 'ST' }, { point: 20, category: 'Open' },
  { point: 21, category: 'OBC' }, { point: 22, category: 'Open' },
  { point: 23, category: 'SC' }, { point: 24, category: 'Open' },
  { point: 25, category: 'Open' }, { point: 26, category: 'NT-C' },
  { point: 27, category: 'Open' }, { point: 28, category: 'SC' },
  { point: 29, category: 'Open' }, { point: 30, category: 'Open' },
  { point: 31, category: 'ST' }, { point: 32, category: 'Open' },
  { point: 33, category: 'OBC' }, { point: 34, category: 'Open' },
  { point: 35, category: 'SC' }, { point: 36, category: 'Open' },
  { point: 37, category: 'Open' }, { point: 38, category: 'NT-D' },
  { point: 39, category: 'Open' }, { point: 40, category: 'SC' },
  { point: 41, category: 'Open' }, { point: 42, category: 'Open' },
  { point: 43, category: 'ST' }, { point: 44, category: 'Open' },
  { point: 45, category: 'OBC' }, { point: 46, category: 'Open' },
  { point: 47, category: 'SC' }, { point: 48, category: 'Open' },
  { point: 49, category: 'Open' }, { point: 50, category: 'NT-A' },
  { point: 51, category: 'Open' }, { point: 52, category: 'SC' },
  { point: 53, category: 'Open' }, { point: 54, category: 'Open' },
  { point: 55, category: 'ST' }, { point: 56, category: 'Open' },
  { point: 57, category: 'OBC' }, { point: 58, category: 'Open' },
  { point: 59, category: 'SC' }, { point: 60, category: 'Open' },
  { point: 61, category: 'Open' }, { point: 62, category: 'SBC' },
  { point: 63, category: 'Open' }, { point: 64, category: 'SC' },
  { point: 65, category: 'Open' }, { point: 66, category: 'Open' },
  { point: 67, category: 'ST' }, { point: 68, category: 'Open' },
  { point: 69, category: 'OBC' }, { point: 70, category: 'Open' },
  { point: 71, category: 'SC' }, { point: 72, category: 'Open' },
  { point: 73, category: 'Open' }, { point: 74, category: 'NT-B' },
  { point: 75, category: 'Open' }, { point: 76, category: 'SC' },
  { point: 77, category: 'Open' }, { point: 78, category: 'Open' },
  { point: 79, category: 'ST' }, { point: 80, category: 'Open' },
  { point: 81, category: 'OBC' }, { point: 82, category: 'Open' },
  { point: 83, category: 'SC' }, { point: 84, category: 'Open' },
  { point: 85, category: 'Open' }, { point: 86, category: 'NT-C' },
  { point: 87, category: 'Open' }, { point: 88, category: 'SC' },
  { point: 89, category: 'Open' }, { point: 90, category: 'Open' },
  { point: 91, category: 'ST' }, { point: 92, category: 'Open' },
  { point: 93, category: 'OBC' }, { point: 94, category: 'Open' },
  { point: 95, category: 'SC' }, { point: 96, category: 'Open' },
  { point: 97, category: 'Open' }, { point: 98, category: 'NT-D' },
  { point: 99, category: 'Open' }, { point: 100, category: 'SC' },
];

const CAT_BADGE = {
  Open: 'bg-blue-100 text-blue-700',
  SC: 'bg-purple-100 text-purple-700',
  ST: 'bg-green-100 text-green-700',
  OBC: 'bg-orange-100 text-orange-700',
  'NT-A': 'bg-pink-100 text-pink-700',
  'NT-B': 'bg-rose-100 text-rose-700',
  'NT-C': 'bg-red-100 text-red-700',
  'NT-D': 'bg-yellow-100 text-yellow-700',
  SBC: 'bg-teal-100 text-teal-700',
};

const FILTER_TABS = ['', 'Open', 'SC', 'ST', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SBC'];

const STAT_CONFIG = [
  { key: 'filled', label: 'भरलेले', color: 'text-green-600' },
  { key: 'vacant', label: 'रिक्त', color: 'text-red-500' },
  { key: 'Open', label: 'Open', color: 'text-blue-600' },
  { key: 'SC', label: 'SC', color: 'text-purple-600' },
  { key: 'ST', label: 'ST', color: 'text-green-600' },
  { key: 'OBC', label: 'OBC', color: 'text-orange-600' },
];

const RosterPoints = () => {
  const [rosterData, setRosterData] = useState({});
  const [filterCat, setFilterCat] = useState('');

  useEffect(() => {
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
  }, []);

  const filteredRoster = useMemo(
    () => ROSTER_100.filter(r => !filterCat || r.category === filterCat),
    [filterCat]
  );

  const stats = useMemo(() => {
    const counts = {};
    ROSTER_100.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filledCount = Object.keys(rosterData).filter(
    k => rosterData[k]?.employee_id
  ).length;

  const getStatValue = key => {
    if (key === 'filled') return filledCount;
    if (key === 'vacant') return 100 - filledCount;
    return stats[key] || 0;
  };

  return (
    <div className="space-y-6">

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {STAT_CONFIG.map(s => (
          <div key={s.key}
            className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
            <p className={`text-2xl font-bold ${s.color}`}>
              {getStatValue(s.key)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">भरण्याची स्थिती</span>
          <span className="text-sm font-semibold text-blue-600">
            {filledCount}/100
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ width: `${filledCount}%` }}
          />
        </div>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition
              ${filterCat === cat
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {cat || 'सर्व'}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs">गुण क्र.</th>
              <th className="px-4 py-3 text-left text-xs">प्रवर्ग</th>
              <th className="px-4 py-3 text-left text-xs">कर्मचारी</th>
              <th className="px-4 py-3 text-left text-xs">कोड</th>
              <th className="px-4 py-3 text-left text-xs">दिनांक</th>
              <th className="px-4 py-3 text-center text-xs">स्थिती</th>
            </tr>
          </thead>

          <tbody>
            {filteredRoster.map(row => {
              const entry = rosterData[row.point] || {};
              const isFilled = !!entry.employee_id;

              return (
                <tr key={row.point} className="hover:bg-blue-50/50 transition">
                  <td className="px-4 py-3 font-semibold">{row.point}</td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${CAT_BADGE[row.category]}`}>
                      {row.category}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {isFilled ? entry.employee_name : 'रिक्त'}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {entry.employee_code || '-'}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {entry.joining_date || '-'}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 text-xs rounded-full
                      ${isFilled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'}`}>
                      {isFilled ? 'भरलेले' : 'रिक्त'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default RosterPoints;