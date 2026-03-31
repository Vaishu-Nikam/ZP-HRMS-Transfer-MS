// src/pages/employees/steps/Family.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Heart, Plus, Trash2 } from 'lucide-react';

const SALUTATION = ['श्री', 'श्रीमती', 'कुमारी'];
const RELATIONS  = ['पत्नी', 'पती', 'मुलगा', 'मुलगी', 'वडील', 'आई', 'भाऊ', 'बहीण', 'इतर'];

const emptyRow = () => ({
  id: Date.now(), salutation: '', first_name: '',
  middle_name: '', last_name: '', dob: '', relation: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Family = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.family?.length ? defaultValues.family : [emptyRow()]
  );

  const addRow    = () => setRows(p => [...p, emptyRow()]);
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));
  const setRow    = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">कौटुंबिक माहिती</h3>
          </div>
          <Button size="sm" onClick={addRow}><Plus className="w-4 h-4 mr-1" /> नवीन</Button>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">सदस्य #{idx + 1}</span>
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">संज्ञा</label>
                  <select className={inputCls} value={row.salutation} onChange={e => setRow(row.id, 'salutation', e.target.value)}>
                    <option value="">निवडा</option>
                    {SALUTATION.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पहिले नाव</label>
                  <input className={inputCls} placeholder="पहिले नाव"
                    value={row.first_name} onChange={e => setRow(row.id, 'first_name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">वडिलांचे/पतीचे नाव</label>
                  <input className={inputCls} placeholder="मधले नाव"
                    value={row.middle_name} onChange={e => setRow(row.id, 'middle_name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">आडनाव</label>
                  <input className={inputCls} placeholder="आडनाव"
                    value={row.last_name} onChange={e => setRow(row.id, 'last_name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">जन्मतारीख</label>
                  <input type="date" className={inputCls} value={row.dob} onChange={e => setRow(row.id, 'dob', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">नाते</label>
                  <select className={inputCls} value={row.relation} onChange={e => setRow(row.id, 'relation', e.target.value)}>
                    <option value="">निवडा</option>
                    {RELATIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>रद्द करा</Button>
          <Button variant="outline" onClick={onBack}>← मागे</Button>
        </div>
        <Button onClick={() => onNext({ family: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Family;