// src/pages/appraisal/AppraisalForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ClipboardCheck, Star, User, Award } from "lucide-react";
import toast from "react-hot-toast";

const CURRENT_YEAR = new Date().getFullYear();

const GRADE_FROM_SCORE = (score) => {
  if (!score) return "Pending";
  if (score >= 90) return "Outstanding";
  if (score >= 75) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 45) return "Average";
  return "Poor";
};

const headingCls = "text-base font-semibold text-gray-900"; // darker = better hierarchy
const subTextCls = "text-sm text-gray-700";
const labelCls = "block text-sm font-semibold text-gray-700 mb-3"; // UPDATED
const questionCls = "text-sm font-semibold text-gray-700 mb-3"; // NEW
const footerTextCls = "text-sm font-semibold text-gray-800";

const SELF_FIELDS = [
  { key: 'target_achievement', label: 'लक्ष्य साध्य', max: 20 },
  { key: 'work_quality', label: 'कामाचा दर्जा', max: 20 },
  { key: 'punctuality', label: 'वेळपालन / उपस्थिती', max: 15 },
  { key: 'initiative', label: 'पुढाकार / नावीन्य', max: 15 },
  { key: 'team_work', label: 'सांघिक कार्य', max: 15 },
  { key: 'communication', label: 'संवाद कौशल्य', max: 15 },
];

const NAV_ITEMS = [
  { id: 'info', label: 'मूलभूत माहिती', icon: User },
  { id: 'self', label: 'स्व-मूल्यमापन', icon: ClipboardCheck },
  { id: 'reporting', label: 'प्रतिवेदन अधिकाऱ्यांनी लिहावयाचा मूल्यमापन अहवाल', icon: Star },
  { id: 'reviewing', label: ' पुनर्विलोकन अधिकाऱ्याचा अभिप्राय', icon: Star },
];

const GRADE_STYLE = {
  'Outstanding': { text: 'text-green-400', right: 'bg-green-50 border-green-200', rtxt: 'text-green-700' },
  'Very Good': { text: 'text-blue-400', right: 'bg-blue-50 border-blue-200', rtxt: 'text-blue-700' },
  'Good': { text: 'text-yellow-400', right: 'bg-yellow-50 border-yellow-200', rtxt: 'text-yellow-700' },
  'Average': { text: 'text-orange-400', right: 'bg-orange-50 border-orange-200', rtxt: 'text-orange-700' },
  'Poor': { text: 'text-red-400', right: 'bg-red-50 border-red-200', rtxt: 'text-red-700' },
  'Pending': { text: 'text-slate-400', right: 'bg-gray-50 border-gray-200', rtxt: 'text-gray-500' },
};

const SectionHeader = ({ icon: Icon, title, subtitle, note }) => (
  <div className="flex flex-col items-center text-center gap-2 mb-4">

    {/* Icon */}
    {Icon && (
      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
    )}

    {/* Title */}
    <h3 className="text-base font-semibold text-gray-900">
      {title}
    </h3>

    {/* Subtitle */}
    {subtitle && (
      <p className="text-sm text-gray-700">
        {subtitle}
      </p>
    )}

    {/* Note */}
    {note && (
      <p className="text-xs text-gray-500 max-w-2xl">
        {note}
      </p>
    )}
  </div>
);

const Input = ({ label, name, type = "text", form, set, inputCls, isViewMode }) => (
  <div>
    <label className={labelCls}>      {label}
    </label>
    <input
      type={type}
      className={inputCls}
      value={form[name] || ""}
      onChange={(e) => set(name, e.target.value)}
      disabled={isViewMode}
    />
  </div>
);

const inputCls = `w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all`;

