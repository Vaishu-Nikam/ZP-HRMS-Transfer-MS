// src/pages/employees/steps/Address.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { MapPin } from 'lucide-react';

const ADDRESS_TYPES = ['कायम', 'सध्याचा', 'आपत्कालीन'];

const emptyRow = (type = '') => ({
  id: Date.now(), address_type: type, address: '', post_office: '',
  city: '', taluka: '', district: '', pincode: '', mobile: '', phone: '',
});

const inputCls = `w-full px-2.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`;

const Address = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [rows, setRows] = useState(
    defaultValues?.addresses?.length
      ? defaultValues.addresses
      : ADDRESS_TYPES.map(t => emptyRow(t))
  );

  const setRow = (id, k, v) => setRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">पत्ता माहिती</h3>
        </div>

        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-semibold text-blue-700 mb-3">{row.address_type} पत्ता</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">पत्ता</label>
                  <textarea className={`${inputCls} resize-none`} rows={2}
                    placeholder="घर नं, इमारत, रस्ता, लँडमार्क"
                    value={row.address} onChange={e => setRow(row.id, 'address', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पोस्ट ऑफिस</label>
                  <input className={inputCls} placeholder="पोस्ट ऑफिस"
                    value={row.post_office} onChange={e => setRow(row.id, 'post_office', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">शहर</label>
                  <input className={inputCls} placeholder="शहर"
                    value={row.city} onChange={e => setRow(row.id, 'city', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">तालुका</label>
                  <input className={inputCls} placeholder="तालुका"
                    value={row.taluka} onChange={e => setRow(row.id, 'taluka', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">जिल्हा</label>
                  <input className={inputCls} placeholder="जिल्हा"
                    value={row.district} onChange={e => setRow(row.id, 'district', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">पिन कोड</label>
                  <input className={inputCls} placeholder="416001" maxLength={6}
                    value={row.pincode} onChange={e => setRow(row.id, 'pincode', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">मोबाईल नंबर</label>
                  <input className={inputCls} placeholder="10 अंकी मोबाईल" maxLength={10}
                    value={row.mobile} onChange={e => setRow(row.id, 'mobile', e.target.value.replace(/\D/g, ''))} />
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
        <Button onClick={() => onNext({ addresses: rows })}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Address;