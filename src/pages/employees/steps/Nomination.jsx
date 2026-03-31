// src/pages/employees/steps/Nomination.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { FileCheck, Plus, Trash2 } from 'lucide-react';

const NOMINATION_TYPES = ['GPF', 'DCRG', 'Group Insurance', 'NPS'];
const RELATIONS        = ['पत्नी', 'पती', 'मुलगा', 'मुलगी', 'वडील', 'आई', 'इतर'];

const emptyRow = () => ({
  id: Date.now(), nomination_type: '', nominee_name: '',
  relation: '', nominee_age: '', share_percent: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Nomination = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.nominations?.length ? defaultValues.nominations : [emptyRow()]
  );

  const addRow    = () => setRows(p => [...p, emptyRow()]);
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));
  const setRow    = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  const totalShare = rows.reduce((sum, r) => sum + (Number(r.share_percent) || 0), 0);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">नामनिर्देशन माहिती</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${totalShare === 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              एकूण: {totalShare}%
            </span>
            <Button size="sm" onClick={addRow}><Plus className="w-4 h-4 mr-1" /> नवीन</Button>
          </div>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">नामनिर्देशन #{idx + 1}</span>
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">नामनिर्देशन प्रकार</label>
                  <select className={inputCls} value={row.nomination_type} onChange={e => setRow(row.id, 'nomination_type', e.target.value)}>
                    <option value="">निवडा</option>
                    {NOMINATION_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">नामनिर्देशित व्यक्तीचे नाव</label>
                  <input className={inputCls} placeholder="नाव"
                    value={row.nominee_name} onChange={e => setRow(row.id, 'nominee_name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">नाते</label>
                  <select className={inputCls} value={row.relation} onChange={e => setRow(row.id, 'relation', e.target.value)}>
                    <option value="">निवडा</option>
                    {RELATIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">वय</label>
                  <input className={inputCls} placeholder="वय" maxLength={3}
                    value={row.nominee_age} onChange={e => setRow(row.id, 'nominee_age', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">रकमेचा भाग (%)</label>
                  <input className={inputCls} placeholder="उदा. 50" maxLength={3}
                    value={row.share_percent} onChange={e => setRow(row.id, 'share_percent', e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalShare !== 100 && rows.some(r => r.share_percent) && (
          <p className="text-orange-600 text-sm mt-2">⚠️ एकूण टक्केवारी 100% असणे आवश्यक आहे (सध्या: {totalShare}%)</p>
        )}
      </Card>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>रद्द करा</Button>
          <Button variant="outline" onClick={onBack}>← मागे</Button>
        </div>
        <Button onClick={() => onNext({ nominations: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Nomination;