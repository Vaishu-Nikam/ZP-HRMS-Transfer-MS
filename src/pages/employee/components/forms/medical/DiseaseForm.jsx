import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveMedicalStep1 } from "../../../../../services/employeeService";

const DiseaseForm = ({ onNext, onPrev, onCancel, isFirst, isLast, userId }) => {
  const [records, setRecords] = useState([
    { disease: "", fromDate: "", toDate: "", remark: "" },
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

  const [loading, setLoading] = useState(false);

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

  // 🔥 SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      if (!userId) return;

      setLoading(true);

      const payload = {
        user_id: userId,

        has_brain_thalassemia_child:
          medical.brainDiseaseParent === "होय" ? "true" : "false",

        has_chromosomal_disorder_child:
          medical.geneticDiseaseParent === "होय" ? "true" : "false",

        has_paralysis: medical.paralysis === "होय" ? "true" : "false",

        has_mentally_disabled_child:
          medical.disabledChildParent === "होय" ? "true" : "false",

        has_kidney_dialysis: medical.kidneyIssue === "होय" ? "true" : "false",

        has_cancer: medical.cancer === "होय" ? "true" : "false",

        is_veteran_spouse_widow:
          medical.exServicemanWidow === "होय" ? "true" : "false",

        is_abandoned_divorced_woman:
          medical.divorcedFemale === "होय" ? "true" : "false",

        other_conditions: medical.otherDisease || "",
      };

      console.log("MEDICAL PAYLOAD:", payload);

      await saveMedicalStep1(payload);

      onNext();
    } catch (err) {
      console.error("Medical API Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="आजार माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
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

        {/* 🔹 Medical Conditions */}
        <div className="grid grid-cols-2 gap-4">
          <DropdownSearch
            value={medical.brainDiseaseParent}
            onChange={(e) =>
              handleMedical("brainDiseaseParent", e.target.value)
            }
            options={yesNo}
            placeholder="मेंदूचा आजार/थॅलेसेमिया मुलांचे पालक?"
          />

          <DropdownSearch
            value={medical.geneticDiseaseParent}
            onChange={(e) =>
              handleMedical("geneticDiseaseParent", e.target.value)
            }
            options={yesNo}
            placeholder="गुणसूत्र दोष मुलांचे पालक?"
          />

          <DropdownSearch
            value={medical.paralysis}
            onChange={(e) => handleMedical("paralysis", e.target.value)}
            options={yesNo}
            placeholder="पक्षघात आहे का?"
          />

          <DropdownSearch
            value={medical.disabledChildParent}
            onChange={(e) =>
              handleMedical("disabledChildParent", e.target.value)
            }
            options={yesNo}
            placeholder="अपंग मुलांचे पालक?"
          />

          <DropdownSearch
            value={medical.kidneyIssue}
            onChange={(e) => handleMedical("kidneyIssue", e.target.value)}
            options={yesNo}
            placeholder="किडनी समस्या?"
          />

          <DropdownSearch
            value={medical.cancer}
            onChange={(e) => handleMedical("cancer", e.target.value)}
            options={yesNo}
            placeholder="कर्करोग आहे का?"
          />

          <DropdownSearch
            value={medical.exServicemanWidow}
            onChange={(e) => handleMedical("exServicemanWidow", e.target.value)}
            options={yesNo}
            placeholder="माजी सैनिक/विधवा?"
          />

          <DropdownSearch
            value={medical.divorcedFemale}
            onChange={(e) => handleMedical("divorcedFemale", e.target.value)}
            options={yesNo}
            placeholder="घटस्फोटीत महिला?"
          />

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
