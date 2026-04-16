import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const AppointmentDetailsForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    appointmentType: "",
    serviceCategory: "",
    examDate: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 2"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* प्रथम नियुक्ती प्रकार */}
        <div>
          <label className="text-sm font-medium">
            प्रथम नियुक्तीचा प्रकार <span className="text-red-500">*</span>
          </label>
          <select
            className="input mt-1"
            value={formData.appointmentType}
            onChange={(e) =>
              handleChange("appointmentType", e.target.value)
            }
          >
            <option value="">निवडा</option>
            <option>सरळसेवा नियुक्ती</option>
            <option>पदोन्नती</option>
            <option>अनुकंपा तत्वावर</option>
            <option>१०% ग्रा.प्र.</option>
            <option>लाडपागे शिफारस</option>
            <option>समावेशन</option>
            <option>जि.प.सेस</option>
            <option>कालेलकर आयोग</option>
            <option>स्पर्धा परीक्षा</option>
          </select>
        </div>

        {/* संवर्गातील सेवा */}
        <Input
          label="संवर्गातील सेवा"
          placeholder="Enter Service Category"
          value={formData.serviceCategory}
          onChange={(e) =>
            handleChange("serviceCategory", e.target.value)
          }
        />

        {/* परीक्षा पास दिनांक */}
        <div className="relative">
          <DatePicker
            label="सेवा प्रवेशात्तर परीक्षा पास दिनांक"
            value={formData.examDate}
            onChange={(val) => handleChange("examDate", val)}
            placeholder="dd/MM/yyyy"
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default AppointmentDetailsForm;  