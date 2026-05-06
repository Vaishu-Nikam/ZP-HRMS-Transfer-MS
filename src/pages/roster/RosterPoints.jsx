// src/pages/roster/RosterPoints.jsx
import React, { useEffect, useMemo, useState } from 'react';

const ROSTER_100 = [
  {point:1,category:'Open'},{point:2,category:'Open'},{point:3,category:'SC'},
  {point:4,category:'Open'},{point:5,category:'Open'},{point:6,category:'ST'},
  {point:7,category:'Open'},{point:8,category:'OBC'},{point:9,category:'Open'},
  {point:10,category:'Open'},{point:11,category:'SC'},{point:12,category:'Open'},
  {point:13,category:'Open'},{point:14,category:'NT-B'},{point:15,category:'Open'},
  {point:16,category:'SC'},{point:17,category:'Open'},{point:18,category:'Open'},
  {point:19,category:'ST'},{point:20,category:'Open'},{point:21,category:'OBC'},
  {point:22,category:'Open'},{point:23,category:'SC'},{point:24,category:'Open'},
  {point:25,category:'Open'},{point:26,category:'NT-C'},{point:27,category:'Open'},
  {point:28,category:'SC'},{point:29,category:'Open'},{point:30,category:'Open'},
  {point:31,category:'ST'},{point:32,category:'Open'},{point:33,category:'OBC'},
  {point:34,category:'Open'},{point:35,category:'SC'},{point:36,category:'Open'},
  {point:37,category:'Open'},{point:38,category:'NT-D'},{point:39,category:'Open'},
  {point:40,category:'SC'},{point:41,category:'Open'},{point:42,category:'Open'},
  {point:43,category:'ST'},{point:44,category:'Open'},{point:45,category:'OBC'},
  {point:46,category:'Open'},{point:47,category:'SC'},{point:48,category:'Open'},
  {point:49,category:'Open'},{point:50,category:'NT-A'},{point:51,category:'Open'},
  {point:52,category:'SC'},{point:53,category:'Open'},{point:54,category:'Open'},
  {point:55,category:'ST'},{point:56,category:'Open'},{point:57,category:'OBC'},
  {point:58,category:'Open'},{point:59,category:'SC'},{point:60,category:'Open'},
  {point:61,category:'Open'},{point:62,category:'SBC'},{point:63,category:'Open'},
  {point:64,category:'SC'},{point:65,category:'Open'},{point:66,category:'Open'},
  {point:67,category:'ST'},{point:68,category:'Open'},{point:69,category:'OBC'},
  {point:70,category:'Open'},{point:71,category:'SC'},{point:72,category:'Open'},
  {point:73,category:'Open'},{point:74,category:'NT-B'},{point:75,category:'Open'},
  {point:76,category:'SC'},{point:77,category:'Open'},{point:78,category:'Open'},
  {point:79,category:'ST'},{point:80,category:'Open'},{point:81,category:'OBC'},
  {point:82,category:'Open'},{point:83,category:'SC'},{point:84,category:'Open'},
  {point:85,category:'Open'},{point:86,category:'NT-C'},{point:87,category:'Open'},
  {point:88,category:'SC'},{point:89,category:'Open'},{point:90,category:'Open'},
  {point:91,category:'ST'},{point:92,category:'Open'},{point:93,category:'OBC'},
  {point:94,category:'Open'},{point:95,category:'SC'},{point:96,category:'Open'},
  {point:97,category:'Open'},{point:98,category:'NT-D'},{point:99,category:'Open'},
  {point:100,category:'SC'},
];

const CAT_BADGE = {
  Open:  'bg-blue-100 text-blue-800',
  SC:    'bg-purple-100 text-purple-800',
  ST:    'bg-green-100 text-green-800',
  OBC:   'bg-amber-100 text-amber-800',
  'NT-A':'bg-pink-100 text-pink-800',
  'NT-B':'bg-rose-100 text-rose-800',
  'NT-C':'bg-red-100 text-red-800',
  'NT-D':'bg-yellow-100 text-yellow-800',
  SBC:   'bg-teal-100 text-teal-800',
};

const FILTER_TABS = ['', 'Open', 'SC', 'ST', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SBC'];

const STAT_CONFIG = [
  { key:'filled', lbl:'भरलेले', accent:'border-l-green-500',  num:'text-green-600' },
  { key:'vacant', lbl:'रिक्त',  accent:'border-l-red-500',    num:'text-red-600' },
  { key:'Open',   lbl:'Open',   accent:'border-l-blue-500',   num:'text-blue-600' },
  { key:'SC',     lbl:'SC',     accent:'border-l-purple-500', num:'text-purple-600' },
  { key:'ST',     lbl:'ST',     accent:'border-l-green-400',  num:'text-green-500' },
  { key:'OBC',    lbl:'OBC',    accent:'border-l-amber-500',  num:'text-amber-600' },
];

const RosterPoints = () => {
  const [rosterData, setRosterData] = useState({});
  const [filterCat,  setFilterCat]  = useState('');

  useEffect(() => {
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
  }, []);

  const filteredRoster = useMemo(
    () => ROSTER_100.filter(r => !filterCat || r.category === filterCat),
    [filterCat]
  );

  const catStats = useMemo(() => {
    const c = {};
    ROSTER_100.forEach(r => { c[r.category] = (c[r.category] || 0) + 1; });
    return c;
  }, []);

  const filledCount = Object.keys(rosterData).filter(k => rosterData[k]?.employee_id).length;

  const getVal = key => {
    if (key === 'filled') return filledCount;
    if (key === 'vacant') return 100 - filledCount;
    return catStats[key] || 0;
  };

  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAT_CONFIG.map(s => (
          <div key={s.key} className={`bg-white border border-gray-100 border-l-4 ${s.accent} rounded-xl p-4 shadow-sm`}>
            <p className={`text-2xl font-bold ${s.num}`}>{getVal(s.key)}</p>
            <p className="text-xs text-gray-500 mt-1">{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 font-medium">भरण्याची स्थिती</span>
          <span className="font-semibold text-blue-600">{filledCount} / 100</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${filledCount}%` }}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filterCat === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat || 'सर्व'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900 text-white">
              {['गुण क्र.','प्रवर्ग','कर्मचारी','कोड','दिनांक','स्थिती'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRoster.map((row, idx) => {
              const entry   = rosterData[row.point] || {};
              const isFilled = !!entry.employee_id;
              return (
                <tr key={row.point} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-2.5 font-bold text-gray-800">{row.point}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_BADGE[row.category]}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">
                    {isFilled ? entry.employee_name : <span className="text-gray-300 italic text-xs">रिक्त</span>}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{entry.employee_code || '—'}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-400">{entry.joining_date || '—'}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isFilled ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
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