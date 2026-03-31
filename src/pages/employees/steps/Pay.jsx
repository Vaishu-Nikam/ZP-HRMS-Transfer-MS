// src/pages/employees/steps/Pay.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { IndianRupee, Plus, Trash2 } from 'lucide-react';

const PAY_COMMISSIONS = ['5 वा वेतन आयोग', '6 वा वेतन आयोग', '7 वा वेतन आयोग'];

const emptyRow = () => ({
  id: Date.now(), pay_commission: '', band_pay: '',
  grade_pay: '', basic_pay: '', effective_date: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Pay = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.pay_details?.length ? defaultValues.pay_details : [emptyRow()]
  );

  const addRow    = () => setRows(p => [...p, emptyRow()]);
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));
  const setRow    = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">वेतन आयोग माहिती</h3>
          </div>
          <Button size="sm" onClick={addRow}><Plus className="w-4 h-4 mr-1" /> नवीन</Button>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">वेतन #{idx + 1}</span>
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">वेतन आयोग</label>
                  <select className={inputCls} value={row.pay_commission} onChange={e => setRow(row.id, 'pay_commission', e.target.value)}>
                    <option value="">निवडा</option>
                    {PAY_COMMISSIONS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">बँण्ड वेतन / स्तर</label>
                  <input className={inputCls} placeholder="Band Pay / Level"
                    value={row.band_pay} onChange={e => setRow(row.id, 'band_pay', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ग्रेड पे / मॅट्रिक्स</label>
                  <input className={inputCls} placeholder="Grade Pay"
                    value={row.grade_pay} onChange={e => setRow(row.id, 'grade_pay', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">मूळ वेतन</label>
                  <input className={inputCls} placeholder="Basic Pay"
                    value={row.basic_pay} onChange={e => setRow(row.id, 'basic_pay', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">लागू दिनांक</label>
                  <input type="date" className={inputCls}
                    value={row.effective_date} onChange={e => setRow(row.id, 'effective_date', e.target.value)} />
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
        <Button onClick={() => onNext({ pay_details: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Pay;