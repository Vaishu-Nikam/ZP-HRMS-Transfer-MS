import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";

const ResidentialAddressForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    address: "",
    postOffice: "",
    city: "",
    district: "",
    taluka: "",
    pincode: "",
    mobile: "",
    stdCode: "",
    phone: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeFormCard
      title="रहिवासी पत्ता"
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

        {/* पोस्ट ऑफिस */}
        <Input
          label="पोस्ट ऑफिसचे नाव"
          placeholder="Enter Post Office"
          value={formData.postOffice}
          onChange={(e) => handleChange("postOffice", e.target.value)}
        />

        {/* शहर */}
        <Input
          label="शहर"
          placeholder="Enter City"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />

        {/* जिल्हा */}
        <Input
          label="जिल्हा"
          placeholder="Enter District"
          value={formData.district}
          onChange={(e) => handleChange("district", e.target.value)}
        />

        {/* तालुका */}
        <Input
          label="तालुका"
          placeholder="Enter Taluka"
          value={formData.taluka}
          onChange={(e) => handleChange("taluka", e.target.value)}
        />

        {/* पिन कोड */}
        <Input
          label="पिन कोड"
          placeholder="Enter Pincode"
          value={formData.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
        />

        {/* मोबाईल */}
        <Input
          label="मोबाईल नंबर"
          placeholder="Enter Mobile Number"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />

        {/* STD Code */}
        <Input
          label="दूरध्वनी एसटीडी कोड"
          placeholder="Enter STD Code"
          value={formData.stdCode}
          onChange={(e) => handleChange("stdCode", e.target.value)}
        />

        {/* दूरध्वनी क्रमांक */}
        <Input
          label="दूरध्वनी क्रमांक"
          placeholder="Enter Telephone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

      </div>
    </EmployeeFormCard>
  );
};

export default ResidentialAddressForm;