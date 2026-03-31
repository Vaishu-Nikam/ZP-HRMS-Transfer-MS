// src/pages/employees/steps/Education.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const QUAL_TYPES = ['SSC', 'HSC', 'Diploma', 'Graduate', 'Post Graduate', 'PhD', 'इतर'];

const emptyRow = () => ({
  id: Date.now(), qual_type: '', institution: '',
  qualification: '', passing_year: '', obtained_date: '', certificate: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Education = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.education?.length ? defaultValues.education : [emptyRow()]
  );

  const addRow    = () => setRows(p => [...p, emptyRow()]);
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));
  const setRow    = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">शैक्षणिक अहर्ता माहिती</h3>
          </div>
          <Button size="sm" onClick={addRow}>
            <Plus className="w-4 h-4 mr-1" /> नवीन
          </Button>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">#{idx + 1}</span>
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">शैक्षणिक अहर्ता प्रकार</label>
                  <select className={inputCls} value={row.qual_type} onChange={e => setRow(row.id, 'qual_type', e.target.value)}>
                    <option value="">निवडा</option>
                    {QUAL_TYPES.map(q => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">संस्था / विद्यापीठ</label>
                  <input className={inputCls} placeholder="संस्थेचे नाव"
                    value={row.institution} onChange={e => setRow(row.id, 'institution', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">शैक्षणिक अहर्ता</label>
                  <input className={inputCls} placeholder="पदवी / प्रमाणपत्र"
                    value={row.qualification} onChange={e => setRow(row.id, 'qualification', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">उत्तीर्ण झालेले वर्ष</label>
                  <input className={inputCls} placeholder="2010"
                    maxLength={4} value={row.passing_year}
                    onChange={e => setRow(row.id, 'passing_year', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पात्रता प्राप्त दिनांक</label>
                  <input type="date" className={inputCls}
                    value={row.obtained_date} onChange={e => setRow(row.id, 'obtained_date', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">प्रमाणपत्र (File Name)</label>
                  <input className={inputCls} placeholder="certificate.pdf"
                    value={row.certificate} onChange={e => setRow(row.id, 'certificate', e.target.value)} />
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
        <Button onClick={() => onNext({ education: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Education;