const ScoreInput = ({ label, max, value, onChange, disabled }) => {
  const pct = value ? Math.round((Number(value) / max) * 100) : 0;
  const barColor =
    pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-blue-500" : "bg-orange-400";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-400 font-medium">/{max}</span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="0"
          max={max}
          className={`w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm text-center font-semibold
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
          value={value || ""}
          onChange={(e) =>
            onChange(Math.min(max, Math.max(0, Number(e.target.value))))
          }
          disabled={disabled}
        />
        <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-gray-600 w-10 text-right">
          {pct}%
        </span>
      </div>
    </div>
  );
};

const AppraisalForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [activeSection, setActiveSection] = useState("info");
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    // 🔹 Section 1 – Establishment
    employee_name: "",
    cadre: "",
    dob: "",
    designation: "",
    department: "",

    reporting_officer_details: "",
    reviewing_officer_details: "",

    leave_details: "",
    training_details: "",
    assets_statement: "",

    // 🔹 Section 2 – Self Appraisal
    job_description: "",
    allocated_tasks: "",
    key_works: "",
    difficulties: "",
    training_required: "",
    self_assets_statement: "",

    // 🔹 Score Based (existing)
    target_achievement: "",
    work_quality: "",
    punctuality: "",
    initiative: "",
    team_work: "",
    communication: "",
    self_remarks: "",

    // 🔹 Section 3 – Reporting Officer
    work_completion_1: "",
    work_completion_2: "",
    work_completion_3: "",

    personal_attr_1: "",
    personal_attr_2: "",
    personal_attr_3: "",
    personal_attr_4: "",
    personal_attr_5: "",
    personal_attr_6: "",

    efficiency_1: "",
    efficiency_2: "",
    efficiency_3: "",
    efficiency_4: "",
    efficiency_5: "",

    character_integrity: "",
    overall_assessment: "",
    state_of_health: "",
    overall_gradation: "",

    agree_with_reporting: "", // Yes / No
    review_overall_assessment: "",
    review_overall_gradation: "",
  });
  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
    if (isEdit) {
      const data = JSON.parse(localStorage.getItem('appraisals')) || [];
      const found = data.find(a => String(a.appraisal_id) === String(id));
      if (found) setForm(found);
    }
  }, [id]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const selfTotal = SELF_FIELDS.reduce((s, f) => s + (Number(form[f.key]) || 0), 0);
  const avgScore = form.reporting_score
    ? Math.round((selfTotal + Number(form.reporting_score)) / 2)
    : selfTotal;
  const autoGrade = GRADE_FROM_SCORE(avgScore);
  const gradeStyle = GRADE_STYLE[autoGrade] || GRADE_STYLE['Pending'];

  const selectedEmp = employees.find(
    (e) => String(e.employee_id) === String(form.employee_id),
  );
  const empInitials = selectedEmp
    ? `${(selectedEmp.first_name || "")[0] || ""}${(selectedEmp.last_name || "")[0] || ""}`
    : "?";

  const handleSubmit = (status) => {
    if (!form.employee_id) {
      toast.error("कर्मचारी निवडा");
      setActiveSection("info");
      return;
    }

    const finalForm = {
      ...form,
      self_score: selfTotal,
      final_grade: form.reporting_score ? autoGrade : 'Pending',
      status,
      appraisal_id: isEdit ? form.appraisal_id : Date.now(),
      created_at: form.created_at || new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('appraisals')) || [];
    const updated = isEdit
      ? existing.map(a => String(a.appraisal_id) === String(id) ? finalForm : a)
      : [...existing, finalForm];

    localStorage.setItem("appraisals", JSON.stringify(updated));
    toast.success(isEdit ? "APR अपडेट झाला! ✅" : "APR तयार झाला! ✅");
    navigate("/appraisal");
  };

  const NavBtn = ({ item }) => (
    <button
      onClick={() => setActiveSection(item.id)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
        ${
          activeSection === item.id
            ? "bg-slate-600 text-white"
            : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
        }`}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      {item.label}
    </button>
  );

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/appraisal")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isViewMode ? "APR अहवाल" : isEdit ? "APR संपादन" : "नवीन APR"}
          </h1>
          <p className="text-sm text-gray-500">वार्षिक कार्यमूल्यमापन अहवाल</p>
        </div>
      </div>

      {/* ── Split Layout ── */}
      <div className="space-y-5">

        {/* 🔷 TOP HORIZONTAL NAVBAR */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Employee */}
          <div className="flex items-center gap-3 w-full lg:w-auto">            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {empInitials}
          </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {selectedEmp
                  ? `${selectedEmp.first_name} ${selectedEmp.last_name}`
                  : "कर्मचारी निवडा"}
              </p>
              <p className="text-xs text-gray-500">
                {form.appraisal_year}-{Number(form.appraisal_year) + 1}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">            {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all            ${activeSection === item.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {index + 1}. {item.label}
            </button>
          ))}
          </div>

          {/* Grade */}
          <div className="text-left lg:text-right w-full lg:w-auto">
            <p className={`text-sm font-bold ${gradeStyle.text}`}>
              {autoGrade}
            </p>
            <p className="text-xs text-gray-500">{avgScore}/100</p>
          </div>

        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">  <div
          className="h-1 bg-blue-500 rounded-full transition-all"

          style={{
            width: `${(NAV_ITEMS.findIndex(i => i.id === activeSection) + 1) /
              NAV_ITEMS.length * 100
              }%`
          }}
        />
        </div>

        {/* 🔷 FULL WIDTH CONTENT */}
        <div className="w-full">
          {/*INFO*/}
          {activeSection === 'info' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">

              {/* Header */}
              <SectionHeader
                icon={User}
                title="भाग – १ (Section–1)"
                subtitle="आस्थापना शाखेने भरावयाची माहिती"
                note="(To be filled in by Establishment section)"
              />

              {/* 1 + 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className={questionCls}>
                    १. प्रतिवेदन करावयाच्या शासकीय अधिकारी / कर्मचाऱ्याचे नाव
                    (Name of the officer / employee reported upon)
                  </label>
                  <select className={inputCls}
                    value={form.employee_id}
                    onChange={(e) => set('employee_id', e.target.value)}
                  >
                    <option value="">— निवडा —</option>
                    {employees.map((e) => (
                      <option key={e.employee_id} value={e.employee_id}>
                        {e.employee_code} — {e.first_name} {e.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input label="२. संवर्ग (Cadre)" name="cadre" form={form} set={set} inputCls={inputCls} />
              </div>

              {/* 3 - 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="३. जन्म दिनांक (Date of Birth)" name="dob" type="date" form={form} set={set} inputCls={inputCls} />
                <Input label="४. सध्याचे पद (Present Post)" name="present_post" form={form} set={set} inputCls={inputCls} />

                <Input label="५. सध्याच्या पदावर नियुक्तीचा दिनांक (Date of appointment to present post)" name="appointment_date" type="date" form={form} set={set} inputCls={inputCls} />

                <Input label="६. प्रशासकीय विभाग / कार्यालय (Administrative Department / office)" name="department" form={form} set={set} inputCls={inputCls} />
              </div>

              {/* 7 */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  ७. प्रतिवेदन अधिकारी व पुनर्विलोकन अधिकारी यांचा तपशील
                  (Details of Reporting and Reviewing officers)
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="अ) प्रतिवेदन अधिकारी नाव (Reporting Officer Name)" name="reporting_name" form={form} set={set} inputCls={inputCls} />
                  <Input label="पदनाम (Designation)" name="reporting_designation" form={form} set={set} inputCls={inputCls} />
                  <Input label="कालावधी (Period)" name="reporting_period" form={form} set={set} inputCls={inputCls} />

                  <Input label="ब) पुनर्विलोकन अधिकारी नाव (Reviewing Officer Name)" name="reviewing_name" form={form} set={set} inputCls={inputCls} />
                  <Input label="पदनाम (Designation)" name="reviewing_designation" form={form} set={set} inputCls={inputCls} />
                  <Input label="कालावधी (Period)" name="reviewing_period" form={form} set={set} inputCls={inputCls} />
                </div>
              </div>

              {/* 8 */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  ८. प्रतिवेदन कालावधीत रजा आणि इतर अनुपस्थितीचा तपशील
                  (Details of leave and absence due to other reasons during period under report)
                </h4>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <Input label="अ) रजा कालावधी (Leave Period)" name="leave_period" form={form} set={set} inputCls={inputCls} />
                  <Input label="प्रकार (Type)" name="leave_type" form={form} set={set} inputCls={inputCls} />
                  <Input label="शेरा (Remarks)" name="leave_remarks" form={form} set={set} inputCls={inputCls} />
                </div>

                <div>
                  <label className={labelCls}>                    ब) इतर कारणे (विशद करा जसे की, विनापरवानगी गैरहजेरी / फरार)
                    (Other reasons (specify) such as absconding, unauthorized absence, etc.)
                  </label>
                  <textarea className={inputCls}
                    rows="3"
                    value={form.other_reasons || ""}
                    onChange={(e) => set("other_reasons", e.target.value)}
                  />
                </div>
              </div>

              {/* 9 */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  ९. प्रतिवेदन कालावधीत घेतलेल्या प्रशिक्षणाचा तपशील
                  (Details of training undergone during period under report)
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="कालावधी (Period)" name="training_period" form={form} set={set} inputCls={inputCls} />
                  <Input label="संस्था (Institute)" name="training_institute" form={form} set={set} inputCls={inputCls} />
                  <Input label="विषय (Subject)" name="training_subject" form={form} set={set} inputCls={inputCls} />
                </div>
              </div>

              {/* 10 */}
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="दिनांक (Date)" name="date" type="date" form={form} set={set} inputCls={inputCls} />
                <Input label="ठिकाण (Place)" name="place" form={form} set={set} inputCls={inputCls} />
              </div>

              {/* 11 */}
              <div className="border-t pt-4">
                <label className={questionCls}>
                  १०. मागील वर्षाचा दि. ३१ मार्च अखेरचे वार्षिक मालमत्ता व दायित्व विवरणपत्र संबंधित प्राधिकरणाकडे सादर करण्याची दिनांक
                  (Date of filing Assets and Liability statement of previous year to concerned authority.)
                </label>

                <input
                  type="date"
                  className={inputCls}
                  value={form.assets_liability_date || ""}
                  onChange={(e) => set("assets_liability_date", e.target.value)}
                />
              </div>

              <div  className={labelCls}>

                <div>
                  <p>ठिकाण (Place) -</p>
                  <p>दिनांक (Date) -</p>
                </div>

                <div className="text-right">
                  <p className={footerTextCls}>आस्थापना / संस्करण अधिकारी यांचे नाव, पदनाम व स्वाक्षरी</p>
                  <p className={footerTextCls}>Name, Designation, and Signature of the Establishment/Processing Officer</p>                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveSection('self')}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl"
                >
                जतन करा आणि पुढे जा →
                </button>
              </div>

            </div>
          )}
          {/* SELF */}
          {/* SELF */}
          {activeSection === 'self' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
              <SectionHeader
                icon={ClipboardCheck}
                title="भाग – २ (Section–2)"
                subtitle="स्वयंमूल्यनिर्धारण अहवाल (Self-Appraisal Report)"
                note="(To be filled in by officer / employee reported upon and reviewed)"
              />

              {/* 1 */}
              <div>
                <label className={questionCls}>
                  १. धारण केलेल्या पदावरून करणे अपेक्षित असलेल्या कामांचे थोडक्यात विवरण (Brief description of tasks required to be performed while holding the post.) (५० शब्द)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form.q1 || ""}
                  onChange={(e) => set("q1", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 2 */}
              <div>
                <label className={questionCls}>                  २.वार्षिक / प्रतिवेदनाच्या कालावधीकरिता नेमून दिलेल्या कामांची उद्दिष्ट (असल्यास) (Allocated Tasks (if any) for the year or period reported upon) :-
                </label>
                <textarea rows="4" className={inputCls}
                  value={form.q2 || ""}
                  onChange={(e) => set("q2", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 3 */}
              <div>
                <label className={questionCls}>
                  ३. वर्षभरात / सदर कालावधीत पार पाडलेल्या ४-५ महत्वाच्या व उल्लेखनीय कामांचे संक्षिप्त वर्णन (List 4-5 important and noteworthy works done during the period) (१०० शब्द)
                </label>
                <textarea rows="5" className={inputCls}
                  value={form.q3 || ""}
                  onChange={(e) => set("q3", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 4 */}
              <div className="space-y-2">
                <h4 className={questionCls}>
                  ४. जे उद्दिष्ट पूर्ण होऊ शकले नाहीत, त्याकरिता आलेल्या अडचणी
                  (Difficulties faced in not achieving certain targets)
                </h4>

                <textarea
                  rows="4"
                  className={`${inputCls} resize-none`}
                  value={form.q4 || ""}
                  onChange={(e) => set("q4", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 5 */}
              <div>
                <label className={questionCls}>
                  ५. कार्यक्षमता वाढविण्यासाठी स्वतःस आवश्यक वाटते असे प्रशिक्षणाचे क्षेत्र (Mention areas of required training which you feel necessary for higher efficiency)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form.q5 || ""}
                  onChange={(e) => set("q5", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 6 */}
              <div>
                <label className={questionCls}>                  ६. मागील वर्षाच्या दि. ३१ मार्च अखेरचे वार्षिक मालमत्ता विवरणपत्र संबंधित प्राधिकाऱ्याकडे सादर केले आहे काय ? (Whether Assets and Liability statement of previous year, submitted to concerned authority? – Yes / No, Date of submission, if submitted)
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    className={inputCls}
                    value={form.q6_status || ""}
                    onChange={(e) => set("q6_status", e.target.value)}
                    disabled={isViewMode}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>

                  <input
                    type="date"
                    className={inputCls}
                    value={form.q6_date || ""}
                    onChange={(e) => set("q6_date", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Footer */}


              <div c className={labelCls}>

                <div>
                  <p>ठिकाण (Place) -</p>
                  <p>दिनांक (Date) -</p>
                </div>

                <div className="text-right">
                  <p className={footerTextCls}>अधिकाऱ्याची / कर्मचाऱ्याची स्वाक्षरी, नाव व पदनाम</p>
                  <p className={footerTextCls}>Signature, Name, and Designation of the Officer/Employee</p>       </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-between pt-2">
                <button onClick={() => setActiveSection('info')}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm rounded-xl">
                  ← मागील पान
                </button>

                <button onClick={() => setActiveSection('reporting')}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-xl">
                  जतन करा आणि पुढे जा →
                </button>
              </div>

            </div>
          )}

          {/* REPORTING */}
          {/* REPORTING */}
          {activeSection === 'reporting' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">

              <SectionHeader
                icon={Star}
                title="भाग – ३ (Section 3)"
                subtitle="प्रतिवेदन अधिकाऱ्यांनी लिहावयाचा मूल्यमापन अहवाल"
                note="Performance Appraisal Report prepared by reporting officer"
              />
              {/* 1 */}
              <div>
                <label className={labelCls}>
                  १. भाग २ मध्ये नमूद करण्यात आलेल्या स्वयंमूल्यनिर्धारण अहवालाशी आपण सहमत आहात काय? नसल्यास, वस्तुस्थितीदर्शक अभिप्राय द्यावेत.
                  (Whether you agree with self-assessment recorded in part two? If not, then state factual position)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form?.r1 || ""}
                  onChange={(e) => set("r1", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 2 */}
              <div>
                <label className={labelCls}>                  २. प्रतिवेदन कालावधीत पार पाडलेल्या महत्त्वपूर्ण व उल्लेखनीय कामासंदर्भात आपले स्पष्ट अभिप्राय द्यावेत.
                  (Offer your remarks on important and noteworthy works mentioned in self-assessment report)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form?.r2 || ""}
                  onChange={(e) => set("r2", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 3 */}
              <div>
                <label className={labelCls}>                  ३. प्रतिवेदित अधिकारी/कर्मचारी यांचे त्यांच्या कामाच्या संदर्भात लक्षणीय अपयश निदर्शनास आले असल्यास  वस्तुस्थितीदर्शक अभिप्राय द्यावेत.
                  (Has the officer/employee reported upon met with significant failures in respect of his work ? If yes, please furnish factual details)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form?.r3 || ""}
                  onChange={(e) => set("r3", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 4 */}
              <div>
                <label className={labelCls}>
                  ४. संबंधित अधिकाऱ्यांनी / कर्मचाऱ्यांनी कार्यक्षमता वाढवण्याकरिता आवश्यक असलेल्या प्रशिक्षणाचे बाबत आपण सहमत आहात काय?
                  (Do you agree with the skill up-gradation needs as identified by the officer?)
                </label>
                <textarea rows="4" className={inputCls}
                  value={form?.r4 || ""}
                  onChange={(e) => set("r4", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 5 */}
              <div>
                <label className={labelCls}>                  ५.अधिकारी / कर्मचारी यांची कार्यपूर्तता, कार्यक्षमता व वैयक्तिक गुणवैशिष्ट्ये या बाबतचे गुणांकन.
                  (Gradation on work completed, efficiency and personal attributes by officers/employees)
                </label>
              </div>

              {/* WORK COMPLETION TABLE */}
              <div className="border">
                <p className="text-xs font-semibold p-2">
                  अ) कार्यपूर्तता (Work completion) (weightage ४० %)
                </p>

                <div className="grid grid-cols-5 text-xs font-semibold text-center">
                  <div className="border p-2">अ.क्र. Sr.No.</div>
                  <div className="border p-2">मुद्दे Points</div>
                  <div className="border p-2">प्रतिवेदन अधिकारी Reporting Officer</div>
                  <div className="border p-2">पुनर्विलोकन अधिकारी (Review Officer)</div>
                  <div className="border p-2">पुनर्विलोकन अधिकाऱ्यांची स्वाक्षरी (Signature of Review Officer)</div>
                </div>

                {[
                  "उद्दिष्टानुसार नेमून दिलेल्या कार्याची पूर्तता (Accomplishment of planned work)",
                  "केलेल्या कामाचा दर्जा (Quality of Output)",
                  "केलेल्या उत्कृष्ट/नवीन कार्य (Accomplishment of exceptional work/unforeseen tasks performed)",
                  "कार्यपूर्ती या घटकाचे सरासरी गुणांकन (Average gradation on Work completion)"
                ].map((text, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs">
                    <div className="border p-2 text-center">{i + 1}</div>
                    <div className="border p-2">{text}</div>
                    <input className="border p-2" value={form?.[`wc_r_${i}`] || ""} onChange={e => set(`wc_r_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`wc_rev_${i}`] || ""} onChange={e => set(`wc_rev_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`wc_sign_${i}`] || ""} onChange={e => set(`wc_sign_${i}`, e.target.value)} />
                  </div>
                ))}
              </div>

              {/* PERSONAL ATTRIBUTES TABLE */}
              <div className="border">
                <p className="text-xs font-semibold p-2">
                  ब) वैयक्तिक गुणविशेष (Personal attributes) (weightage ३० %)
                </p>

                <div className="grid grid-cols-5 text-xs font-semibold text-center">
                  <div className="border p-2">अ.क्र. Sr.No.</div>
                  <div className="border p-2">मुद्दे Items</div>
                  <div className="border p-2">प्रतिवेदन अधिकारी Reporting Officer</div>
                  <div className="border p-2">पुनर्विलोकन अधिकारी (Review Officer)</div>
                  <div className="border p-2">पुनर्विलोकन अधिकाऱ्यांची स्वाक्षरी (Signature of Review Officer)</div>
                </div>

                {[
                  "कामाविषयीची वृत्ती (Attitude to work)",
                  "जबाबदारीची जाणीव (Sense of responsibility)",
                  "एकूण व्यक्तिमत्व व वर्तन (Overall bearing and Personality)",
                  "भावनिक स्थैर्य (Emotional stability)",
                  "संवाद कौशल्य (Communication Skills)",
                  "वेळेत काम पूर्ण करण्याची क्षमता (Capacity to work in time limit)",
                  "वैयक्तिक गुणविशेष या घटकाचे सरासरी गुणांकन (Average gradation on Personal Attributes)"
                ].map((text, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs">
                    <div className="border p-2 text-center">{i + 1}</div>
                    <div className="border p-2">{text}</div>
                    <input className="border p-2" value={form?.[`pa_r_${i}`] || ""} onChange={e => set(`pa_r_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`pa_rev_${i}`] || ""} onChange={e => set(`pa_rev_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`pa_sign_${i}`] || ""} onChange={e => set(`pa_sign_${i}`, e.target.value)} />
                  </div>
                ))}
              </div>

              {/* EFFICIENCY TABLE */}
              <div className="border">
                <p className="text-xs font-semibold p-2">
                  क) कार्यक्षमता (Efficiency) (weightage 30 %)
                </p>

                <div className="grid grid-cols-5 text-xs font-semibold text-center">
                  <div className="border p-2">अ.क्र. Sr.No.</div>
                  <div className="border p-2">मुद्दे Items</div>
                  <div className="border p-2">प्रतिवेदन अधिकारी Reporting Officer</div>
                  <div className="border p-2">पुनर्विलोकन अधिकारी (Review Officer)</div>
                  <div className="border p-2">पुनर्विलोकन अधिकाऱ्यांची स्वाक्षरी (Signature of Review Officer)</div>
                </div>

                {[
                  "संबंधित कायदे, नियम व पद्धती, माहिती तंत्रज्ञान व कार्यालयीन पद्धती यांची माहिती (Knowledge of relevant Acts/Rules/procedures/IT Skill and awareness of local norms in the relevant area)",
                  "धोरणात्मक नियोजनाची क्षमता (Strategic planning ability)",
                  "निर्णय घेण्याची क्षमता (Decision making ability)",
                  "उपक्रमशीलता (Initiative)",
                  "इतर शासकीय यंत्रणेशी समन्वय साधण्याची क्षमता (Ability to co-ordinate with other government agencies in relation to work)",
                  "कार्यकुशलता या घटकाचे सरासरी गुणांकन (Average gradation on Work efficiency)"
                ].map((text, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs">
                    <div className="border p-2 text-center">{i + 1}</div>
                    <div className="border p-2">{text}</div>
                    <input className="border p-2" value={form?.[`ef_r_${i}`] || ""} onChange={e => set(`ef_r_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`ef_rev_${i}`] || ""} onChange={e => set(`ef_rev_${i}`, e.target.value)} />
                    <input className="border p-2" value={form?.[`ef_sign_${i}`] || ""} onChange={e => set(`ef_sign_${i}`, e.target.value)} />
                  </div>
                ))}
              </div>

              {/* 6 */}
              <div className="space-y-2">
                <label className={labelCls}>
                  ६. संबंधित अधिकारी/कर्मचारी यांच्या स्वभाव व चारित्र्याबाबत आपले स्पष्ट अभिप्राय द्यावेत
                  प्रतिकूल अभिप्राय असल्यास त्यासंबंधी उदाहरणे नमूद करावीत
                  (Offer your remarks on character and integrity (if remarks are negative, then mention instances))
                </label>

                <textarea
                  rows="4"
                  className={`${inputCls} resize-none`}
                  value={form?.r6 || ""}
                  onChange={(e) => set("r6", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 7 */}
              <div className="space-y-2">
                <label className={labelCls}>
                  ७. अधिकारी/कर्मचारी यांचे एकंदर मूल्यमापन (जास्तीत जास्त १०० शब्द)
                  (Overall Assessment of officer/employee (Maximum 100 words))
                  यामध्ये संबंधित अधिकारीच्या बलस्थान, कमजोरी, त्यांनी केलेली कामगिरी,
                  महिला व मागासवर्गीयांबाबतचा दृष्टिकोन यांचा समावेश असावा.
                  (Include Strengths and lesser strengths and his attitude towards disabled persons, women and Backward classes)
                </label>

                <textarea
                  rows="4"
                  className={`${inputCls} resize-none`}
                  value={form?.r7 || ""}
                  onChange={(e) => set("r7", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              {/* 8 */}
              <div className="space-y-2">
                <label className={labelCls}>
                  ८. प्रकृतीमान (State of Health)
                  (खूप चांगले / चांगले / समाधानकारक नाही)
                  (Very good / Good / Not Good)
                </label>

                <div className="flex gap-20 ml-8">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="health"
                      value="very_good"
                      checked={form?.health === "very_good"}
                      onChange={(e) => set("health", e.target.value)}
                    />
                    खूप चांगले (Very Good)
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="health"
                      value="good"
                      checked={form?.health === "good"}
                      onChange={(e) => set("health", e.target.value)}
                    />
                    चांगले (Good)
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="health"
                      value="not_good"
                      checked={form?.health === "not_good"}
                      onChange={(e) => set("health", e.target.value)}
                    />
                    समाधानकारक नाही (Not Good)
                  </label>
                </div>
              </div>

              {/* 9 */}
              <div className="border grid grid-cols-2 text-xs">
                <div className={questionCls}>
                  ९. एकत्रित गुणांकन (Overall Gradation)
                </div>
                <input
                  className="border p-2"
                  value={form?.final_grade || ""}
                  onChange={(e) => set("final_grade", e.target.value)}
                />
              </div>



              {/* Footer */}


              <div  className={labelCls}>

                <div>
                  <p>ठिकाण (Place) -</p>
                  <p>दिनांक (Date) -</p>
                </div>

                <div className="text-right">
                  <p className={footerTextCls}>प्रतिवेदन अधिकाऱ्याची सही, नाव व पदनाम</p>
                  <p className={footerTextCls}>Signature, Name & Designation of Reporting Officer</p>               </div>
              </div>
              {/* <div className="flex justify-between pt-4 text-xs">
                <div>
                  <p>ठिकाण (Place)</p>
                  <p>दिनांक (Date)</p>
                </div>

                <div className="text-right">
                  <p className={footerTextCls}>प्रतिवेदन अधिकाऱ्याची सही, नाव व पदनाम</p>
                  <p className={footerTextCls}>Signature, Name & Designation of Reporting Officer</p>
                </div>
              </div> */}







              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveSection('self')}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm rounded-xl"
                >
                  ← मागील पान
                </button>

                <button
                  onClick={() => setActiveSection('reviewing')}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-xl"
                >
                  जतन करा आणि पुढे जा →
                </button>
              </div>
            </div>
          )}
          {/* REVIEWING */}
          {activeSection === 'reviewing' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 text-xs">

              {/* Header */}
              <SectionHeader
                icon={Award}
                title="भाग – ४ (Section 4)"
                subtitle="पुनर्विलोकन (Review)"
                note="Remarks of Reviewing Officer"
              />
              {/* 1 */}
              <div>
                <label  className={labelCls}>
                  १. आपण प्रतिवेदन अधिकाऱ्याने, संबंधित अधिकारी/कर्मचारी यांच्या कार्यपूर्ती, कार्यक्षमता, वैयक्तिक गुणविशेष यासंदर्भात भाग ३ मध्ये मांडलेल्या मुद्द्यांवर सहमत आहात काय?
                  (Do you agree with assessment of Reporting Officer on work done, efficiency, personal attributes in part 3 of concerned officer/employee?)
                </label>

                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="review_agree" value="yes"
                      checked={form.review_agree === "yes"}
                      onChange={(e) => set("review_agree", e.target.value)} />
                    होय (Yes)
                  </label>

                  <label className="flex items-center gap-1">
                    <input type="radio" name="review_agree" value="no"
                      checked={form.review_agree === "no"}
                      onChange={(e) => set("review_agree", e.target.value)} />
                    नाही (No)
                  </label>
                </div>
              </div>

              {/* 2 */}
              <div>
                <label  className={labelCls}>
                  २. सहमत नसल्यास, फरकाचे व कारणे यांचे तपशील द्यावेत
                  (In case of difference of opinion details and reasons for the same may be given)
                </label>

                <textarea
                  rows="4"
                  className={inputCls}
                  value={form.review_reason || ""}
                  onChange={(e) => set("review_reason", e.target.value)}
                />
              </div>

              {/* 3 */}
              <div>
                <label  className={labelCls}>
                  ३. अधिकारी/कर्मचारी यांचे एकंदर मूल्यमापन (जास्तीत जास्त १०० शब्द)
                  (Overall Assessment of officer/employee (Maximum 100 words))
                  यामध्ये संबंधित अधिकारीच्या बलस्थान, कमजोरी, त्यांनी केलेली कामगिरी, महिला व मागासवर्गीयांबाबतचा दृष्टिकोन यांचा समावेश असावा.
                  (Include Strengths and lesser strengths and his attitude towards disabled persons, women and Backward classes)
                </label>

                <textarea
                  rows="5"
                  className={inputCls}
                  value={form.review_overall || ""}
                  onChange={(e) => set("review_overall", e.target.value)}
                />
              </div>

              {/* 4 */}
              <div>
                <label  className={labelCls}>
                  ४. एकत्रित गुणांकन (Overall Gradation) -
                  १ ते १० या मापन गुणांकन द्यावे.
                </label>

                <input
                  className={inputCls}
                  value={form.review_grade || ""}
                  onChange={(e) => set("review_grade", e.target.value)}
                />
              </div>

              {/* Footer */}
              
              <div className="grid grid-cols-2 gap-4 pt-4">

                <div  className={labelCls}>
                  <p>ठिकाण (Place) -</p>
                  <p>दिनांक (Date) -</p>
                </div>


                <div className="text-right">
                  <p className={footerTextCls}>पुनर्विलोकन अधिकाऱ्याची सही, नाव व पदनाम</p>
                  <p className={footerTextCls}>Signature, Name & Designation of Reviewing Officer</p>
                </div>
              </div>

              {/* Bottom Boxes */}
              <div className="grid grid-cols-2 border mt-4 text-xs">
                <div className="border p-2">
                  गोपनीय अहवालाची छायांकित प्रत समक्ष मिळाली,<br />
                  संबंधित अधिकारी/कर्मचारी यांचे नाव व दिनांक स्वाक्षरी
                </div>

                <div className="border p-2">
                  गोपनीय अहवालाची छायांकित प्रत संबंधित अधिकारी/कर्मचारी यांना देण्यात येत आहे.<br />
                  पत्र क्र. - <br />
                  दिनांक - <br />
                  संस्थेच्या अधिकाऱ्याचे नाव, पदनाम व स्वाक्षरी
                </div>
              </div>

              {/* Buttons */}
              {!isViewMode && (
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setActiveSection('reporting')}
                    className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm rounded-xl"
                  >
                    ← मागील पान
                  </button>

                  <button
                    onClick={() => handleSubmit('Completed')}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-xl"
                  >
                    माहिती जतन करा
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppraisalForm;
