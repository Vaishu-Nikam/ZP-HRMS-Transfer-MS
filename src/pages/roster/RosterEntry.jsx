// src/pages/roster/RosterEntry.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { UserCheck, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ROSTER_100 = Array.from({ length: 100 }, (_, i) => i + 1);

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

const inputCls = `w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 transition-all`;

const RosterEntry = () => {
  const [employees,    setEmployees]    = useState([]);
  const [rosterData,   setRosterData]   = useState({});
  const [departments,  setDepartments]  = useState([]);

  const [selectedPoint,    setSelectedPoint]    = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [joiningDate,      setJoiningDate]      = useState('');
  const [filterDept,       setFilterDept]       = useState('');

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
    setDepartments(JSON.parse(localStorage.getItem('departments')) || []);
  }, []);

  const pointCategory = selectedPoint ? POINT_CATEGORY[Number(selectedPoint)] : '';

  const eligibleEmployees = useMemo(() => {
    let list = employees;
    if (filterDept) list = list.filter(e => e.department_id === filterDept);
    if (pointCategory && pointCategory !== 'Open') {
      list = list.filter(e => {
        const cat = e.category || '';
        return cat === pointCategory || cat.startsWith(pointCategory);
      });
    }
    return list;
  }, [employees, pointCategory, filterDept]);

  const vacantPoints = ROSTER_100.filter(p => !rosterData[p]?.employee_id);

  const handleSave = () => {
    if (!selectedPoint)    { toast.error('गुण क्रमांक निवडा'); return; }
    if (!selectedEmployee) { toast.error('कर्मचारी निवडा'); return; }
    if (!joiningDate)      { toast.error('रुजू दिनांक टाका'); return; }

    const emp = employees.find(e => String(e.employee_id) === String(selectedEmployee));
    if (!emp) return;

    const updated = {
      ...rosterData,
      [selectedPoint]: {
        employee_id:   emp.employee_id,
        employee_code: emp.employee_code,
        employee_name: `${emp.first_name || ''} ${emp.middle_name || ''} ${emp.last_name || ''}`.trim(),
        joining_date:  joiningDate,
        category:      emp.category,
        assigned_at:   new Date().toISOString(),
      },
    };

    localStorage.setItem('roster_data', JSON.stringify(updated));
    setRosterData(updated);
    toast.success(`गुण ${selectedPoint} वर ${emp.first_name} ${emp.last_name} यांची नोंद झाली! ✅`);
    setSelectedPoint('');
    setSelectedEmployee('');
    setJoiningDate('');
  };

  const handleRemove = (point) => {
    const updated = { ...rosterData };
    delete updated[point];
    localStorage.setItem('roster_data', JSON.stringify(updated));
    setRosterData(updated);
    toast.success(`गुण ${point} रिक्त केला`);
  };

  const filledEntries = Object.entries(rosterData).sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="space-y-6">

      {/* ── Entry Form ── */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">नवीन रोस्टर नोंद</h3>
            <p className="text-xs text-gray-500">खाली माहिती भरून Save करा</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Point */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              गुण क्रमांक <span className="text-red-500">*</span>
            </label>
            <select
              className={inputCls}
              value={selectedPoint}
              onChange={e => { setSelectedPoint(e.target.value); setSelectedEmployee(''); }}
            >
              <option value="">निवडा...</option>
              {vacantPoints.map(p => (
                <option key={p} value={p}>{p} — {POINT_CATEGORY[p]}</option>
              ))}
            </select>
            {pointCategory && (
              <p className="text-[11px] text-blue-600 mt-1.5 font-medium">
                प्रवर्ग: <span className="font-bold">{pointCategory}</span>
              </p>
            )}
          </div>

          {/* Dept filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">विभाग फिल्टर</label>
            <select className={inputCls} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
              <option value="">सर्व विभाग</option>
              {departments.map(d => (
                <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              कर्मचारी <span className="text-red-500">*</span>
            </label>
            <select
              className={`${inputCls} ${!selectedPoint ? 'opacity-50 cursor-not-allowed' : ''}`}
              value={selectedEmployee}
              onChange={e => setSelectedEmployee(e.target.value)}
              disabled={!selectedPoint}
            >
              <option value="">कर्मचारी निवडा...</option>
              {eligibleEmployees.map(e => (
                <option key={e.employee_id} value={e.employee_id}>
                  {e.employee_code} — {e.first_name} {e.last_name} ({e.category || 'Open'})
                </option>
              ))}
            </select>
            {selectedPoint && eligibleEmployees.length === 0 && (
              <p className="text-[11px] text-red-500 mt-1.5">या प्रवर्गात कोणतेही कर्मचारी नाहीत</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              रुजू दिनांक <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={inputCls}
              value={joiningDate}
              onChange={e => setJoiningDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            रोस्टर नोंद Save करा
          </button>
        </div>
      </div>

      {/* ── Filled entries table ── */}
      {filledEntries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">
              भरलेल्या नोंदी
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                {filledEntries.length}
              </span>
            </h3>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  {['गुण क्र.','प्रवर्ग','कर्मचारी नाव','कोड','रुजू दिनांक','काढा'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium tracking-wide last:text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filledEntries.map(([point, entry], idx) => (
                  <tr
                    key={point}
                    className={`border-b border-gray-50 hover:bg-red-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                  >
                    <td className="px-4 py-2.5 font-bold text-gray-800">{point}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_BADGE[POINT_CATEGORY[Number(point)]]}`}>
                        {POINT_CATEGORY[Number(point)]}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">{entry.employee_name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{entry.employee_code}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-400">
                      {entry.joining_date
                        ? new Date(entry.joining_date).toLocaleDateString('mr-IN')
                        : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => handleRemove(point)}
                        className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-100 hover:border-red-300 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                        काढा
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filledEntries.length === 0 && (
        <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-xl">
          <UserCheck className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">अजून कोणतीही नोंद नाही</p>
          <p className="text-gray-300 text-xs mt-1">वर गुण निवडून नोंद करा</p>
        </div>
      )}
    </div>
  );
};

export default RosterEntry;