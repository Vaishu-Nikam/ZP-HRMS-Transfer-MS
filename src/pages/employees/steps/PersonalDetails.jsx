// src/pages/employees/steps/PersonalDetails.jsx
import React, { useState } from "react";
import { Card } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import { UserCircle } from "lucide-react";

const SALUTATION = ["श्री", "श्रीमती", "कुमारी", "डॉ"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const GENDER = ["पुरुष", "स्त्री", "इतर"];
const RELIGION = ["हिंदू", "मुस्लिम", "ख्रिश्चन", "बौद्ध", "जैन", "शीख", "इतर"];
const CATEGORY = [
  "खुला",
  "OBC",
  "SC",
  "ST",
  "NT-A",
  "NT-B",
  "NT-C",
  "NT-D",
  "SBC",
  "EWS",
];
const LANGUAGES = ["मराठी", "हिंदी", "English", "उर्दू", "इतर"];

const InputField = ({ label, required, error, children }) => (
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

const PersonalDetails = ({ defaultValues, onNext, onCancel }) => {
  const [form, setForm] = useState({
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    full_name_mr: "",
    father_husband_name: "",
    mother_name: "",
    name_changed: "नाही",
    previous_name: "",
    blood_group: "",
    gender: "",
    date_of_birth: "",
    mobile: "",
    pan: "",
    aadhaar: "",
    email: "",
    govt_email: "",
    religion: "",
    category: "",
    caste_category: "",
    caste_validity_no: "",
    caste_validity_date: "",
    mother_tongue: "",
    ...defaultValues,
  });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const err = {};
    if (!form.first_name) err.first_name = "पहिले नाव आवश्यक आहे";
    if (!form.last_name) err.last_name = "आडनाव आवश्यक आहे";
    if (!form.gender) err.gender = "लिंग निवडा";
    if (!form.date_of_birth) err.date_of_birth = "जन्मतारीख आवश्यक आहे";
    if (!form.mobile) err.mobile = "मोबाईल क्रमांक आवश्यक आहे";
    if (form.mobile && !/^\d{10}$/.test(form.mobile))
      err.mobile = "10 अंकी मोबाईल क्रमांक टाका";
    if (!form.aadhaar) err.aadhaar = "आधार क्रमांक आवश्यक आहे";
    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar))
      err.aadhaar = "12 अंकी आधार क्रमांक टाका";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <UserCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">वैयक्तिक माहिती भाग-१</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="संज्ञा">
            <select
              className={inputCls(false)}
              value={form.salutation}
              onChange={(e) => set("salutation", e.target.value)}
            >
              <option value="">निवडा</option>
              {SALUTATION.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </InputField>

          <InputField label="पहिले नाव (English)" required error={errors.first_name}>
            <input
              className={inputCls(errors.first_name)}
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) => set("first_name", e.target.value)}
            />
          </InputField>

          <InputField label="वडिलांचे/पतीचे नाव (English)">
            <input
              className={inputCls(false)}
              placeholder="Father/Husband Name"
              value={form.middle_name}
              onChange={(e) => set("middle_name", e.target.value)}
            />
          </InputField>

          <InputField label="आडनाव (English)" required error={errors.last_name}>
            <input
              className={inputCls(errors.last_name)}
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) => set("last_name", e.target.value)}
            />
          </InputField>

          <InputField label="पूर्ण नाव (मराठीमध्ये आईचे नावासह)">
            <input
              className={inputCls(false)}
              placeholder="संपूर्ण नाव मराठीत"
              value={form.full_name_mr}
              onChange={(e) => set("full_name_mr", e.target.value)}
            />
          </InputField>

          <InputField label="वडिलांचे संपूर्ण नाव">
            <input
              className={inputCls(false)}
              placeholder="वडिलांचे नाव"
              value={form.father_husband_name}
              onChange={(e) => set("father_husband_name", e.target.value)}
            />
          </InputField>

          <InputField label="आईचे संपूर्ण नाव">
            <input
              className={inputCls(false)}
              placeholder="आईचे नाव"
              value={form.mother_name}
              onChange={(e) => set("mother_name", e.target.value)}
            />
          </InputField>

          <InputField label="नावात बदल केला आहे का?">
            <select
              className={inputCls(false)}
              value={form.name_changed}
              onChange={(e) => set("name_changed", e.target.value)}
            >
              <option value="नाही">नाही</option>
              <option value="होय">होय</option>
            </select>
          </InputField>

          {form.name_changed === "होय" && (
            <InputField label="पूर्वीचे नाव">
              <input
                className={inputCls(false)}
                placeholder="पूर्वीचे नाव"
                value={form.previous_name}
                onChange={(e) => set("previous_name", e.target.value)}
              />
            </InputField>
          )}

          <InputField label="रक्तगट">
            <select
              className={inputCls(false)}
              value={form.blood_group}
              onChange={(e) => set("blood_group", e.target.value)}
            >
              <option value="">निवडा</option>
              {BLOOD_GROUPS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </InputField>

          <InputField label="लिंग" required error={errors.gender}>
            <select
              className={inputCls(errors.gender)}
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
            >
              <option value="">निवडा</option>
              {GENDER.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </InputField>

          <InputField label="जन्मतारीख" required error={errors.date_of_birth}>
            <input
              type="date"
              className={inputCls(errors.date_of_birth)}
              value={form.date_of_birth}
              onChange={(e) => set("date_of_birth", e.target.value)}
            />
          </InputField>

          <InputField label="मोबाईल क्रमांक" required error={errors.mobile}>
            <input
              className={inputCls(errors.mobile)}
              placeholder="10 अंकी मोबाईल"
              maxLength={10}
              value={form.mobile}
              onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))}
            />
          </InputField>

          <InputField label="पॅन क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="ABCDE1234F"
              maxLength={10}
              value={form.pan}
              onChange={(e) => set("pan", e.target.value.toUpperCase())}
            />
          </InputField>

          <InputField label="आधार क्रमांक" required error={errors.aadhaar}>
            <input
              className={inputCls(errors.aadhaar)}
              placeholder="12 अंकी आधार"
              maxLength={12}
              value={form.aadhaar}
              onChange={(e) =>
                set("aadhaar", e.target.value.replace(/\D/g, ""))
              }
            />
          </InputField>

          <InputField label="ई मेल आयडी">
            <input
              type="email"
              className={inputCls(false)}
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </InputField>

          <InputField label="शासकीय ई मेल आयडी">
            <input
              type="email"
              className={inputCls(false)}
              placeholder="email@gov.in"
              value={form.govt_email}
              onChange={(e) => set("govt_email", e.target.value)}
            />
          </InputField>

          <InputField label="धर्म">
            <select
              className={inputCls(false)}
              value={form.religion}
              onChange={(e) => set("religion", e.target.value)}
            >
              <option value="">निवडा</option>
              {RELIGION.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </InputField>

          <InputField label="प्रवर्ग">
            <select
              className={inputCls(false)}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">निवडा</option>
              {CATEGORY.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </InputField>

          <InputField label="जात प्रवर्ग">
            <input
              className={inputCls(false)}
              placeholder="जात प्रवर्ग"
              value={form.caste_category}
              onChange={(e) => set("caste_category", e.target.value)}
            />
          </InputField>

          <InputField label="जात वैधता प्रमाणपत्र क्रमांक">
            <input
              className={inputCls(false)}
              placeholder="प्रमाणपत्र क्रमांक"
              value={form.caste_validity_no}
              onChange={(e) => set("caste_validity_no", e.target.value)}
            />
          </InputField>

          <InputField label="जात वैधता दिनांक">
            <input
              type="date"
              className={inputCls(false)}
              value={form.caste_validity_date}
              onChange={(e) => set("caste_validity_date", e.target.value)}
            />
          </InputField>

          <InputField label="मातृभाषा">
            <select
              className={inputCls(false)}
              value={form.mother_tongue}
              onChange={(e) => set("mother_tongue", e.target.value)}
            >
              <option value="">निवडा</option>
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </InputField>
        </div>
      </Card>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onCancel}>
          रद्द करा
        </Button>
        {/* <Button onClick={() => { if (validate()) onNext(form); }}>पुढे →</Button> */}
        <Button onClick={() => onNext(form)}>पुढे →</Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
