import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import FileUpload from "../../../../../components/common/FileUpload";
import { saveStep5 } from "../../../../../services/employeeService";

const PersonalPart5Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId = 5,
}) => {

  const [formData, setFormData] = useState({
    marital_status: "",      
    marriage_cert: null,      
    birth_cert: null,        
    aadhar: null,            
    pan: null,                
    caste_validity: null,     
    gazette_name_change: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // ids match the numeric enum the API expects for marital_status
  const maritalOptions = [
    { id: "1", name: "विवाहित" },
    { id: "2", name: "अविवाहित" },
    { id: "3", name: "विधवा" },
    { id: "4", name: "विधुर" },
    { id: "5", name: "देवदासी" },
  ];

  // ─── Submit — multipart/form-data ─────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("user_id", String(userId));
      payload.append("marital_status",     formData.marital_status);

      // Only append files if the user selected them
      if (formData.marriage_cert)       payload.append("marriage_cert",       formData.marriage_cert);
      if (formData.birth_cert)          payload.append("birth_cert",          formData.birth_cert);
      if (formData.aadhar)              payload.append("aadhar",              formData.aadhar);
      if (formData.pan)                 payload.append("pan",                 formData.pan);
      if (formData.caste_validity)      payload.append("caste_validity",      formData.caste_validity);
      if (formData.gazette_name_change) payload.append("gazette_name_change", formData.gazette_name_change);

      console.log("STEP 5 PAYLOAD:", Object.fromEntries(payload.entries()));

      const res = await saveStep5(payload);

      console.log("STEP 5 SUCCESS:", res);
      onNext();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";
      console.error("STEP 5 ERROR:", err.response?.data || err.message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="५. वैयक्तिक माहिती (भाग-५)"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* वैवाहिक स्थिती */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            वैवाहिक स्थिती
          </label>
          <DropdownSearch
            options={maritalOptions}
            value={formData.marital_status}
            onChange={(e) => handleChange("marital_status", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* विवाह प्रमाणपत्र */}
        <FileUpload
          label="विवाह नोंदणी प्रमाणपत्र (२ MB पर्यंत)"
          value={formData.marriage_cert}
          onChange={(file) => handleChange("marriage_cert", file)}
        />

        {/* जन्म दाखला */}
        <FileUpload
          label="जन्माचा दाखला (२ MB पर्यंत)"
          value={formData.birth_cert}
          onChange={(file) => handleChange("birth_cert", file)}
        />

        {/* आधार */}
        <FileUpload
          label="आधार कार्ड (२ MB पर्यंत)"
          value={formData.aadhar}
          onChange={(file) => handleChange("aadhar", file)}
        />

        {/* पॅन */}
        <FileUpload
          label="पॅन कार्ड (२ MB पर्यंत)"
          value={formData.pan}
          onChange={(file) => handleChange("pan", file)}
        />

        {/* जात प्रमाणपत्र */}
        <FileUpload
          label="जात वैधता प्रमाणपत्र (२ MB पर्यंत)"
          value={formData.caste_validity}
          onChange={(file) => handleChange("caste_validity", file)}
        />

        {/* राजपत्र */}
        <FileUpload
          label="नावात बदल असल्यास राजपत्र (२ MB पर्यंत)"
          value={formData.gazette_name_change}
          onChange={(file) => handleChange("gazette_name_change", file)}
        />

        {error && (
          <div className="col-span-full text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart5Form;