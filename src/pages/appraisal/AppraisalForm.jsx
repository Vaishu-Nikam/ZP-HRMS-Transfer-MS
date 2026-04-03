// src/pages/appraisal/AppraisalForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, Star, User, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const GRADE_FROM_SCORE = (score) => {
  if (!score) return 'Pending';
  if (score >= 90) return 'Outstanding';
  if (score >= 75) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 45) return 'Average';
  return 'Poor';
};

const SELF_FIELDS = [
  { key: 'target_achievement', label: 'लक्ष्य साध्य',        max: 20 },
  { key: 'work_quality',       label: 'कामाचा दर्जा',        max: 20 },
  { key: 'punctuality',        label: 'वेळपालन / उपस्थिती',  max: 15 },
  { key: 'initiative',         label: 'पुढाकार / नावीन्य',    max: 15 },
  { key: 'team_work',          label: 'सांघिक कार्य',        max: 15 },
  { key: 'communication',      label: 'संवाद कौशल्य',        max: 15 },
];

const NAV_ITEMS = [
  { id: 'info',      label: 'मूलभूत माहिती',    icon: User           },
  { id: 'self',      label: 'स्व-मूल्यमापन',    icon: ClipboardCheck  },
  { id: 'reporting', label: 'Reporting Officer',  icon: Star           },
  { id: 'reviewing', label: 'Reviewing Officer',  icon: Star           },
];

const GRADE_STYLE = {
  'Outstanding': { text: 'text-green-400',  right: 'bg-green-50 border-green-200',  rtxt: 'text-green-700'  },
  'Very Good':   { text: 'text-blue-400',   right: 'bg-blue-50 border-blue-200',    rtxt: 'text-blue-700'   },
  'Good':        { text: 'text-yellow-400', right: 'bg-yellow-50 border-yellow-200', rtxt: 'text-yellow-700' },
  'Average':     { text: 'text-orange-400', right: 'bg-orange-50 border-orange-200', rtxt: 'text-orange-700' },
  'Poor':        { text: 'text-red-400',    right: 'bg-red-50 border-red-200',      rtxt: 'text-red-700'    },
  'Pending':     { text: 'text-slate-400',  right: 'bg-gray-50 border-gray-200',    rtxt: 'text-gray-500'   },
};

const inputCls = `w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all`;

