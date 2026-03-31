// src/pages/roster/RosterEntry.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { UserCheck, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ROSTER_CATEGORIES = ['Open', 'SC', 'ST', 'OBC', 'NT-A', 'NT-B', 'NT-C', 'NT-D', 'SBC'];

// 100-point pattern मधून category नुसार available points
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

const RosterEntry = () => {
  const [employees,   setEmployees]   = useState([]);
  const [rosterData,  setRosterData]  = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations,setDesignations]= useState([]);

  // Form state
  const [selectedPoint,    setSelectedPoint]    = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [joiningDate,      setJoiningDate]      = useState('');
  const [filterDept,       setFilterDept]       = useState('');

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
    setRosterData(JSON.parse(localStorage.getItem('roster_data')) || {});
    setDepartments(JSON.parse(localStorage.getItem('departments')) || []);
    setDesignations(JSON.parse(localStorage.getItem('designations')) || []);
  }, []);

  // Point नुसार category
  const pointCategory = selectedPoint ? POINT_CATEGORY[Number(selectedPoint)] : '';

  // Category नुसार eligible employees filter
  const eligibleEmployees = useMemo(() => {
    let list = employees;
    if (filterDept) list = list.filter(e => e.department_id === filterDept);
    // Category match
    if (pointCategory && pointCategory !== 'Open') {
      list = list.filter(e => {
        const cat = e.category || '';
        return cat === pointCategory || cat.startsWith(pointCategory);
      });
    }
    return list;
  }, [employees, pointCategory, filterDept]);

  // Vacant points
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

    // Reset
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

  const inputCls = `w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

  return (
    <div className="space-y-6">

      {/* Entry Form */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">नवीन रोस्टर नोंद</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Point Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              गुण क्रमांक <span className="text-red-500">*</span>
            </label>
            <select className={inputCls} value={selectedPoint}
              onChange={e => { setSelectedPoint(e.target.value); setSelectedEmployee(''); }}>
              <option value="">निवडा</option>
              {vacantPoints.map(p => (
                <option key={p} value={p}>
                  {p} - {POINT_CATEGORY[p]}
                </option>
              ))}
            </select>
            {pointCategory && (
              <p className="text-xs text-blue-600 mt-1">
                या गुणासाठी प्रवर्ग: <strong>{pointCategory}</strong>
              </p>
            )}
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">विभाग फिल्टर</label>
            <select className={inputCls} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
              <option value="">सर्व विभाग</option>
              {departments.map(d => (
                <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
              ))}
            </select>
          </div>

          {/* Employee Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              कर्मचारी <span className="text-red-500">*</span>
            </label>
            <select className={inputCls} value={selectedEmployee}
              onChange={e => setSelectedEmployee(e.target.value)}
              disabled={!selectedPoint}>
              <option value="">कर्मचारी निवडा</option>
              {eligibleEmployees.map(e => (
                <option key={e.employee_id} value={e.employee_id}>
                  {e.employee_code} - {e.first_name} {e.last_name} ({e.category || 'Open'})
                </option>
              ))}
            </select>
            {selectedPoint && eligibleEmployees.length === 0 && (
              <p className="text-xs text-red-500 mt-1">या प्रवर्गात कोणतेही कर्मचारी नाहीत</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              रुजू दिनांक <span className="text-red-500">*</span>
            </label>
            <input type="date" className={inputCls} value={joiningDate}
              onChange={e => setJoiningDate(e.target.value)} />
          </div>

        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
          >
            <Save className="w-4 h-4" />
            रोस्टर नोंद Save करा
          </button>
        </div>
      </div>

      {/* Filled Roster Entries */}
      {Object.keys(rosterData).length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            भरलेल्या नोंदी ({Object.keys(rosterData).length})
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-4 py-3 text-left font-medium">गुण क्र.</th>
                  <th className="px-4 py-3 text-left font-medium">प्रवर्ग</th>
                  <th className="px-4 py-3 text-left font-medium">कर्मचारी नाव</th>
                  <th className="px-4 py-3 text-left font-medium">कोड</th>
                  <th className="px-4 py-3 text-left font-medium">रुजू दिनांक</th>
                  <th className="px-4 py-3 text-center font-medium">काढा</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rosterData)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([point, entry], idx) => (
                    <tr key={point}
                      className={`border-b border-gray-100 hover:bg-red-50 transition-colors
                        ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                      <td className="px-4 py-2.5 font-bold text-gray-700">{point}</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                          {POINT_CATEGORY[Number(point)]}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-800">{entry.employee_name}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{entry.employee_code}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">
                        {entry.joining_date
                          ? new Date(entry.joining_date).toLocaleDateString('mr-IN')
                          : '-'}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <button
                          onClick={() => handleRemove(point)}
                          className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-2 py-1 rounded hover:bg-red-50 transition-all"
                        >
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
    </div>
  );
};

export default RosterEntry;