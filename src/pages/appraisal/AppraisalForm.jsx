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

const SELF_FIELDS = [
  "target_achievement",
  "work_quality",
  "punctuality",
  "initiative",
  "team_work",
  "communication",
];

const NAV_ITEMS = [
  { id: "info", label: "मूलभूत माहिती", icon: User },
  { id: "self", label: "स्व-मूल्यमापन", icon: ClipboardCheck },
  { id: "reporting", label: "Reporting Officer", icon: Star },
  { id: "reviewing", label: "Reviewing Officer", icon: Star },
];

const GRADE_STYLE = {
  Outstanding: {
    text: "text-green-400",
    right: "bg-green-50 border-green-200",
    rtxt: "text-green-700",
  },
  "Very Good": {
    text: "text-blue-400",
    right: "bg-blue-50 border-blue-200",
    rtxt: "text-blue-700",
  },
  Good: {
    text: "text-yellow-400",
    right: "bg-yellow-50 border-yellow-200",
    rtxt: "text-yellow-700",
  },
  Average: {
    text: "text-orange-400",
    right: "bg-orange-50 border-orange-200",
    rtxt: "text-orange-700",
  },
  Poor: {
    text: "text-red-400",
    right: "bg-red-50 border-red-200",
    rtxt: "text-red-700",
  },
  Pending: {
    text: "text-slate-400",
    right: "bg-gray-50 border-gray-200",
    rtxt: "text-gray-500",
  },
};

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
      const data = JSON.parse(localStorage.getItem("appraisals")) || [];
      const found = data.find((a) => String(a.appraisal_id) === String(id));
      if (found) setForm(found);
    }
  }, [id]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const selfTotal = SELF_FIELDS.reduce(
    (s, f) => s + (Number(form[f.key]) || 0),
    0,
  );
  const avgScore = form.reporting_score
    ? Math.round((selfTotal + Number(form.reporting_score)) / 2)
    : selfTotal;
  const autoGrade = GRADE_FROM_SCORE(avgScore);
  const gradeStyle = GRADE_STYLE[autoGrade] || GRADE_STYLE["Pending"];

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
      final_grade: form.reporting_score ? autoGrade : "Pending",
      status,
      appraisal_id: isEdit ? form.appraisal_id : Date.now(),
      created_at: form.created_at || new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("appraisals")) || [];
    const updated = isEdit
      ? existing.map((a) =>
          String(a.appraisal_id) === String(id) ? finalForm : a,
        )
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
      <div className="flex gap-5 items-start">
        {/* ── Left Panel — wider ── */}
        <div className="w-64 shrink-0 bg-slate-800 rounded-2xl p-5 flex flex-col gap-4 sticky top-4">
          {/* Employee */}
          <div className="flex flex-col items-center gap-3 pb-4 border-b border-slate-700">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {empInitials}
            </div>
            {selectedEmp ? (
              <>
                <p className="text-sm font-semibold text-slate-100 text-center leading-tight">
                  {`${selectedEmp.first_name || ""} ${selectedEmp.last_name || ""}`.trim()}
                </p>
                <p className="text-xs text-slate-400">
                  {selectedEmp.employee_code}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500 text-center">
                कर्मचारी निवडा
              </p>
            )}
            <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
              {form.appraisal_year}-{Number(form.appraisal_year) + 1}
            </span>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <NavBtn key={item.id} item={item} />
            ))}
          </div>

          {/* Live Grade */}
          <div className="mt-2 pt-4 border-t border-slate-700">
            

            {/* Mini scores */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-400">{selfTotal}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">स्व-गुण</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-orange-400">
                  {form.reporting_score || "—"}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Reporting</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 min-w-0">
          {/* INFO */}
          {activeSection === "info" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  आस्थापना शाखा / Establishment
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    कर्मचारी नाव / Employee Name
                  </label>
                  <input
                    className={inputCls}
                    value={form.employee_name}
                    onChange={(e) => set("employee_name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    संवर्ग / Cadre
                  </label>
                  <input
                    className={inputCls}
                    value={form.cadre}
                    onChange={(e) => set("cadre", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  जन्मतारीख / DOB
                </label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  पद / Designation
                </label>
                <input
                  className={inputCls}
                  value={form.designation}
                  onChange={(e) => set("designation", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  विभाग / Department
                </label>
                <input
                  className={inputCls}
                  value={form.department}
                  onChange={(e) => set("department", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reporting Officer नाव
                </label>
                <input
                  className={inputCls}
                  value={form.reporting_officer_name}
                  onChange={(e) =>
                    set("reporting_officer_name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reporting Officer पद
                </label>
                <input
                  className={inputCls}
                  value={form.reporting_officer_designation}
                  onChange={(e) =>
                    set("reporting_officer_designation", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reviewing Officer नाव
                </label>
                <input
                  className={inputCls}
                  value={form.reviewing_officer_name}
                  onChange={(e) =>
                    set("reviewing_officer_name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reviewing Officer पद
                </label>
                <input
                  className={inputCls}
                  value={form.reviewing_officer_designation}
                  onChange={(e) =>
                    set("reviewing_officer_designation", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  रजा तपशील / Leave Details
                </label>
                <textarea
                  className={inputCls}
                  value={form.leave_details}
                  onChange={(e) => set("leave_details", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  प्रशिक्षण / Training
                </label>
                <textarea
                  className={inputCls}
                  value={form.training_details}
                  onChange={(e) => set("training_details", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  मालमत्ता निवेदन / Assets Statement
                </label>
                <textarea
                  className={inputCls}
                  value={form.assets_statement}
                  onChange={(e) => set("assets_statement", e.target.value)}
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveSection("self")}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← मागे
                </button>
                <button
                  onClick={() => setActiveSection("self")}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all"
                >
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* SELF */}
          {activeSection === "self" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">
                    स्व-मूल्यमापन
                  </h3>
                </div>
                <div className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full">
                  <span className="text-blue-700 text-base font-bold">
                    {selfTotal}
                  </span>
                  <span className="text-blue-400 text-sm">/100</span>
                </div>
              </div>

              {/* 🔹 NEW FIELDS ADD */}
              <div className="space-y-4">
                <textarea
                  className={inputCls}
                  placeholder="पदावरून अपेक्षित कामाचे विवरण"
                  value={form.job_description}
                  onChange={(e) => set("job_description", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="Allocated Tasks"
                  value={form.allocated_tasks}
                  onChange={(e) => set("allocated_tasks", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="महत्वाची कामे (4-5)"
                  value={form.key_works}
                  onChange={(e) => set("key_works", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="अडचणी"
                  value={form.difficulties}
                  onChange={(e) => set("difficulties", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="Training आवश्यकता"
                  value={form.training_required}
                  onChange={(e) => set("training_required", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="Assets Statement"
                  value={form.self_assets_statement}
                  onChange={(e) => set("self_assets_statement", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveSection("info")}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← मागे
                </button>
                <button
                  onClick={() => setActiveSection("reporting")}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all"
                >
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* REPORTING */}
          {activeSection === "reporting" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  अहवाल देणारे अधिकारी मूल्यमापन
                </h3>
              </div>

              {/* EXISTING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    अधिकाऱ्याचे नाव
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Reporting Officer नाव"
                    value={form.reporting_officer}
                    onChange={(e) => set("reporting_officer", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    गुण (100 पैकी)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={inputCls}
                    placeholder="0-100"
                    value={form.reporting_score}
                    onChange={(e) =>
                      set(
                        "reporting_score",
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                    disabled={isViewMode}
                  />
                  {form.reporting_score ? (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-orange-400 transition-all"
                        style={{ width: `${form.reporting_score}%` }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    टिप्पणी
                  </label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="अधिकाऱ्याची टिप्पणी..."
                    value={form.reporting_remarks}
                    onChange={(e) => set("reporting_remarks", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* 🔹 NEW SECTION 3 FIELDS */}
              <div className="space-y-4">
                {/* Work Completion */}
                <input
                  className={inputCls}
                  placeholder="Work Completion 1"
                  value={form.work_completion_1}
                  onChange={(e) => set("work_completion_1", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Work Completion 2"
                  value={form.work_completion_2}
                  onChange={(e) => set("work_completion_2", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Work Completion 3"
                  value={form.work_completion_3}
                  onChange={(e) => set("work_completion_3", e.target.value)}
                  disabled={isViewMode}
                />

                {/* Personal Attributes */}
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 1"
                  value={form.personal_attr_1}
                  onChange={(e) => set("personal_attr_1", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 2"
                  value={form.personal_attr_2}
                  onChange={(e) => set("personal_attr_2", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 3"
                  value={form.personal_attr_3}
                  onChange={(e) => set("personal_attr_3", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 4"
                  value={form.personal_attr_4}
                  onChange={(e) => set("personal_attr_4", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 5"
                  value={form.personal_attr_5}
                  onChange={(e) => set("personal_attr_5", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Personal Attribute 6"
                  value={form.personal_attr_6}
                  onChange={(e) => set("personal_attr_6", e.target.value)}
                  disabled={isViewMode}
                />

                {/* Efficiency */}
                <input
                  className={inputCls}
                  placeholder="Efficiency 1"
                  value={form.efficiency_1}
                  onChange={(e) => set("efficiency_1", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Efficiency 2"
                  value={form.efficiency_2}
                  onChange={(e) => set("efficiency_2", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Efficiency 3"
                  value={form.efficiency_3}
                  onChange={(e) => set("efficiency_3", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Efficiency 4"
                  value={form.efficiency_4}
                  onChange={(e) => set("efficiency_4", e.target.value)}
                  disabled={isViewMode}
                />
                <input
                  className={inputCls}
                  placeholder="Efficiency 5"
                  value={form.efficiency_5}
                  onChange={(e) => set("efficiency_5", e.target.value)}
                  disabled={isViewMode}
                />

                {/* Other */}
                <textarea
                  className={inputCls}
                  placeholder="Character & Integrity"
                  value={form.character_integrity}
                  onChange={(e) => set("character_integrity", e.target.value)}
                  disabled={isViewMode}
                />

                <textarea
                  className={inputCls}
                  placeholder="Overall Assessment"
                  value={form.overall_assessment}
                  onChange={(e) => set("overall_assessment", e.target.value)}
                  disabled={isViewMode}
                />

                <input
                  className={inputCls}
                  placeholder="State of Health"
                  value={form.state_of_health}
                  onChange={(e) => set("state_of_health", e.target.value)}
                  disabled={isViewMode}
                />

                <input
                  type="number"
                  className={inputCls}
                  placeholder="Overall Gradation (1-10)"
                  value={form.overall_gradation}
                  onChange={(e) => set("overall_gradation", e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveSection("self")}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← मागे
                </button>

                <button
                  onClick={() => setActiveSection("reviewing")}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all"
                >
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* REVIEWING */}
          {activeSection === "reviewing" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  पुनरावलोकन अधिकारी मूल्यमापन
                </h3>
              </div>

              {/* EXISTING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    अधिकाऱ्याचे नाव
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Reviewing Officer नाव"
                    value={form.reviewing_officer}
                    onChange={(e) => set("reviewing_officer", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    गुण (100 पैकी)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={inputCls}
                    placeholder="0-100"
                    value={form.reviewing_score}
                    onChange={(e) =>
                      set(
                        "reviewing_score",
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                    disabled={isViewMode}
                  />
                  {form.reviewing_score ? (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-purple-400 transition-all"
                        style={{ width: `${form.reviewing_score}%` }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    टिप्पणी
                  </label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="पुनरावलोकन अधिकाऱ्याची टिप्पणी..."
                    value={form.reviewing_remarks}
                    onChange={(e) => set("reviewing_remarks", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* 🔹 NEW SECTION 4 FIELDS */}
              <div className="space-y-4">
                {/* Agree with Reporting */}
                <select
                  className={inputCls}
                  value={form.agree_with_reporting}
                  onChange={(e) => set("agree_with_reporting", e.target.value)}
                  disabled={isViewMode}
                >
                  <option value="">Reporting Officer शी सहमत?</option>
                  <option value="yes">होय (Yes)</option>
                  <option value="no">नाही (No)</option>
                </select>

                {/* Overall Assessment */}
                <textarea
                  className={inputCls}
                  placeholder="Overall Assessment"
                  value={form.review_overall_assessment}
                  onChange={(e) =>
                    set("review_overall_assessment", e.target.value)
                  }
                  disabled={isViewMode}
                />

                {/* Overall Gradation */}
                <input
                  type="number"
                  className={inputCls}
                  placeholder="Overall Gradation (1-90)"
                  value={form.review_overall_gradation}
                  onChange={(e) =>
                    set("review_overall_gradation", e.target.value)
                  }
                  disabled={isViewMode}
                />
              </div>

              {!isViewMode && (
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSection("reporting")}
                      className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      ← मागे
                    </button>

                    <button
                      onClick={() => handleSubmit("Draft")}
                      className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Draft Save
                    </button>
                  </div>

                  <button
                    onClick={() => handleSubmit("Completed")}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    Submit करा
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
