import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";


const PersonalPart3Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    retirementDate: "",
    joiningDate: "",
    currentOfficeJoinDate: "",
    sevaarthNo: "",
    shaalarthNo: "",
    exactHeight: "",
    bodyMark: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 3"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* सेवानिवृत्ती दिनांक */}
        <DatePicker
          label="सेवानिवृत्ती दिनांक"
          value={formData.retirementDate}
          onChange={(val) => handleChange("retirementDate", val)}
          placeholder="dd/MM/yyyy"
        />

        {/* शासकीय सेवेत रुजू होण्याचा दिनांक */}
        <DatePicker
          label="शासकीय सेवेत रुजू होण्याचा दिनांक"
          value={formData.joiningDate}
          onChange={(val) => handleChange("joiningDate", val)}
          placeholder="dd/MM/yyyy"
        />

        {/* सध्याच्या कार्यालयात रुजू होण्याचा दिनांक */}
        <DatePicker
          label="सध्याच्या कार्यालयात रुजू होण्याचा दिनांक"
          value={formData.currentOfficeJoinDate}
          onChange={(val) =>
            handleChange("currentOfficeJoinDate", val)
          }
          placeholder="dd/MM/yyyy"
        />

        {/* सेवार्थ क्रमांक */}
        <Input
          label="सेवार्थ क्रमांक (असल्यास)"
          placeholder="Enter Sevaarth Number"
          value={formData.sevaarthNo}
          onChange={(e) =>
            handleChange("sevaarthNo", e.target.value)
          }
        />

        {/* शालार्थ क्रमांक */}
        <Input
          label="शालार्थ क्रमांक (असल्यास)"
          placeholder="Enter Shaalarth Number"
          value={formData.shaalarthNo}
          onChange={(e) =>
            handleChange("shaalarthNo", e.target.value)
          }
        />

        {/* बरोबर उंची */}
        <Input
          label="बरोबर उंची (मूळ सेवापुस्तकाप्रमाणे)"
          placeholder="उदा. 170 से.मी."
          value={formData.exactHeight}
          onChange={(e) =>
            handleChange("exactHeight", e.target.value)
          }
        />

        {/* ओळख खुणा */}
        <Input
          label="ओळखण्यासाठी अंगावरील खुणा"
          placeholder="उदा. डाव्या हातावर खुण"
          value={formData.bodyMark}
          onChange={(e) =>
            handleChange("bodyMark", e.target.value)
          }
        />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart3Form;