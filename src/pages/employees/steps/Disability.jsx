// src/pages/employees/steps/Disability.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Accessibility } from 'lucide-react';

const DISABILITY_TYPES = [
  'दृष्टीदोष', 'श्रवणदोष', 'अस्थिव्यंग', 'मतिमंद',
  'बहुविकलांग', 'मानसिक आजार', 'इतर'
];

const inputCls = `w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Disability = ({ defaultValues, onSubmit, onBack, onCancel }) => {
  const [form, setForm] = useState({
    is_disabled: 'नाही',
    disability_type: '',
    disability_percent: '',
    examination_date: '',
    certificate_date: '',
    ...defaultValues,
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Accessibility className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">दिव्यांग माहिती</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">दिव्यांग आहे का?</label>
            <div className="flex gap-4 mt-2">
              {['होय', 'नाही'].map(v => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="is_disabled" value={v}
                    checked={form.is_disabled === v}
                    onChange={() => set('is_disabled', v)}
                    className="text-blue-600" />
                  <span className="text-sm text-gray-700">{v}</span>
                </label>
              ))}
            </div>
          </div>

          {form.is_disabled === 'होय' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">दिव्यांग प्रकार</label>
                <select className={inputCls} value={form.disability_type} onChange={e => set('disability_type', e.target.value)}>
                  <option value="">निवडा</option>
                  {DISABILITY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">दिव्यांग टक्केवारी (%)</label>
                <input className={inputCls} placeholder="उदा. 40" maxLength={3}
                  value={form.disability_percent}
                  onChange={e => set('disability_percent', e.target.value.replace(/\D/g, ''))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">तपासणी दिनांक</label>
                <input type="date" className={inputCls}
                  value={form.examination_date} onChange={e => set('examination_date', e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">दिव्यांग प्रमाणपत्र दिनांक</label>
                <input type="date" className={inputCls}
                  value={form.certificate_date} onChange={e => set('certificate_date', e.target.value)} />
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Final Submit */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <p className="text-green-700 font-medium text-sm">
          ✅ सर्व माहिती भरली आहे. "Save करा" वर क्लिक करून कर्मचारी नोंदणी पूर्ण करा.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>रद्द करा</Button>
          <Button variant="outline" onClick={onBack}>← मागे</Button>
        </div>
        <Button onClick={() => onSubmit({ disability: form })}>
          ✅ कर्मचारी नोंदणी Save करा
        </Button>
      </div>
    </div>
  );
};

export default Disability;