import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const DiseaseForm = (props) => {

  const [records, setRecords] = useState([
    { disease: "", fromDate: "", toDate: "", remark: "" }
  ]);

  const [medical, setMedical] = useState({
    brainDiseaseParent: "",
    geneticDiseaseParent: "",
    paralysis: "",
    disabledChildParent: "",
    kidneyIssue: "",
    cancer: "",
    exServicemanWidow: "",
    divorcedFemale: "",
    otherDisease: "",
  });

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleMedical = (field, value) => {
    setMedical({ ...medical, [field]: value });
  };

  return (
    <EmployeeFormCard title="आजार माहिती" {...props}>
      <div className="space-y-6">

        {/* 🔹 Disease Fields */}
        {records.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-4">

            <Input
              label="आजाराचे नाव"
              value={r.disease}
              onChange={(e) => handleChange(i, "disease", e.target.value)}
            />

            <DatePicker
              label="पासून"
              value={r.fromDate}
              onChange={(val) => handleChange(i, "fromDate", val)}
            />

            <DatePicker
              label="पर्यंत"
              value={r.toDate}
              onChange={(val) => handleChange(i, "toDate", val)}
            />

            <Input
              label="शेरा"
              value={r.remark}
              onChange={(e) => handleChange(i, "remark", e.target.value)}
            />

          </div>
        ))}

        {/* 🔹 Section 34 Fields */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              मेंदूचा आजार/थॅलेसेमिया मुलांचे पालक आहात का?
            </label>
            <DropdownSearch
              value={medical.brainDiseaseParent}
              onChange={(e) => handleMedical("brainDiseaseParent", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              गुणसूत्र दोष असलेल्या मुलांचे पालक आहात का?
            </label>
            <DropdownSearch
              value={medical.geneticDiseaseParent}
              onChange={(e) => handleMedical("geneticDiseaseParent", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              पक्षघाताने आजारी आहात का?
            </label>
            <DropdownSearch
              value={medical.paralysis}
              onChange={(e) => handleMedical("paralysis", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              मतीमंद/अपंग मुलांचे पालक आहात का?
            </label>
            <DropdownSearch
              value={medical.disabledChildParent}
              onChange={(e) => handleMedical("disabledChildParent", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              किडनी/डायलिसिस समस्या आहे का?
            </label>
            <DropdownSearch
              value={medical.kidneyIssue}
              onChange={(e) => handleMedical("kidneyIssue", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              कर्करोग आहे का?
            </label>
            <DropdownSearch
              value={medical.cancer}
              onChange={(e) => handleMedical("cancer", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              माजी सैनिक/विधवा आहात का?
            </label>
            <DropdownSearch
              value={medical.exServicemanWidow}
              onChange={(e) => handleMedical("exServicemanWidow", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              घटस्फोटीत महिला कर्मचारी आहात का?
            </label>
            <DropdownSearch
              value={medical.divorcedFemale}
              onChange={(e) => handleMedical("divorcedFemale", e.target.value)}
              options={yesNo}
              placeholder="निवडा"
            />
          </div>

          <Input
            label="इतर आजार"
            value={medical.otherDisease}
            onChange={(e) => handleMedical("otherDisease", e.target.value)}
          />

        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default DiseaseForm;