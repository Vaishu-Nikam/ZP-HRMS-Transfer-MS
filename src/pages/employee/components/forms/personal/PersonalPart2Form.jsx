import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveStep2 } from "../../../../../services/employeeService";

const PersonalPart2Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [formData, setFormData] = useState({
    first_appointment_type: "",   // maps to appointmentOptions id (numeric string)
    cadre_service_name: "",        // maps to serviceCategory input
    dept_entry_exam_date: "",      // maps to examDate in YYYY-MM-DD
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

  // ─── Appointment options — id must match API enum values ─────────────────
  const appointmentOptions = [
    { id: "1", name: "सरळसेवा नियुक्ती" },
    { id: "2", name: "पदोन्नती" },
    { id: "3", name: "अनुकंपा तत्वावर" },
    { id: "4", name: "१०% ग्रा.प्र." },
    { id: "5", name: "लाडपागे शिफारस" },
    { id: "6", name: "समावेशन" },
    { id: "7", name: "जि.प.सेस" },
    { id: "8", name: "कालेलकर आयोग" },
    { id: "9", name: "स्पर्धा परीक्षा" },
  ];

  // ─── Submit ───────────────────────────────────────────────────────────────
 const handleSubmit = async () => {
  setLoading(true);
  setError(null);

  if (!userId) {
    setError("User ID मिळाला नाही");
    setLoading(false); // ✅ fix
    return;
  }

  try {
    const payload = {
      user_id: String(userId),
      first_appointment_type: formData.first_appointment_type,
      cadre_service_name: formData.cadre_service_name,
      dept_entry_exam_date: formData.dept_entry_exam_date,
    };

    console.log("STEP 2 PAYLOAD:", payload);

    const res = await saveStep2(payload);

    console.log("STEP 2 SUCCESS:", res);
    onNext();
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";

    console.error("STEP 2 ERROR:", err.response?.data || err.message);
    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <EmployeeFormCard
      title="२. वैयक्तिक माहिती (भाग-२)"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* नियुक्ती प्रकार */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            प्रथम नियुक्तीचा प्रकार <span className="text-red-500">*</span>
          </label>
          <DropdownSearch
            options={appointmentOptions}
            value={formData.first_appointment_type}
            onChange={(e) =>
              handleChange("first_appointment_type", e.target.value)
            }
            placeholder="निवडा"
          />
        </div>

        {/* संवर्गातील सेवा */}
        <Input
          label="संवर्गातील सेवा"
          placeholder="उदा. लिपिक वर्ग-३"
          value={formData.cadre_service_name}
          onChange={(e) =>
            handleChange("cadre_service_name", e.target.value)
          }
        />

        {/* परीक्षा दिनांक */}
        <DatePicker
          label="सेवा प्रवेशात्तर परीक्षा पास दिनांक (dd/MM/yyyy)"
          value={formData.dept_entry_exam_date}
          onChange={(val) =>
            handleChange("dept_entry_exam_date", formatDate(val))
          }
          placeholder="दिनांक निवडा"
        />

        {/* Error message */}
        {error && (
          <div className="col-span-full text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart2Form;