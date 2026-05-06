// src/pages/roster/RosterDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

const POINT_CATEGORY = {
  1:'Open',2:'Open',3:'SC',4:'Open',5:'Open',6:'ST',7:'Open',8:'OBC',9:'Open',10:'Open',
  11:'SC',12:'Open',13:'Open',14:'NT-B',15:'Open',16:'SC',17:'Open',18:'Open',19:'ST',20:'Open',
  21:'OBC',22:'Open',23:'SC',24:'Open',25:'Open',26:'NT-C',27:'Open',28:'SC',29:'Open',30:'Open',
  31:'ST',32:'Open',33:'OBC',34:'Open',35:'SC',36:'Open',37:'Open',38:'NT-D',39:'Open',40:'SC',
  41:'Open',42:'Open',43:'ST',44:'Open',45:'OBC',46:'Open',47:'SC',48:'Open',49:'Open',50:'NT-A',
  51:'Open',52:'SC',53:'Open',54:'Open',55:'ST',56:'Open',57:'OBC',58:'Open',59:'SC',60:'Open',
  61:'Open',62:'SBC',63:'Open',64:'SC',65:'Open',66:'Open',67:'ST',68:'Open',69:'OBC',70:'Open',
  71:'SC',72:'Open',73:'Open',74:'NT-B',75:'Open',76:'SC',77:'Open',78:'Open',79:'ST',80:'Open',
  81:'OBC',82:'Open',83:'SC',84:'Open',85:'Open',86:'NT-C',87:'Open',88:'SC',89:'Open',90:'Open',
  91:'ST',92:'Open',93:'OBC',94:'Open',95:'SC',96:'Open',97:'Open',98:'NT-D',99:'Open',100:'SC',
};

const CATS = ['Open','SC','ST','OBC','NT-A','NT-B','NT-C','NT-D','SBC'];

const CELL_CONFIG = {
  Open:  { cls:'bg-blue-50 text-blue-700 border-blue-200',     badge:'bg-blue-100 text-blue-800' },
  SC:    { cls:'bg-purple-50 text-purple-700 border-purple-200', badge:'bg-purple-100 text-purple-800' },
  ST:    { cls:'bg-green-50 text-green-700 border-green-200',   badge:'bg-green-100 text-green-800' },
  OBC:   { cls:'bg-amber-50 text-amber-700 border-amber-200',   badge:'bg-amber-100 text-amber-800' },
  'NT-A':{ cls:'bg-pink-50 text-pink-700 border-pink-200',      badge:'bg-pink-100 text-pink-800' },
  'NT-B':{ cls:'bg-rose-50 text-rose-700 border-rose-200',      badge:'bg-rose-100 text-rose-800' },
  'NT-C':{ cls:'bg-red-50 text-red-700 border-red-200',         badge:'bg-red-100 text-red-800' },
  'NT-D':{ cls:'bg-yellow-50 text-yellow-700 border-yellow-200',badge:'bg-yellow-100 text-yellow-800' },
  SBC:   { cls:'bg-teal-50 text-teal-700 border-teal-200',      badge:'bg-teal-100 text-teal-800' },
};

const CHART_COLORS = ['#2563eb','#7c3aed','#16a34a','#d97706','#db2777','#e11d48','#dc2626','#ca8a04','#0d9488'];
const FILTER_TABS  = ['सर्व', ...CATS];

