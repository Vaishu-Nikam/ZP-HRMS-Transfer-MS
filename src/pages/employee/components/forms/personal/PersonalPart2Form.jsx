import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const PersonalPart2Form = ({
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

  const appointmentOptions = [
    { id: "सरळसेवा नियुक्ती", name: "सरळसेवा नियुक्ती" },
    { id: "पदोन्नती", name: "पदोन्नती" },
    { id: "अनुकंपा तत्वावर", name: "अनुकंपा तत्वावर" },
    { id: "१०% ग्रा.प्र.", name: "१०% ग्रा.प्र." },
    { id: "लाडपागे शिफारस", name: "लाडपागे शिफारस" },
    { id: "समावेशन", name: "समावेशन" },
    { id: "जि.प.सेस", name: "जि.प.सेस" },
    { id: "कालेलकर आयोग", name: "कालेलकर आयोग" },
    { id: "स्पर्धा परीक्षा", name: "स्पर्धा परीक्षा" },
  ];

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 2"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* नियुक्ती प्रकार */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            प्रथम नियुक्तीचा प्रकार <span className="text-red-500">*</span>
          </label>

          <DropdownSearch
            options={appointmentOptions}
            value={formData.appointmentType}
            onChange={(e)=>
              handleChange("appointmentType", e.target.value)
            }
            placeholder="निवडा"
          />
        </div>

        {/* सेवा */}
        <Input
          label="संवर्गातील सेवा"
          placeholder="उदा. लिपिक वर्ग-३"
          value={formData.serviceCategory}
          onChange={(e)=>
            handleChange("serviceCategory", e.target.value)
          }
        />

        {/* Date */}
        <DatePicker
          label="सेवा प्रवेशात्तर परीक्षा पास दिनांक (dd/MM/yyyy)"
          value={formData.examDate}
          onChange={(val)=>handleChange("examDate", val)}
          placeholder="दिनांक निवडा"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart2Form;