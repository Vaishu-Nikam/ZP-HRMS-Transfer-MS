import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const OtherExamForm = (props) => {
  const [formData, setFormData] = useState({
    computerPass: "",
    computerExemption: "",
    computerPassDate: "",
    computerExemptionDate: "",
    computerInstitute: "",
    computerCertNo: "",

    marathiTypingPass: "",
    marathiTypingExemption: "",
    marathiSpeed: "",
    marathiPassDate: "",
    marathiExemptionDate: "",
    marathiInstitute: "",
    marathiCertNo: "",

    englishTypingPass: "",
    englishTypingExemption: "",
    englishSpeed: "",
    englishPassDate: "",
    englishExemptionDate: "",
    englishInstitute: "",
    englishCertNo: "",

    salaryStopped: "",
    recoveryDone: "",

    marathiLangPass: "",
    marathiLangExemption: "",
    marathiLangDate: "",
    marathiLangExemptionDate: "",

    hindiLangPass: "",
    hindiLangExemption: "",
    hindiLangDate: "",
    hindiLangExemptionDate: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const yesNo = ["होय", "नाही"];
  const yesNoNA = ["होय", "नाही", "लागू नाही"];

  return (
    <EmployeeFormCard title="इतर परीक्षेबाबत माहिती" {...props}>
      <div className="space-y-6">

        {/* 🟦 COMPUTER */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-slate-700">
            संगणक परीक्षा
          </h3>

          <select className="input" onChange={(e)=>handleChange("computerPass",e.target.value)}>
            <option>संगणक परीक्षा उत्तीर्ण ?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("computerExemption",e.target.value)}>
            <option>संगणक परीक्षा सूट ?</option>
            {yesNoNA.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("computerPassDate",v)} />
          <DatePicker label="सूट आदेश दिनांक" onChange={(v)=>handleChange("computerExemptionDate",v)} />

          <Input label="संस्थेचे नाव" onChange={(e)=>handleChange("computerInstitute",e.target.value)} />
          <Input label="प्रमाणपत्र क्रमांक" onChange={(e)=>handleChange("computerCertNo",e.target.value)} />
        </div>

        {/* 🟩 MARATHI TYPING */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-slate-700">
            मराठी टंकलेखन
          </h3>

          <select className="input" onChange={(e)=>handleChange("marathiTypingPass",e.target.value)}>
            <option>उत्तीर्ण ?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("marathiTypingExemption",e.target.value)}>
            <option>सूट ?</option>
            {yesNoNA.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <Input label="प्रतिशब्द" onChange={(e)=>handleChange("marathiSpeed",e.target.value)} />
          <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("marathiPassDate",v)} />
          <DatePicker label="सूट दिनांक" onChange={(v)=>handleChange("marathiExemptionDate",v)} />
          <Input label="संस्था" onChange={(e)=>handleChange("marathiInstitute",e.target.value)} />
          <Input label="प्रमाणपत्र क्रमांक" onChange={(e)=>handleChange("marathiCertNo",e.target.value)} />
        </div>

        {/* 🟥 ENGLISH TYPING */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold text-slate-700">
            इंग्रजी टंकलेखन
          </h3>

          <select className="input" onChange={(e)=>handleChange("englishTypingPass",e.target.value)}>
            <option>उत्तीर्ण ?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("englishTypingExemption",e.target.value)}>
            <option>सूट ?</option>
            {yesNoNA.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <Input label="प्रतिशब्द" onChange={(e)=>handleChange("englishSpeed",e.target.value)} />
          <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("englishPassDate",v)} />
          <DatePicker label="सूट दिनांक" onChange={(v)=>handleChange("englishExemptionDate",v)} />
          <Input label="संस्था" onChange={(e)=>handleChange("englishInstitute",e.target.value)} />
          <Input label="प्रमाणपत्र क्रमांक" onChange={(e)=>handleChange("englishCertNo",e.target.value)} />
        </div>

        {/* 🟨 OTHER FLAGS */}
        <div className="grid grid-cols-2 gap-4">
          <select className="input" onChange={(e)=>handleChange("salaryStopped",e.target.value)}>
            <option>वेतनवाढ थांबवली आहे का?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("recoveryDone",e.target.value)}>
            <option>वसुली केली आहे का?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>
        </div>

        {/* 🟦 MARATHI LANGUAGE */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">मराठी भाषा</h3>

          <select className="input" onChange={(e)=>handleChange("marathiLangPass",e.target.value)}>
            <option>उत्तीर्ण ?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("marathiLangExemption",e.target.value)}>
            <option>सूट ?</option>
            {yesNoNA.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("marathiLangDate",v)} />
          <DatePicker label="सूट आदेश दिनांक" onChange={(v)=>handleChange("marathiLangExemptionDate",v)} />
        </div>

        {/* 🟥 HINDI LANGUAGE */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">हिंदी भाषा</h3>

          <select className="input" onChange={(e)=>handleChange("hindiLangPass",e.target.value)}>
            <option>उत्तीर्ण ?</option>
            {yesNo.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <select className="input" onChange={(e)=>handleChange("hindiLangExemption",e.target.value)}>
            <option>सूट ?</option>
            {yesNoNA.map((o,i)=><option key={i}>{o}</option>)}
          </select>

          <DatePicker label="उत्तीर्ण दिनांक" onChange={(v)=>handleChange("hindiLangDate",v)} />
          <DatePicker label="सूट आदेश दिनांक" onChange={(v)=>handleChange("hindiLangExemptionDate",v)} />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default OtherExamForm;