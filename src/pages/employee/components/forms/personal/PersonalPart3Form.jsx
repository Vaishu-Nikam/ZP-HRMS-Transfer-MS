import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import { saveStep3 } from "../../../../../services/employeeService";

const PersonalPart3Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId = 14,
}) => {
  const [formData, setFormData] = useState({
    retirement_date: "",
    govt_service_joining_date: "",
    current_office_joining_date: "",
    sevarth_number: "",
    shaalarth_number: "",
    height_cm: "",
    identification_mark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0]; // → "YYYY-MM-DD"
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        user_id: 5,
        retirement_date: formData.retirement_date,
        govt_service_joining_date: formData.govt_service_joining_date,
        current_office_joining_date: formData.current_office_joining_date,
        sevarth_number: formData.sevarth_number,
        shaalarth_number: formData.shaalarth_number,
        height_cm: formData.height_cm,
        identification_mark: formData.identification_mark,
      };

      console.log("STEP 3 PAYLOAD:", payload);

      const res = await saveStep3(payload);

      console.log("STEP 3 SUCCESS:", res);
      onNext();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";
      console.error("STEP 3 ERROR:", err.response?.data || err.message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="३. वैयक्तिक माहिती (भाग-३)"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        <DatePicker
          label="सेवानिवृत्ती दिनांक"
          value={formData.retirement_date}
          onChange={(val) => handleChange("retirement_date", formatDate(val))}
          placeholder="dd/MM/yyyy"
        />

        <DatePicker
          label="शासकीय सेवेत रुजू होण्याचा दिनांक"
          value={formData.govt_service_joining_date}
          onChange={(val) => handleChange("govt_service_joining_date", formatDate(val))}
          placeholder="dd/MM/yyyy"
        />

        <DatePicker
          label="सध्याच्या कार्यालयात रुजू होण्याचा दिनांक"
          value={formData.current_office_joining_date}
          onChange={(val) => handleChange("current_office_joining_date", formatDate(val))}
          placeholder="dd/MM/yyyy"
        />

        <Input
          label="सेवार्थ क्रमांक (असल्यास)"
          placeholder="Enter Sevaarth Number"
          value={formData.sevarth_number}
          onChange={(e) => handleChange("sevarth_number", e.target.value)}
        />

        <Input
          label="शालार्थ क्रमांक (असल्यास)"
          placeholder="Enter Shaalarth Number"
          value={formData.shaalarth_number}
          onChange={(e) => handleChange("shaalarth_number", e.target.value)}
        />

        <Input
          label="बरोबर उंची (मूळ सेवापुस्तकाप्रमाणे)"
          placeholder="उदा. 170"
          value={formData.height_cm}
          onChange={(e) => handleChange("height_cm", e.target.value)}
        />

        <Input
          label="ओळखण्यासाठी अंगावरील खुणा"
          placeholder="उदा. डाव्या हातावर खुण"
          value={formData.identification_mark}
          onChange={(e) => handleChange("identification_mark", e.target.value)}
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

export default PersonalPart3Form;