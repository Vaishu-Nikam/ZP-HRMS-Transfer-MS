// src/pages/appraisal/AppraisalView.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, User, ClipboardCheck, Star, Award } from 'lucide-react';

const GRADE_COLOR = {
  'Outstanding': { text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200' },
  'Very Good':   { text: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200'  },
  'Good':        { text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200'},
  'Average':     { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200'},
  'Poor':        { text: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200'   },
  'Pending':     { text: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200'  },
};

const SELF_FIELDS = [
  { key: 'target_achievement', label: 'लक्ष्य साध्य',          max: 20 },
  { key: 'work_quality',       label: 'कामाचा दर्जा',          max: 20 },
  { key: 'punctuality',        label: 'वेळपालन / उपस्थिती',    max: 15 },
  { key: 'initiative',         label: 'पुढाकार / नावीन्य',      max: 15 },
  { key: 'team_work',          label: 'सांघिक कार्य',          max: 15 },
  { key: 'communication',      label: 'संवाद कौशल्य',          max: 15 },
];

const ScoreBar = ({ label, value, max }) => {
  const pct = value ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-40 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all
            ${pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-12 text-right">
        {value || 0}/{max}
      </span>
    </div>
  );
};

const Section = ({ icon: Icon, title, color, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className={`flex items-center gap-2 px-5 py-3 border-b border-gray-100 ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-semibold">{title}</span>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between py-1.5 border-b border-gray-50 last:border-0">
    <span className="text-xs text-gray-500 w-40 shrink-0">{label}</span>
    <span className="text-xs font-medium text-gray-800 text-right">{value || '-'}</span>
  </div>
);

const AppraisalView = () => {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const [appraisal, setAppraisal] = useState(null);
  const [employee,  setEmployee]  = useState(null);

  useEffect(() => {
    const appraisals = JSON.parse(localStorage.getItem('appraisals')) || [];
    const found = appraisals.find(a => String(a.appraisal_id) === String(id));
    if (!found) { navigate('/appraisal'); return; }
    setAppraisal(found);

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const emp = employees.find(e => String(e.employee_id) === String(found.employee_id));
    setEmployee(emp);
  }, [id]);

  if (!appraisal) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const grade      = appraisal.final_grade || 'Pending';
  const gradeStyle = GRADE_COLOR[grade] || GRADE_COLOR['Pending'];
  const selfTotal  = SELF_FIELDS.reduce((s, f) => s + (Number(appraisal[f.key]) || 0), 0);

  return (
    <div className="max-w-3xl mx-auto space-y-4 print:space-y-3">

      {/* ── Header ── */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/appraisal')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">APR अहवाल</h1>
            <p className="text-xs text-gray-500">वार्षिक कार्यमूल्यमापन अहवाल</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/appraisal/edit/${id}`)}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            संपादन
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>

      {/* ── Print Header (only visible on print) ── */}
      <div className="hidden print:block text-center border-b border-gray-300 pb-3 mb-3">
        <h1 className="text-xl font-bold">जिल्हा परिषद</h1>
        <p className="text-sm">वार्षिक कार्यमूल्यमापन अहवाल (APR)</p>
        <p className="text-xs text-gray-500">वर्ष: {appraisal.appraisal_year}-{Number(appraisal.appraisal_year) + 1}</p>
      </div>

      {/* ── Grade Banner ── */}
      <div className={`rounded-xl border p-5 flex items-center justify-between ${gradeStyle.bg} ${gradeStyle.border}`}>
        <div>
          <p className="text-xs text-gray-500 mb-1">अंतिम Grade</p>
          <p className={`text-3xl font-bold ${gradeStyle.text}`}>{grade}</p>
          <p className="text-xs text-gray-400 mt-1">
            स्व: {selfTotal}/100 &nbsp;|&nbsp;
            Reporting: {appraisal.reporting_score || '-'}/100 &nbsp;|&nbsp;
            सरासरी: {appraisal.self_score || selfTotal}/100
          </p>
        </div>
        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${gradeStyle.border}`}>
          <Award className={`w-8 h-8 ${gradeStyle.text}`} />
        </div>
      </div>

      {/* ── Employee Info ── */}
      <Section icon={User} title="कर्मचारी माहिती" color="bg-gray-50 text-gray-700">
        <div className="grid grid-cols-2 gap-x-8">
          <Row label="कर्मचारी कोड"   value={employee?.employee_code} />
          <Row label="पूर्ण नाव"       value={employee ? `${employee.first_name || ''} ${employee.middle_name || ''} ${employee.last_name || ''}`.trim() : '-'} />
          <Row label="पदनाम"          value={employee?.designation_id} />
          <Row label="विभाग"           value={employee?.department_id} />
          <Row label="मूल्यमापन वर्ष"   value={`${appraisal.appraisal_year}-${Number(appraisal.appraisal_year) + 1}`} />
          <Row label="स्थिती"          value={appraisal.status} />
        </div>
      </Section>

      {/* ── Self Appraisal ── */}
      <Section icon={ClipboardCheck} title="स्व-मूल्यमापन" color="bg-blue-50 text-blue-700">
        <div className="space-y-3 mb-4">
          {SELF_FIELDS.map(f => (
            <ScoreBar key={f.key} label={f.label} value={appraisal[f.key]} max={f.max} />
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-semibold text-gray-700">एकूण स्व-गुण</span>
          <span className="text-xl font-bold text-blue-600">{selfTotal}<span className="text-sm text-gray-400 font-normal">/100</span></span>
        </div>
        {appraisal.self_remarks && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 font-medium">स्व-टिप्पणी:</p>
            <p className="text-sm text-gray-700">{appraisal.self_remarks}</p>
          </div>
        )}
      </Section>

      {/* ── Reporting Officer ── */}
      <Section icon={Star} title="अहवाल देणारे अधिकारी मूल्यमापन" color="bg-orange-50 text-orange-700">
        <div className="grid grid-cols-2 gap-x-8 mb-3">
          <Row label="अधिकाऱ्याचे नाव" value={appraisal.reporting_officer} />
          <Row label="दिलेले गुण" value={appraisal.reporting_score ? `${appraisal.reporting_score}/100` : '-'} />
        </div>
        {appraisal.reporting_score && (
          <div className="mb-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-orange-400 transition-all"
                  style={{ width: `${appraisal.reporting_score}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-orange-600 w-10">{appraisal.reporting_score}%</span>
            </div>
          </div>
        )}
        {appraisal.reporting_remarks && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 font-medium">टिप्पणी:</p>
            <p className="text-sm text-gray-700">{appraisal.reporting_remarks}</p>
          </div>
        )}
      </Section>

      {/* ── Reviewing Officer ── */}
      <Section icon={Star} title="पुनरावलोकन अधिकारी मूल्यमापन" color="bg-purple-50 text-purple-700">
        <div className="grid grid-cols-2 gap-x-8 mb-3">
          <Row label="अधिकाऱ्याचे नाव" value={appraisal.reviewing_officer} />
          <Row label="दिलेले गुण" value={appraisal.reviewing_score ? `${appraisal.reviewing_score}/100` : '-'} />
        </div>
        {appraisal.reviewing_score && (
          <div className="mb-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-purple-400 transition-all"
                  style={{ width: `${appraisal.reviewing_score}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-purple-600 w-10">{appraisal.reviewing_score}%</span>
            </div>
          </div>
        )}
        {appraisal.reviewing_remarks && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 font-medium">टिप्पणी:</p>
            <p className="text-sm text-gray-700">{appraisal.reviewing_remarks}</p>
          </div>
        )}
      </Section>

      {/* ── Signature Block (Print only) ── */}
      <div className="hidden print:grid grid-cols-3 gap-8 pt-8 mt-8 border-t border-gray-300">
        {['कर्मचारी', 'अहवाल देणारे अधिकारी', 'पुनरावलोकन अधिकारी'].map(s => (
          <div key={s} className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-12">
              <p className="text-xs text-gray-600">{s}</p>
              <p className="text-xs text-gray-400">स्वाक्षरी व दिनांक</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AppraisalView;