// ─── tiny inline bar-chart (no external dep) ───────────────────────────────
const InlineBar = ({ data, labels, colors }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1.5 h-32 w-full">
      {data.map((val, i) => (
        <div key={labels[i]} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[9px] text-gray-500 font-medium">{val}</span>
          <div
            className="w-full rounded-t transition-all"
            style={{ height: `${(val / max) * 88}px`, background: colors[i] }}
          />
          <span className="text-[8px] text-gray-400 rotate-45 origin-left mt-1 whitespace-nowrap">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
};

const RosterDashboard = () => {
  const [rosterData, setRosterData] = useState({});
  const [filterCat,  setFilterCat]  = useState('');

  useEffect(() => {
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
  }, []);

  const filledCount = useMemo(
    () => Object.values(rosterData).filter(v => v?.employee_id).length,
    [rosterData]
  );

  const catCounts = useMemo(() => {
    const c = {};
    CATS.forEach(cat => (c[cat] = 0));
    for (let i = 1; i <= 100; i++) c[POINT_CATEGORY[i]]++;
    return c;
  }, []);

  const filteredPoints = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 100; i++) {
      if (!filterCat || POINT_CATEGORY[i] === filterCat) list.push(i);
    }
    return list;
  }, [filterCat]);

  const pct = filledCount;

  const STATS = [
    { val:100,              lbl:'एकूण गुण',   sub:'100-point roster', accent:'border-l-blue-500',   num:'text-blue-600',   subbg:'bg-blue-50 text-blue-700' },
    { val:filledCount,      lbl:'भरलेले गुण', sub:`${pct}% पूर्ण`,   accent:'border-l-green-500',  num:'text-green-600',  subbg:'bg-green-50 text-green-700' },
    { val:100-filledCount,  lbl:'रिक्त गुण',  sub:'नोंद आवश्यक',    accent:'border-l-red-500',    num:'text-red-600',    subbg:'bg-red-50 text-red-700' },
    { val:9,                lbl:'प्रवर्ग',    sub:'Open ते SBC',      accent:'border-l-purple-500', num:'text-purple-600', subbg:'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((s, i) => (
          <div key={i} className={`bg-white border border-gray-100 border-l-4 ${s.accent} rounded-xl p-4 shadow-sm`}>
            <p className={`text-3xl font-bold ${s.num}`}>{s.val}</p>
            <p className="text-xs text-gray-500 mt-1 mb-2">{s.lbl}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.subbg}`}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 font-medium">भरण्याची एकूण प्रगती</span>
          <span className="font-semibold text-blue-600">{filledCount} / 100 गुण भरलेले</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-4 mt-2.5">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-sm bg-blue-600 inline-block" />भरलेले {pct}%
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-sm bg-gray-200 inline-block" />रिक्त {100 - pct}%
          </span>
        </div>
      </div>

      {/* Grid + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 100-point visual grid */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">100-point roster तक्ता</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-2 h-2 rounded-sm bg-blue-600 inline-block" />भरलेले
            </span>
            {CATS.map(c => (
              <span key={c} className="flex items-center gap-1 text-[10px] text-gray-400">
                <span className={`w-2 h-2 rounded-sm inline-block ${CELL_CONFIG[c].cls.split(' ')[0]}`} />{c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-10 gap-0.5">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(pt => {
              const cat    = POINT_CATEGORY[pt];
              const filled = !!(rosterData[pt]?.employee_id);
              const cls    = filled
                ? 'bg-blue-600 text-white border-blue-700'
                : (CELL_CONFIG[cat]?.cls || 'bg-gray-50 text-gray-500 border-gray-200');
              return (
                <div
                  key={pt}
                  title={`गुण ${pt}: ${cat}${filled ? ' — ' + rosterData[pt]?.employee_name : ' (रिक्त)'}`}
                  className={`aspect-square flex items-center justify-center text-[9px] font-semibold rounded border cursor-default hover:scale-125 hover:z-10 hover:shadow-md transition-transform relative ${cls}`}
                >
                  {pt}
                </div>
              );
            })}
          </div>
        </div>

        {/* Category chart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">प्रवर्गनिहाय वितरण</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {CATS.map((c, i) => (
              <span key={c} className="flex items-center gap-1 text-[10px] text-gray-400">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ background: CHART_COLORS[i] }} />
                {c} ({catCounts[c]})
              </span>
            ))}
          </div>
          <InlineBar
            data={CATS.map(c => catCounts[c])}
            labels={CATS}
            colors={CHART_COLORS}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setFilterCat(tab === 'सर्व' ? '' : tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
              (tab === 'सर्व' ? !filterCat : filterCat === tab)
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {tab}
            {tab !== 'सर्व' && <span className="ml-1 opacity-60">({catCounts[tab] || 0})</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900 text-white">
              {['गुण क्र.','प्रवर्ग','कर्मचारी नाव','कोड','रुजू दिनांक','स्थिती'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPoints.map((pt, idx) => {
              const cat   = POINT_CATEGORY[pt];
              const entry = rosterData[pt] || {};
              const filled = !!entry.employee_id;
              const cc    = CELL_CONFIG[cat] || CELL_CONFIG.Open;
              return (
                <tr key={pt} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-2.5 font-bold text-gray-800">{pt}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cc.badge}`}>{cat}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">
                    {filled
                      ? entry.employee_name
                      : <span className="text-gray-300 italic text-xs">रिक्त</span>}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{entry.employee_code || '—'}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-400">
                    {entry.joining_date ? new Date(entry.joining_date).toLocaleDateString('mr-IN') : '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${filled ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                      {filled ? 'भरलेले' : 'रिक्त'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredPoints.length === 0 && (
          <div className="text-center py-10 text-gray-300 text-sm">कोणतेही गुण सापडले नाहीत</div>
        )}
      </div>

    </div>
  );
};

export default RosterDashboard;