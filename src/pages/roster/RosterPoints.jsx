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
  Open:   'bg-blue-50 text-blue-700 border-blue-200',
  SC:     'bg-purple-50 text-purple-700 border-purple-200',
  ST:     'bg-green-50 text-green-700 border-green-200',
  OBC:    'bg-orange-50 text-orange-700 border-orange-200',
  'NT-A': 'bg-pink-50 text-pink-700 border-pink-200',
  'NT-B': 'bg-rose-50 text-rose-700 border-rose-200',
  'NT-C': 'bg-red-50 text-red-700 border-red-200',
  'NT-D': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  SBC:    'bg-teal-50 text-teal-700 border-teal-200',
};

const FILTER_TABS = ['', 'Open', 'SC', 'ST', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SBC'];

const STAT_CONFIG = [
  { key: 'filled',  label: 'भरलेले',  color: 'text-green-600' },
  { key: 'vacant',  label: 'रिक्त',   color: 'text-red-500'   },
  { key: 'Open',    label: 'Open',    color: 'text-blue-600'  },
  { key: 'SC',      label: 'SC',      color: 'text-purple-600'},
  { key: 'ST',      label: 'ST',      color: 'text-green-600' },
  { key: 'OBC',     label: 'OBC',     color: 'text-orange-600'},
  { key: 'NT-A',    label: 'NT-A',    color: 'text-pink-600'  },
  { key: 'NT-B',    label: 'NT-B',    color: 'text-rose-600'  },
  { key: 'NT-C',    label: 'NT-C',    color: 'text-red-600'   },
  { key: 'NT-D',    label: 'NT-D',    color: 'text-yellow-600'},
  { key: 'SBC',     label: 'SBC',     color: 'text-teal-600'  },
];

const RosterPoints = () => {
  const [rosterData, setRosterData] = useState({});
  const [filterCat,  setFilterCat]  = useState('');

  useEffect(() => {
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
  }, []);

  const filteredRoster = useMemo(() =>
    ROSTER_100.filter(r => !filterCat || r.category === filterCat),
    [filterCat]
  );

  const stats = useMemo(() => {
    const counts = {};
    ROSTER_100.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
    return counts;
  }, []);

  const filledCount = Object.keys(rosterData).filter(
    k => rosterData[k]?.employee_id
  ).length;

  const getStatValue = (key) => {
    if (key === 'filled') return filledCount;
    if (key === 'vacant') return 100 - filledCount;
    return stats[key] || 0;
  };

  const getCatCount = (cat) => cat === '' ? 100 : (stats[cat] || 0);

  return (
    <div className="space-y-4">

      {/* ── Stat Boxes ── */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
        {STAT_CONFIG.map(s => (
          <div key={s.key}
            className="text-center py-2.5 px-1 bg-white border border-gray-200 rounded-lg">
            <p className={`text-lg font-bold ${s.color}`}>{getStatValue(s.key)}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">भरण्याची स्थिती</span>
          <span className="text-xs font-semibold text-blue-600">{filledCount}/100</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${filledCount}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
        </div>
      </div>

      {/* ── Button Group Filter + Print ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">

        {/* Button Group */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
          {FILTER_TABS.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap transition-all
                ${idx !== FILTER_TABS.length - 1 ? 'border-r border-gray-200' : ''}
                ${filterCat === cat
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {cat || 'सर्व'}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                ${filterCat === cat
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-500'}`}>
                {getCatCount(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-4 py-3 text-left text-xs font-medium w-20">गुण क्र.</th>
              <th className="px-4 py-3 text-left text-xs font-medium w-28">प्रवर्ग</th>
              <th className="px-4 py-3 text-left text-xs font-medium">कर्मचारी नाव</th>
              <th className="px-4 py-3 text-left text-xs font-medium w-32">कोड</th>
              <th className="px-4 py-3 text-left text-xs font-medium w-32">रुजू दिनांक</th>
              <th className="px-4 py-3 text-center text-xs font-medium w-24">स्थिती</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoster.map((row, idx) => {
              const entry    = rosterData[row.point] || {};
              const isFilled = !!entry.employee_id;
              const badge    = CAT_BADGE[row.category] || CAT_BADGE['Open'];

              return (
                <tr key={row.point}
                  className={`border-b border-gray-100 hover:bg-blue-50 transition-colors
                    ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>

                  <td className="px-4 py-2.5">
                    <span className="text-sm font-semibold text-gray-700">{row.point}</span>
                  </td>

                  <td className="px-4 py-2.5">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badge}`}>
                      {row.category}
                    </span>
                  </td>

                  <td className="px-4 py-2.5">
                    {isFilled
                      ? <span className="text-sm text-gray-800">{entry.employee_name}</span>
                      : <span className="text-xs text-gray-300 italic">रिक्त</span>}
                  </td>

                  <td className="px-4 py-2.5">
                    {isFilled
                      ? <span className="font-mono text-xs text-gray-500">{entry.employee_code}</span>
                      : <span className="text-gray-300 text-xs">-</span>}
                  </td>

                  <td className="px-4 py-2.5 text-xs text-gray-500">
                    {isFilled && entry.joining_date
                      ? new Date(entry.joining_date).toLocaleDateString('mr-IN')
                      : <span className="text-gray-300">-</span>}
                  </td>

                  <td className="px-4 py-2.5 text-center">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border
                      ${isFilled
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-600 border-red-200'}`}>
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