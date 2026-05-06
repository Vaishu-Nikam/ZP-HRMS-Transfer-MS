import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import { saveEducationStep5 } from "../../../../../services/employeeService";

// ✅ Simple native select
const SimpleSelect = ({ label, name, value, onChange, options }) => (
  <div>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">निवडा</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      ))}
    </select>
  </div>
);

const yesNo = [
  { id: "होय", name: "होय" },
  { id: "नाही", name: "नाही" },
];

const yesNoNA = [
  { id: "होय", name: "होय" },
  { id: "नाही", name: "नाही" },
  { id: "लागू नाही", name: "लागू नाही" },
];

const mapYesNo = (val) => {
  if (val === "होय") return "yes";
  if (val === "नाही") return "no";
  return "";
};

const OtherExamForm = ({ onNext, onPrev, onCancel, isFirst, isLast, userId }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    computerPassed: "", computerExempted: "", computerPassDate: "",
    computerExemptDate: "", computerInstitute: "", computerCertNo: "",
    computerCert: null,

    marathiTypingPassed: "", marathiTypingExempted: "", marathiTypingSpeed: "",
    marathiTypingPassDate: "", marathiTypingExemptDate: "",
    marathiTypingInstitute: "", marathiTypingCertNo: "", marathiTypingCert: null,

    englishTypingPassed: "", englishTypingExempted: "", englishTypingSpeed: "",
    englishTypingPassDate: "", englishTypingExemptDate: "",
    englishTypingInstitute: "", englishTypingCertNo: "", englishTypingCert: null,

    incrementWithheld: "", recoveryDone: "",

    marathiLangPassed: "", marathiLangExempted: "",
    marathiLangPassDate: "", marathiLangExemptDate: "", marathiLangCert: null,

    hindiLangPassed: "", hindiLangExempted: "",
    hindiLangPassDate: "", hindiLangExemptDate: "", hindiLangCert: null,
  });

  // ✅ Single handler for all inputs & selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ File handler
  const handleFile = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  // ✅ Date handler
  const handleDate = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) { alert("User ID missing"); return; }

      const payload = new FormData();
      payload.append("user_id", String(userId));

      payload.append("computer_passed",       mapYesNo(formData.computerPassed));
      payload.append("computer_exempted",     mapYesNo(formData.computerExempted));
      payload.append("computer_pass_date",    formData.computerPassDate || "");
      payload.append("computer_exempt_date",  formData.computerExemptDate || "");
      payload.append("computer_institution",  formData.computerInstitute || "");
      payload.append("computer_cert_no",      formData.computerCertNo || "");

      payload.append("marathi_typing_passed",      mapYesNo(formData.marathiTypingPassed));
      payload.append("marathi_typing_exempted",    mapYesNo(formData.marathiTypingExempted));
      payload.append("marathi_typing_wpm",         formData.marathiTypingSpeed || "");
      payload.append("marathi_typing_pass_date",   formData.marathiTypingPassDate || "");
      payload.append("marathi_typing_exempt_date", formData.marathiTypingExemptDate || "");
      payload.append("marathi_typing_institution", formData.marathiTypingInstitute || "");
      payload.append("marathi_typing_cert_no",     formData.marathiTypingCertNo || "");

      payload.append("english_typing_passed",      mapYesNo(formData.englishTypingPassed));
      payload.append("english_typing_exempted",    mapYesNo(formData.englishTypingExempted));
      payload.append("english_typing_wpm",         formData.englishTypingSpeed || "");
      payload.append("english_typing_pass_date",   formData.englishTypingPassDate || "");
      payload.append("english_typing_exempt_date", formData.englishTypingExemptDate || "");
      payload.append("english_typing_institution", formData.englishTypingInstitute || "");
      payload.append("english_typing_cert_no",     formData.englishTypingCertNo || "");

      payload.append("increment_withheld_typing", mapYesNo(formData.incrementWithheld));
      payload.append("recovery_done",             mapYesNo(formData.recoveryDone));

      payload.append("marathi_lang_passed",      mapYesNo(formData.marathiLangPassed));
      payload.append("marathi_lang_exempted",    mapYesNo(formData.marathiLangExempted));
      payload.append("marathi_lang_pass_date",   formData.marathiLangPassDate || "");
      payload.append("marathi_lang_exempt_date", formData.marathiLangExemptDate || "");

      payload.append("hindi_lang_passed",      mapYesNo(formData.hindiLangPassed));
      payload.append("hindi_lang_exempted",    mapYesNo(formData.hindiLangExempted));
      payload.append("hindi_lang_pass_date",   formData.hindiLangPassDate || "");
      payload.append("hindi_lang_exempt_date", formData.hindiLangExemptDate || "");

      if (formData.computerCert)     payload.append("computer_exam_cert",   formData.computerCert);
      if (formData.marathiTypingCert) payload.append("marathi_typing_cert", formData.marathiTypingCert);
      if (formData.englishTypingCert) payload.append("english_typing_cert", formData.englishTypingCert);
      if (formData.marathiLangCert)  payload.append("marathi_exam_cert",    formData.marathiLangCert);
      if (formData.hindiLangCert)    payload.append("hindi_exam_cert",      formData.hindiLangCert);

      await saveEducationStep5(payload);
      onNext();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="इतर परीक्षा माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* 🔹 संगणक परीक्षा */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">संगणक परीक्षा</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="संगणक परीक्षा उत्तीर्ण?"
              name="computerPassed" value={formData.computerPassed}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="संगणक परीक्षा सूट?"
              name="computerExempted" value={formData.computerExempted}
              onChange={handleChange} options={yesNoNA} />

            <DatePicker label="उत्तीर्ण दिनांक (dd/MM/yyyy)"
              value={formData.computerPassDate}
              onChange={(v) => handleDate("computerPassDate", v)} />

            <DatePicker label="सूट आदेश दिनांक (dd/MM/yyyy)"
              value={formData.computerExemptDate}
              onChange={(v) => handleDate("computerExemptDate", v)} />

            <Input label="संस्थेचे नाव" name="computerInstitute"
              placeholder="उदा. MS-CIT संस्था"
              value={formData.computerInstitute} onChange={handleChange} />

            <Input label="प्रमाणपत्र क्रमांक" name="computerCertNo"
              placeholder="उदा. CERT12345"
              value={formData.computerCertNo} onChange={handleChange} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">प्रमाणपत्र अपलोड</label>
              <input type="file" accept=".pdf,.jpg,.png"
                onChange={(e) => handleFile("computerCert", e.target.files[0])}
                className="text-sm" />
            </div>

          </div>
        </div>

        {/* 🔹 मराठी टंकलेखन */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">मराठी टंकलेखन</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="मराठी टंकलेखन उत्तीर्ण?"
              name="marathiTypingPassed" value={formData.marathiTypingPassed}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="मराठी टंकलेखन सूट?"
              name="marathiTypingExempted" value={formData.marathiTypingExempted}
              onChange={handleChange} options={yesNoNA} />

            <Input label="मराठी टंकलेखन प्रतिशब्द (wpm)" name="marathiTypingSpeed"
              placeholder="उदा. 30" value={formData.marathiTypingSpeed} onChange={handleChange} />

            <DatePicker label="उत्तीर्ण दिनांक"
              value={formData.marathiTypingPassDate}
              onChange={(v) => handleDate("marathiTypingPassDate", v)} />

            <DatePicker label="सूट आदेश दिनांक"
              value={formData.marathiTypingExemptDate}
              onChange={(v) => handleDate("marathiTypingExemptDate", v)} />

            <Input label="संस्था" name="marathiTypingInstitute"
              placeholder="उदा. Government Institute"
              value={formData.marathiTypingInstitute} onChange={handleChange} />

            <Input label="प्रमाणपत्र क्रमांक" name="marathiTypingCertNo"
              placeholder="उदा. CERT123"
              value={formData.marathiTypingCertNo} onChange={handleChange} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">प्रमाणपत्र अपलोड</label>
              <input type="file" accept=".pdf,.jpg,.png"
                onChange={(e) => handleFile("marathiTypingCert", e.target.files[0])}
                className="text-sm" />
            </div>

          </div>
        </div>

        {/* 🔹 इंग्रजी टंकलेखन */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">इंग्रजी टंकलेखन</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="इंग्रजी टंकलेखन उत्तीर्ण?"
              name="englishTypingPassed" value={formData.englishTypingPassed}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="इंग्रजी टंकलेखन सूट?"
              name="englishTypingExempted" value={formData.englishTypingExempted}
              onChange={handleChange} options={yesNoNA} />

            <Input label="इंग्रजी टंकलेखन प्रतिशब्द (wpm)" name="englishTypingSpeed"
              placeholder="उदा. 40" value={formData.englishTypingSpeed} onChange={handleChange} />

            <DatePicker label="उत्तीर्ण दिनांक"
              value={formData.englishTypingPassDate}
              onChange={(v) => handleDate("englishTypingPassDate", v)} />

            <DatePicker label="सूट आदेश दिनांक"
              value={formData.englishTypingExemptDate}
              onChange={(v) => handleDate("englishTypingExemptDate", v)} />

            <Input label="संस्था" name="englishTypingInstitute"
              placeholder="उदा. Typing Institute"
              value={formData.englishTypingInstitute} onChange={handleChange} />

            <Input label="प्रमाणपत्र क्रमांक" name="englishTypingCertNo"
              placeholder="उदा. CERT456"
              value={formData.englishTypingCertNo} onChange={handleChange} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">प्रमाणपत्र अपलोड</label>
              <input type="file" accept=".pdf,.jpg,.png"
                onChange={(e) => handleFile("englishTypingCert", e.target.files[0])}
                className="text-sm" />
            </div>

          </div>
        </div>

        {/* 🔹 Flags */}
        <div className="bg-slate-50 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">इतर माहिती</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="वेतनवाढ थांबवली आहे का?"
              name="incrementWithheld" value={formData.incrementWithheld}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="वसुली केली आहे का?"
              name="recoveryDone" value={formData.recoveryDone}
              onChange={handleChange} options={yesNo} />

          </div>
        </div>

        {/* 🔹 मराठी भाषा */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">मराठी भाषा</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="मराठी भाषा उत्तीर्ण?"
              name="marathiLangPassed" value={formData.marathiLangPassed}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="मराठी भाषा सूट?"
              name="marathiLangExempted" value={formData.marathiLangExempted}
              onChange={handleChange} options={yesNoNA} />

            <DatePicker label="उत्तीर्ण दिनांक"
              value={formData.marathiLangPassDate}
              onChange={(v) => handleDate("marathiLangPassDate", v)} />

            <DatePicker label="सूट आदेश दिनांक"
              value={formData.marathiLangExemptDate}
              onChange={(v) => handleDate("marathiLangExemptDate", v)} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">प्रमाणपत्र अपलोड</label>
              <input type="file" accept=".pdf,.jpg,.png"
                onChange={(e) => handleFile("marathiLangCert", e.target.files[0])}
                className="text-sm" />
            </div>

          </div>
        </div>

        {/* 🔹 हिंदी भाषा */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">हिंदी भाषा</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SimpleSelect label="हिंदी भाषा उत्तीर्ण?"
              name="hindiLangPassed" value={formData.hindiLangPassed}
              onChange={handleChange} options={yesNo} />

            <SimpleSelect label="हिंदी भाषा सूट?"
              name="hindiLangExempted" value={formData.hindiLangExempted}
              onChange={handleChange} options={yesNoNA} />

            <DatePicker label="उत्तीर्ण दिनांक"
              value={formData.hindiLangPassDate}
              onChange={(v) => handleDate("hindiLangPassDate", v)} />

            <DatePicker label="सूट आदेश दिनांक"
              value={formData.hindiLangExemptDate}
              onChange={(v) => handleDate("hindiLangExemptDate", v)} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">प्रमाणपत्र अपलोड</label>
              <input type="file" accept=".pdf,.jpg,.png"
                onChange={(e) => handleFile("hindiLangCert", e.target.files[0])}
                className="text-sm" />
            </div>

          </div>
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default OtherExamForm;