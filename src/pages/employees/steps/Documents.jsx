// src/pages/employees/steps/Documents.jsx
import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const DOCUMENTS = [
  { key: 'aadhaar',       label: 'Aadhaar Card',          required: true },
  { key: 'pan',           label: 'PAN Card',              required: true },
  { key: 'photo',         label: 'Passport Photo',        required: true },
  { key: 'joining_letter',label: 'Joining Letter',        required: true },
  { key: 'qualification', label: 'Qualification Certificate', required: false },
  { key: 'caste_cert',    label: 'Caste Certificate',     required: false },
];

const Documents = ({ defaultValues, onSubmit, onBack, onCancel }) => {
  const [files, setFiles] = useState(defaultValues?.documents || {});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (key, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFiles(prev => ({ ...prev, [key]: { name: file.name, size: file.size, data: reader.result } }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const err = {};
    DOCUMENTS.filter(d => d.required).forEach(d => {
      if (!files[d.key]) err[d.key] = `${d.label} is required`;
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ documents: files });
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Step 4: Documents Upload</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Upload required documents. Accepted formats: PDF, JPG, PNG (max 2MB each).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOCUMENTS.map(doc => (
            <div key={doc.key} className={`border-2 border-dashed rounded-lg p-4 transition-all
              ${files[doc.key] ? 'border-green-400 bg-green-50'
                : errors[doc.key] ? 'border-red-400 bg-red-50'
                : 'border-gray-300 hover:border-blue-400'}`}>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  {files[doc.key]
                    ? <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                        <CheckCircle className="w-3 h-3" /> {files[doc.key].name}
                      </p>
                    : <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG (max 2MB)</p>
                  }
                </div>
                {files[doc.key] && (
                  <button onClick={() => setFiles(prev => { const n = {...prev}; delete n[doc.key]; return n; })}
                    className="text-xs text-red-500 hover:text-red-700">Remove</button>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                  onChange={e => handleFileChange(doc.key, e.target.files[0])} />
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                  ${files[doc.key]
                    ? 'border-green-400 text-green-700 bg-white'
                    : 'border-gray-300 text-gray-600 bg-white hover:border-blue-400 hover:text-blue-600'}`}>
                  <Upload className="w-3.5 h-3.5" />
                  {files[doc.key] ? 'Replace' : 'Upload'}
                </span>
              </label>

              {errors[doc.key] && <p className="text-red-500 text-xs mt-1">{errors[doc.key]}</p>}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="outline" onClick={onBack}>← Previous</Button>
        </div>
        <Button onClick={handleSubmit} isLoading={submitting}>
          ✅ Submit & Save Employee
        </Button>
      </div>
    </div>
  );
};

export default Documents;