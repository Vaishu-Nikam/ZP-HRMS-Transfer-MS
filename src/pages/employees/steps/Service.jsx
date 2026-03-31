// src/pages/employees/steps/Service.jsx
import React, { useState } from "react";
import { Card } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import { Briefcase } from "lucide-react";

const APPOINTMENT_TYPES = ["थेट", "पदोन्नती", "प्रतिनियुक्ती", "करार"];
const CADRE_SERVICES = ["Class I", "Class II", "Class III", "Class IV"];

const F = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${err ? "border-red-400" : "border-gray-300"}`;

const Service = ({ defaultValues, onNext, onBack, onCancel }) => {
  const [form, setForm] = useState({
    appointment_type: "",
    cadre_service: "",
    retirement_date: "",
    govt_joining_date: "",
    current_office_joining_date: "",
    sevarth_no: "",
    shalarth_no: "",
    pran_no: "",
    gpf_no: "",
    ppo_no: "",
    ppo_date: "",
    ...defaultValues,
  });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const err = {};
    if (!form.govt_joining_date)
      err.govt_joining_date = "शासकीय सेवेत रुजू दिनांक आवश्यक आहे";
    if (!form.retirement_date)
      err.retirement_date = "सेवानिवृत्ती दिनांक आवश्यक आहे";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">सेवा माहिती</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <F label="प्रथम नियुक्तीचा प्रकार">
            <select
              className={inputCls(false)}
              value={form.appointment_type}
              onChange={(e) => set("appointment_type", e.target.value)}
            >
              <option value="">निवडा</option>
              {APPOINTMENT_TYPES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </F>

          <F label="संवर्गातील सेवा">
            <select
              className={inputCls(false)}
              value={form.cadre_service}
              onChange={(e) => set("cadre_service", e.target.value)}
            >
              <option value="">निवडा</option>
              {CADRE_SERVICES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </F>

          <F
            label="सेवानिवृत्ती दिनांक"
            required
            error={errors.retirement_date}
          >
            <input
              type="date"
              className={inputCls(errors.retirement_date)}
              value={form.retirement_date}
              onChange={(e) => set("retirement_date", e.target.value)}
            />
          </F>

          <F
            label="शासकीय सेवेत रुजू दिनांक"
            required
            error={errors.govt_joining_date}
          >
            <input
              type="date"
              className={inputCls(errors.govt_joining_date)}
              value={form.govt_joining_date}
              onChange={(e) => set("govt_joining_date", e.target.value)}
            />
          </F>

          <F label="सध्याच्या कार्यालयात रुजू दिनांक">
            <input
              type="date"
              className={inputCls(false)}
              value={form.current_office_joining_date}
              onChange={(e) =>
                set("current_office_joining_date", e.target.value)
              }
            />
          </F>

          <F label="सेवार्थ क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="सेवार्थ क्रमांक"
              value={form.sevarth_no}
              onChange={(e) => set("sevarth_no", e.target.value)}
            />
          </F>

          <F label="शालार्थ क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="शालार्थ क्रमांक"
              value={form.shalarth_no}
              onChange={(e) => set("shalarth_no", e.target.value)}
            />
          </F>

          <F label="PRAN Number">
            <input
              className={inputCls(false)}
              placeholder="PRAN Number"
              value={form.pran_no}
              onChange={(e) => set("pran_no", e.target.value)}
            />
          </F>

          <F label="GPF क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="GPF क्रमांक"
              value={form.gpf_no}
              onChange={(e) => set("gpf_no", e.target.value)}
            />
          </F>

          <F label="PPO क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="PPO क्रमांक"
              value={form.ppo_no}
              onChange={(e) => set("ppo_no", e.target.value)}
            />
          </F>

          <F label="PPO दिनांक">
            <input
              type="date"
              className={inputCls(false)}
              value={form.ppo_date}
              onChange={(e) => set("ppo_date", e.target.value)}
            />
          </F>
        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            रद्द करा
          </Button>
          <Button variant="outline" onClick={onBack}>
            ← मागे
          </Button>
        </div>
        {/* <Button onClick={() => { if (validate()) onNext(form); }}>पुढे →</Button> */}
        <Button onClick={() => onNext(form)}>पुढे →</Button>
      </div>
    </div>
  );
};

export default Service;
