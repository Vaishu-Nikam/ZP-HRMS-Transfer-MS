import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import FileUpload from "../../../../../components/common/FileUpload";

const PersonalPart6Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {

  const [formData, setFormData] = useState({
    photo: null,
    signature: null,
  });

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
      onNext={onNext}
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