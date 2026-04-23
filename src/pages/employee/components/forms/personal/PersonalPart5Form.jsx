import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import FileUpload from "../../../../../components/common/FileUpload";

const PersonalPart5Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {

  const [formData, setFormData] = useState({
    maritalStatus: "",
    marriageCert: null,
    birthCert: null,
    aadhaar: null,
    pan: null,
    casteCert: null,
    gazette: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const maritalOptions = [
    { id: "विवाहित", name: "विवाहित" },
    { id: "अविवाहित", name: "अविवाहित" },
    { id: "विधवा", name: "विधवा" },
    { id: "विधुर", name: "विधुर" },
    { id: "देवदासी", name: "देवदासी" },
  ];

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 5"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* वैवाहिक स्थिती */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            वैवाहिक स्थिती
          </label>

          <DropdownSearch
            options={maritalOptions}
            value={formData.maritalStatus}
            onChange={(e)=>
              handleChange("maritalStatus", e.target.value)
            }
            placeholder="निवडा"
          />
        </div>

        {/* विवाह प्रमाणपत्र */}
        <FileUpload
          label="विवाह नोंदणी प्रमाणपत्र (२ MB पर्यंत)"
          value={formData.marriageCert}
          onChange={(file)=>handleChange("marriageCert", file)}
        />

        {/* जन्म दाखला */}
        <FileUpload
          label="जन्माचा दाखला (२ MB पर्यंत)"
          value={formData.birthCert}
          onChange={(file)=>handleChange("birthCert", file)}
        />

        {/* आधार */}
        <FileUpload
          label="आधार कार्ड (२ MB पर्यंत)"
          value={formData.aadhaar}
          onChange={(file)=>handleChange("aadhaar", file)}
        />

        {/* पॅन */}
        <FileUpload
          label="पॅन कार्ड (२ MB पर्यंत)"
          value={formData.pan}
          onChange={(file)=>handleChange("pan", file)}
        />

        {/* जात प्रमाणपत्र */}
        <FileUpload
          label="जात वैधता प्रमाणपत्र (२ MB पर्यंत)"
          value={formData.casteCert}
          onChange={(file)=>handleChange("casteCert", file)}
        />

        {/* राजपत्र */}
        <FileUpload
          label="नावात बदल असल्यास राजपत्र (२ MB पर्यंत)"
          value={formData.gazette}
          onChange={(file)=>handleChange("gazette", file)}
        />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart5Form;