// src/pages/employees/steps/JobDetails.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Briefcase } from 'lucide-react';

const EMPLOYMENT_TYPES = ['Permanent', 'Temporary', 'Contract', 'Deputation'];
const CADRE_OPTIONS   = ['Class I', 'Class II', 'Class III', 'Class IV'];

const JobDetails = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [form, setForm] = useState({
    employee_code: '',
    designation_id: '',
    department_id: '',
    cadre: '',
    employment_type: '',
    date_of_joining: '',
    date_of_retirement: '',
    email_official: '',
    ...defaultValues,
  });
  const [errors, setErrors]       = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    setDepartments(JSON.parse(localStorage.getItem('departments')) || []);
    setDesignations(JSON.parse(localStorage.getItem('designations')) || []);
  }, []);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const err = {};
    if (!form.department_id)    err.department_id = 'Department is required';
    // if (!form.designation_id)   err.designation_id = 'Designation is required';
    if (!form.employment_type)  err.employment_type = 'Employment type is required';
    if (!form.date_of_joining)  err.date_of_joining = 'Date of joining is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

//   const handleNext = () => { if (validate()) onNext(form); };

const handleNext = () => {
  onNext(form);
};


  const selectClass = (hasError) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white
    ${hasError ? 'border-red-400' : 'border-gray-300'}`;

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Step 2: Job Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select className={selectClass(errors.department_id)} value={form.department_id}
              onChange={e => set('department_id', e.target.value)}>
              <option value="">Select Department</option>
              {departments.map(d => (
                <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
              ))}
            </select>
            {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation <span className="text-red-500">*</span>
            </label>
            <select className={selectClass(errors.designation_id)} value={form.designation_id}
              onChange={e => set('designation_id', e.target.value)}>
              <option value="">Select Designation</option>
              {designations.map(d => (
                <option key={d.designation_id} value={d.designation_id}>{d.designation_name}</option>
              ))}
            </select>
            {/* {errors.designation_id && <p className="text-red-500 text-xs mt-1">{errors.designation_id}</p>} */}
          </div>

          {/* Cadre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cadre</label>
            <select className={selectClass(false)} value={form.cadre}
              onChange={e => set('cadre', e.target.value)}>
              <option value="">Select Cadre</option>
              {CADRE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <select className={selectClass(errors.employment_type)} value={form.employment_type}
              onChange={e => set('employment_type', e.target.value)}>
              <option value="">Select Type</option>
              {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.employment_type && <p className="text-red-500 text-xs mt-1">{errors.employment_type}</p>}
          </div>

          {/* Date of Joining */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Joining <span className="text-red-500">*</span>
            </label>
            <input type="date" className={selectClass(errors.date_of_joining)}
              value={form.date_of_joining} onChange={e => set('date_of_joining', e.target.value)} />
            {errors.date_of_joining && <p className="text-red-500 text-xs mt-1">{errors.date_of_joining}</p>}
          </div>

          {/* Date of Retirement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Retirement</label>
            <input type="date" className={selectClass(false)}
              value={form.date_of_retirement} onChange={e => set('date_of_retirement', e.target.value)} />
          </div>

          {/* Official Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
            <input type="email" className={selectClass(false)}
              placeholder="employee@zp.gov.in"
              value={form.email_official} onChange={e => set('email_official', e.target.value)} />
          </div>

        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="outline" onClick={onBack}>← Previous</Button>
        </div>
        <Button onClick={handleNext}>Next Step →</Button>
      </div>
    </div>
  );
};

export default JobDetails;