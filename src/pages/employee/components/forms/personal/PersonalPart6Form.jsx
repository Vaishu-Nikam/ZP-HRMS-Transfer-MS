import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";

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
      alert("Only JPG / PNG files allowed");
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
      <div className="grid grid-cols-2 gap-6">

        {/* फोटो */}
        <div>
          <label className="text-sm font-medium">
            फोटो (.JPG / .PNG)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("photo", e.target.files[0])
            }
          />
        </div>

        {/* स्वाक्षरी */}
        <div>
          <label className="text-sm font-medium">
            स्वाक्षरी (.JPG / .PNG)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("signature", e.target.files[0])
            }
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart6Form;