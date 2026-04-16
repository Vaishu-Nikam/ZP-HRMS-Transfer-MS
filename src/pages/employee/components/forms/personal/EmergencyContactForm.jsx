import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const EmergencyContactForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    address: "",
    contactName: "",
    relation: "",
    mobile: "",
    altContactName: "",
    altMobile: "",
    stdCode: "",
    phone: "",
    homeStdCode: "",
    homePhone: "",
    stayFromDate: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeFormCard
      title="आपत्कालीन संपर्काचा पत्ता"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* पत्ता */}
        <div className="col-span-2">
          <Input
            label="पत्ता"
            placeholder="पूर्ण पत्ता लिहा"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* संपर्क व्यक्ती */}
        <Input
          label="संपर्क व्यक्तीचे नाव"
          placeholder="Enter Name"
          value={formData.contactName}
          onChange={(e) => handleChange("contactName", e.target.value)}
        />

        {/* नाते */}
        <Input
          label="नाते"
          placeholder="Enter Relation"
          value={formData.relation}
          onChange={(e) => handleChange("relation", e.target.value)}
        />

        {/* मोबाईल */}
        <Input
          label="मोबाईल नंबर"
          placeholder="Enter Mobile Number"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />

        {/* पर्यायी संपर्क */}
        <Input
          label="पर्यायी संपर्क व्यक्तीचे नाव"
          placeholder="Enter Alternate Name"
          value={formData.altContactName}
          onChange={(e) =>
            handleChange("altContactName", e.target.value)
          }
        />

        {/* पर्यायी मोबाईल */}
        <Input
          label="पर्यायी व्यक्तीचा मोबाईल नंबर"
          placeholder="Enter Alternate Mobile"
          value={formData.altMobile}
          onChange={(e) => handleChange("altMobile", e.target.value)}
        />

        {/* STD Code */}
        <Input
          label="दूरध्वनी एसटीडी कोड"
          placeholder="Enter STD Code"
          value={formData.stdCode}
          onChange={(e) => handleChange("stdCode", e.target.value)}
        />

        {/* दूरध्वनी */}
        <Input
          label="दूरध्वनी क्रमांक"
          placeholder="Enter Telephone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        {/* घरचा STD */}
        <Input
          label="घरचा दूरध्वनी एसटीडी कोड"
          placeholder="Enter Home STD Code"
          value={formData.homeStdCode}
          onChange={(e) =>
            handleChange("homeStdCode", e.target.value)
          }
        />

        {/* घरचा फोन */}
        <Input
          label="घरचा दूरध्वनी क्रमांक"
          placeholder="Enter Home Telephone"
          value={formData.homePhone}
          onChange={(e) =>
            handleChange("homePhone", e.target.value)
          }
        />

        {/* तारीख */}
        <DatePicker
          label="ज्या दिनांकापासून कर्मचारी तेथे राहत आहे"
          value={formData.stayFromDate}
          onChange={(val) => handleChange("stayFromDate", val)}
          placeholder="dd/MM/yyyy"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default EmergencyContactForm;