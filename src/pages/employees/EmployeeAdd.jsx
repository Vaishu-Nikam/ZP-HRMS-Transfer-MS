// src/pages/employees/EmployeeAdd.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PersonalDetails from './steps/PersonalDetails';
import Service from './steps/Service';
import Education from './steps/Education';
import Promotion from './steps/Promotion';
import Transfer from './steps/Transfer';
import Pay from './steps/Pay';
import Family from './steps/Family';
import Nomination from './steps/Nomination';
import Address from './steps/Address';
import Disability from './steps/Disability';

const STEPS = [
  { id: 1,  label: 'वैयक्तिक माहिती' },
  { id: 2,  label: 'सेवा माहिती' },
  { id: 3,  label: 'शैक्षणिक माहिती' },
  { id: 4,  label: 'पदोन्नती माहिती' },
  { id: 5,  label: 'बदली माहिती' },
  { id: 6,  label: 'वेतन आयोग' },
  { id: 7,  label: 'कौटुंबिक माहिती' },
  { id: 8,  label: 'नामनिर्देशन' },
  { id: 9,  label: 'पत्ता माहिती' },
  { id: 10, label: 'दिव्यांग माहिती' },
];

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);
  const handleCancel = () => navigate('/employees');

  const handleFinalSubmit = (stepData) => {
    const finalData = { ...formData, ...stepData };
    const existing = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = {
      employee_id: Date.now(),
      employee_code: `EMP${Date.now().toString().slice(-5)}`,
      ...finalData,
      created_at: new Date().toISOString(),
    };
    existing.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(existing));
    toast.success('कर्मचारी यशस्वीरीत्या नोंदणी झाली! ✅');
    navigate('/employees');
  };

  const stepProps = { defaultValues: formData, onNext: handleNext, onBack: handleBack, onCancel: handleCancel };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Page Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">नवीन कर्मचारी नोंदणी</h1>
          <p className="text-sm text-gray-500">कर्मचाऱ्याची संपूर्ण माहिती भरा</p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                    ${isCompleted ? 'bg-blue-600 border-blue-600 text-white'
                      : isActive   ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'}`}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-[10px] font-medium whitespace-nowrap
                    ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 mb-4 transition-all
                    ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      {currentStep === 1  && <PersonalDetails  {...stepProps} />}
      {currentStep === 2  && <Service   {...stepProps} />}
      {currentStep === 3  && <Education {...stepProps} />}
      {currentStep === 4  && <Promotion {...stepProps} />}
      {currentStep === 5  && <Transfer  {...stepProps} />}
      {currentStep === 6  && <Pay       {...stepProps} />}
      {currentStep === 7  && <Family    {...stepProps} />}
      {currentStep === 8  && <Nomination {...stepProps} />}
      {currentStep === 9  && <Address   {...stepProps} />}
      {currentStep === 10 && <Disability {...stepProps} onSubmit={handleFinalSubmit} />}
    </div>
  );
};

export default EmployeeAdd;