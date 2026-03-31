// src/pages/employees/steps/Promotion.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';

const PROMO_TYPES    = ['नियमित पदोन्नती', 'तात्पुरती पदोन्नती', 'कार्यभार'];
const PROMO_CATEGORY = ['SC', 'ST', 'OBC', 'खुला'];

const emptyRow = () => ({
  id: Date.now(), promo_type: '', promo_category: '',
  order_date: '', designation: '', office: '', joining_date: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Promotion = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.promotions?.length ? defaultValues.promotions : [emptyRow()]
  );
  const [designations, setDesignations] = useState([]);
  const [offices, setOffices]           = useState([]);

  useEffect(() => {
    setDesignations(JSON.parse(localStorage.getItem('designations')) || []);
    setOffices(JSON.parse(localStorage.getItem('offices')) || []);
  }, []);

  const addRow    = () => setRows(p => [...p, emptyRow()]);
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));
  const setRow    = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">पदोन्नती माहिती</h3>
          </div>
          <Button size="sm" onClick={addRow}><Plus className="w-4 h-4 mr-1" /> नवीन</Button>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">पदोन्नती #{idx + 1}</span>
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पदोन्नतीचा प्रकार</label>
                  <select className={inputCls} value={row.promo_type} onChange={e => setRow(row.id, 'promo_type', e.target.value)}>
                    <option value="">निवडा</option>
                    {PROMO_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पदोन्नतीचा प्रवर्ग</label>
                  <select className={inputCls} value={row.promo_category} onChange={e => setRow(row.id, 'promo_category', e.target.value)}>
                    <option value="">निवडा</option>
                    {PROMO_CATEGORY.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">आदेशाचा दिनांक</label>
                  <input type="date" className={inputCls} value={row.order_date} onChange={e => setRow(row.id, 'order_date', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पदनाम</label>
                  <select className={inputCls} value={row.designation} onChange={e => setRow(row.id, 'designation', e.target.value)}>
                    <option value="">निवडा</option>
                    {designations.map(d => <option key={d.designation_id} value={d.designation_id}>{d.designation_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">कार्यालय</label>
                  <select className={inputCls} value={row.office} onChange={e => setRow(row.id, 'office', e.target.value)}>
                    <option value="">निवडा</option>
                    {offices.map(o => <option key={o.office_id} value={o.office_id}>{o.office_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">रुजू होण्याचा दिनांक</label>
                  <input type="date" className={inputCls} value={row.joining_date} onChange={e => setRow(row.id, 'joining_date', e.target.value)} />
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
        <Button onClick={() => onNext({ promotions: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Promotion;