const ScoreInput = ({ label, max, value, onChange, disabled }) => {
  const pct = value ? Math.round((Number(value) / max) * 100) : 0;
  const barColor = pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-orange-400';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-400 font-medium">/{max}</span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number" min="0" max={max}
          className={`w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm text-center font-semibold
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
          value={value || ''}
          onChange={e => onChange(Math.min(max, Math.max(0, Number(e.target.value))))}
          disabled={disabled}
        />
        <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div className={`h-2.5 rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${pct}%` }} />
        </div>
        <span className="text-sm font-semibold text-gray-600 w-10 text-right">{pct}%</span>
      </div>
    </div>
  );
};

const AppraisalForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id }   = useParams();
  const isEdit   = !!id;

  const [activeSection, setActiveSection] = useState('info');
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: '', appraisal_year: CURRENT_YEAR,
    target_achievement: '', work_quality: '', punctuality: '',
    initiative: '', team_work: '', communication: '',
    self_remarks: '',
    reporting_officer: '', reporting_score: '', reporting_remarks: '',
    reviewing_officer: '', reviewing_score: '', reviewing_remarks: '',
    final_grade: '', status: 'Draft',
  });

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
    if (isEdit) {
      const data  = JSON.parse(localStorage.getItem('appraisals')) || [];
      const found = data.find(a => String(a.appraisal_id) === String(id));
      if (found) setForm(found);
    }
  }, [id]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const selfTotal  = SELF_FIELDS.reduce((s, f) => s + (Number(form[f.key]) || 0), 0);
  const avgScore   = form.reporting_score
    ? Math.round((selfTotal + Number(form.reporting_score)) / 2)
    : selfTotal;
  const autoGrade  = GRADE_FROM_SCORE(avgScore);
  const gradeStyle = GRADE_STYLE[autoGrade] || GRADE_STYLE['Pending'];

  const selectedEmp = employees.find(e => String(e.employee_id) === String(form.employee_id));
  const empInitials = selectedEmp
    ? `${(selectedEmp.first_name || '')[0] || ''}${(selectedEmp.last_name || '')[0] || ''}`
    : '?';

  const handleSubmit = (status) => {
    if (!form.employee_id) { toast.error('कर्मचारी निवडा'); setActiveSection('info'); return; }

    const finalForm = {
      ...form,
      self_score:  selfTotal,
      final_grade: form.reporting_score ? autoGrade : 'Pending',
      status,
      appraisal_id: isEdit ? form.appraisal_id : Date.now(),
      created_at:   form.created_at || new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('appraisals')) || [];
    const updated  = isEdit
      ? existing.map(a => String(a.appraisal_id) === String(id) ? finalForm : a)
      : [...existing, finalForm];

    localStorage.setItem('appraisals', JSON.stringify(updated));
    toast.success(isEdit ? 'APR अपडेट झाला! ✅' : 'APR तयार झाला! ✅');
    navigate('/appraisal');
  };

  const NavBtn = ({ item }) => (
    <button
      onClick={() => setActiveSection(item.id)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
        ${activeSection === item.id
          ? 'bg-slate-600 text-white'
          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      {item.label}
    </button>
  );

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/appraisal')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isViewMode ? 'APR अहवाल' : isEdit ? 'APR संपादन' : 'नवीन APR'}
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
                  {`${selectedEmp.first_name || ''} ${selectedEmp.last_name || ''}`.trim()}
                </p>
                <p className="text-xs text-slate-400">{selectedEmp.employee_code}</p>
              </>
            ) : (
              <p className="text-sm text-slate-500 text-center">कर्मचारी निवडा</p>
            )}
            <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
              {form.appraisal_year}-{Number(form.appraisal_year) + 1}
            </span>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map(item => <NavBtn key={item.id} item={item} />)}
          </div>

          {/* Live Grade */}
          <div className="mt-2 pt-4 border-t border-slate-700">
            <div className="bg-slate-900 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Award className="w-4 h-4 text-slate-500" />
                <span className="text-xs text-slate-500 font-medium tracking-wide">LIVE GRADE</span>
              </div>
              <p className={`text-1xl font-bold ${gradeStyle.text}`}>{autoGrade}</p>
              <p className="text-xs text-slate-500 mt-1">{avgScore}/100</p>
              <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${avgScore}%` }} />
              </div>
            </div>

            {/* Mini scores */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-400">{selfTotal}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">स्व-गुण</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-orange-400">{form.reporting_score || '—'}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Reporting</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 min-w-0">

          {/* INFO */}
          {activeSection === 'info' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">मूलभूत माहिती</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    कर्मचारी <span className="text-red-500">*</span>
                  </label>
                  <select className={inputCls} value={form.employee_id}
                    onChange={e => set('employee_id', e.target.value)} disabled={isViewMode}>
                    <option value="">— निवडा —</option>
                    {employees.map(e => (
                      <option key={e.employee_id} value={e.employee_id}>
                        {e.employee_code} — {e.first_name} {e.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    वर्ष <span className="text-red-500">*</span>
                  </label>
                  <select className={inputCls} value={form.appraisal_year}
                    onChange={e => set('appraisal_year', e.target.value)} disabled={isViewMode}>
                    {YEARS.map(y => (
                      <option key={y} value={y}>{y}-{y + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setActiveSection('self')}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all">
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* SELF */}
          {activeSection === 'self' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">स्व-मूल्यमापन</h3>
                </div>
                <div className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full">
                  <span className="text-blue-700 text-base font-bold">{selfTotal}</span>
                  <span className="text-blue-400 text-sm">/100</span>
                </div>
              </div>

              {/* Total Progress */}
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full transition-all duration-500
                  ${selfTotal >= 75 ? 'bg-green-500' : selfTotal >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
                  style={{ width: `${selfTotal}%` }} />
              </div>

              <div className="space-y-5">
                {SELF_FIELDS.map(f => (
                  <ScoreInput key={f.key} label={f.label} max={f.max}
                    value={form[f.key]} onChange={v => set(f.key, v)} disabled={isViewMode} />
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                  स्व-टिप्पणी
                </label>
                <textarea className={`${inputCls} resize-none`} rows={3}
                  placeholder="आपल्या कामाबद्दल टिप्पणी..."
                  value={form.self_remarks}
                  onChange={e => set('self_remarks', e.target.value)}
                  disabled={isViewMode} />
              </div>

              <div className="flex justify-between pt-2">
                <button onClick={() => setActiveSection('info')}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
                  ← मागे
                </button>
                <button onClick={() => setActiveSection('reporting')}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all">
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* REPORTING */}
          {activeSection === 'reporting' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">अहवाल देणारे अधिकारी मूल्यमापन</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    अधिकाऱ्याचे नाव
                  </label>
                  <input className={inputCls} placeholder="Reporting Officer नाव"
                    value={form.reporting_officer}
                    onChange={e => set('reporting_officer', e.target.value)}
                    disabled={isViewMode} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    गुण (100 पैकी)
                  </label>
                  <input type="number" min="0" max="100" className={inputCls} placeholder="0-100"
                    value={form.reporting_score}
                    onChange={e => set('reporting_score', Math.min(100, Math.max(0, Number(e.target.value))))}
                    disabled={isViewMode} />
                  {form.reporting_score ? (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full bg-orange-400 transition-all"
                        style={{ width: `${form.reporting_score}%` }} />
                    </div>
                  ) : null}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    टिप्पणी
                  </label>
                  <textarea className={`${inputCls} resize-none`} rows={3}
                    placeholder="अधिकाऱ्याची टिप्पणी..."
                    value={form.reporting_remarks}
                    onChange={e => set('reporting_remarks', e.target.value)}
                    disabled={isViewMode} />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button onClick={() => setActiveSection('self')}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
                  ← मागे
                </button>
                <button onClick={() => setActiveSection('reviewing')}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all">
                  पुढे →
                </button>
              </div>
            </div>
          )}

          {/* REVIEWING */}
          {activeSection === 'reviewing' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">पुनरावलोकन अधिकारी मूल्यमापन</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    अधिकाऱ्याचे नाव
                  </label>
                  <input className={inputCls} placeholder="Reviewing Officer नाव"
                    value={form.reviewing_officer}
                    onChange={e => set('reviewing_officer', e.target.value)}
                    disabled={isViewMode} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    गुण (100 पैकी)
                  </label>
                  <input type="number" min="0" max="100" className={inputCls} placeholder="0-100"
                    value={form.reviewing_score}
                    onChange={e => set('reviewing_score', Math.min(100, Math.max(0, Number(e.target.value))))}
                    disabled={isViewMode} />
                  {form.reviewing_score ? (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full bg-purple-400 transition-all"
                        style={{ width: `${form.reviewing_score}%` }} />
                    </div>
                  ) : null}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    टिप्पणी
                  </label>
                  <textarea className={`${inputCls} resize-none`} rows={3}
                    placeholder="पुनरावलोकन अधिकाऱ्याची टिप्पणी..."
                    value={form.reviewing_remarks}
                    onChange={e => set('reviewing_remarks', e.target.value)}
                    disabled={isViewMode} />
                </div>
              </div>

              {/* Final Grade Preview */}
              <div className={`rounded-2xl border p-5 flex items-center justify-between ${gradeStyle.right}`}>
                <div>
                  <p className="text-sm text-gray-500 mb-1">अंतिम Grade (auto-calculated)</p>
                  <p className="text-xs text-gray-400">
                    स्व: {selfTotal} &nbsp;|&nbsp;
                    Reporting: {form.reporting_score || '—'} &nbsp;|&nbsp;
                    सरासरी: {avgScore}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${gradeStyle.rtxt}`}>{autoGrade}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{avgScore}/100</p>
                </div>
              </div>

              {!isViewMode && (
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <button onClick={() => setActiveSection('reporting')}
                      className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
                      ← मागे
                    </button>
                    <button onClick={() => handleSubmit('Draft')}
                      className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
                      Draft Save
                    </button>
                  </div>
                  <button onClick={() => handleSubmit('Completed')}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all">
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