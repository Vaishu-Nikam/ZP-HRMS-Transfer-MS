import { useEffect, useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import FileUpload from "../../../../../components/common/FileUpload";
import { saveStep6 } from "../../../../../services/employeeService";

const PersonalPart6Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
  employeeData,
}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);


  const [formData, setFormData] = useState({
    photo: null,
    signature: null,
  });

  const handlesubmit = async () => {
  if (!formData.photo || !formData.signature) {
    alert("फोटो आणि स्वाक्षरी दोन्ही आवश्यक आहेत");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const payload = new FormData();

    payload.append("user_id", String(userId));
    payload.append("photo", formData.photo);
    payload.append("signature", formData.signature);

    console.log([...payload.entries()]); // debug

    const res = await saveStep6(payload);

    console.log("STEP 6 SUCCESS:", res);

    if (res) {
      onNext();
    }

  } catch (err) {
    console.error("STEP 6 ERROR:", err.response?.data);
    setError(err.response?.data?.message || "Error");
  } finally {
    setLoading(false);
  }
};

  const handleFileChange = (field, file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("फक्त JPG / PNG फाईल स्वीकारली जाईल");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 6 (फोटो व स्वाक्षरी)"
       onNext={handlesubmit} 
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 🔹 फोटो */}
        <div>
          <FileUpload
            label="फोटो (.JPG / .PNG)"
            accept={["image/jpeg", "image/png"]}
            value={formData.photo}
            onChange={(file)=>handleFileChange("photo", file)}
          />
        </div>

        {/* 🔹 स्वाक्षरी */}
        <div>
          <FileUpload
            label="स्वाक्षरी (.JPG / .PNG)"
            accept={["image/jpeg", "image/png"]}
            value={formData.signature}
            onChange={(file)=>handleFileChange("signature", file)}
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart6Form;