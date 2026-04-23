import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const OtherExamForm = (props) => {

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const yesNoNA = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
    { id: "लागू नाही", name: "लागू नाही" },
  ];

  return (
    <EmployeeFormCard title="इतर परीक्षेबाबत माहिती" {...props}>

      <div className="space-y-6">

        {/* 🔹 COMPUTER */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

          <h3 className="text-sm font-semibold text-slate-700">
            संगणक परीक्षा
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">संगणक परीक्षा उत्तीर्ण ?</label>
              <DropdownSearch options={yesNo} onChange={(e)=>handleChange("computerPass", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">संगणक परीक्षा सूट ?</label>
              <DropdownSearch options={yesNoNA} onChange={(e)=>handleChange("computerExemption", e.target.value)} />
            </div>

            <DatePicker label="उत्तीर्ण दिनांक (dd/MM/yyyy)" onChange={(v)=>handleChange("computerPassDate", v)} />
            <DatePicker label="सूट आदेश दिनांक (dd/MM/yyyy)" onChange={(v)=>handleChange("computerExemptionDate", v)} />

            <Input label="संस्थेचे नाव" placeholder="उदा. MS-CIT संस्था" onChange={(e)=>handleChange("computerInstitute", e.target.value)} />
            <Input label="प्रमाणपत्र क्रमांक" placeholder="उदा. CERT12345" onChange={(e)=>handleChange("computerCertNo", e.target.value)} />

          </div>
        </div>

        {/* 🔹 MARATHI TYPING */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

          <h3 className="text-sm font-semibold text-slate-700">
            मराठी टंकलेखन
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <DropdownSearch options={yesNo} onChange={(e)=>handleChange("marathiTypingPass", e.target.value)} />
            <DropdownSearch options={yesNoNA} onChange={(e)=>handleChange("marathiTypingExemption", e.target.value)} />

            <Input label="मराठी टंकलेखन प्रतिशब्द" placeholder="उदा. 30 wpm" onChange={(e)=>handleChange("marathiSpeed", e.target.value)} />

            <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("marathiPassDate", v)} />
            <DatePicker label="सूट आदेश दिनांक" onChange={(v)=>handleChange("marathiExemptionDate", v)} />

            <Input label="संस्था" placeholder="उदा. Government Institute" onChange={(e)=>handleChange("marathiInstitute", e.target.value)} />
            <Input label="प्रमाणपत्र क्रमांक" placeholder="उदा. CERT123" onChange={(e)=>handleChange("marathiCertNo", e.target.value)} />

          </div>
        </div>

        {/* 🔹 ENGLISH TYPING */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

          <h3 className="text-sm font-semibold text-slate-700">
            इंग्रजी टंकलेखन
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <DropdownSearch options={yesNo} onChange={(e)=>handleChange("englishTypingPass", e.target.value)} />
            <DropdownSearch options={yesNoNA} onChange={(e)=>handleChange("englishTypingExemption", e.target.value)} />

            <Input label="इंग्रजी टंकलेखन प्रतिशब्द" placeholder="उदा. 40 wpm" onChange={(e)=>handleChange("englishSpeed", e.target.value)} />

            <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("englishPassDate", v)} />
            <DatePicker label="सूट आदेश दिनांक" onChange={(v)=>handleChange("englishExemptionDate", v)} />

            <Input label="संस्था" placeholder="उदा. Typing Institute" onChange={(e)=>handleChange("englishInstitute", e.target.value)} />
            <Input label="प्रमाणपत्र क्रमांक" placeholder="उदा. CERT456" onChange={(e)=>handleChange("englishCertNo", e.target.value)} />

          </div>
        </div>

        {/* 🔹 FLAGS */}
        <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm">

          <DropdownSearch options={yesNo} onChange={(e)=>handleChange("salaryStopped", e.target.value)} placeholder="वेतनवाढ थांबवली आहे का?" />

          <DropdownSearch options={yesNo} onChange={(e)=>handleChange("recoveryDone", e.target.value)} placeholder="वसुली केली आहे का?" />

        </div>

        {/* 🔹 LANGUAGE */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

          <h3 className="text-sm font-semibold">मराठी भाषा</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropdownSearch options={yesNo} />
            <DropdownSearch options={yesNoNA} />
            <DatePicker label="उत्तीर्ण दिनांक" />
            <DatePicker label="सूट आदेश दिनांक" />
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

          <h3 className="text-sm font-semibold">हिंदी भाषा</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropdownSearch options={yesNo} />
            <DropdownSearch options={yesNoNA} />
            <DatePicker label="उत्तीर्ण दिनांक" />
            <DatePicker label="सूट आदेश दिनांक" />
          </div>
        </div>

      </div>

    </EmployeeFormCard>
  );
};

export default OtherExamForm;