import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";

const PersonalPart5Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    maritalStatus: "",
    marriageCert: null,
    birthCert: null,
    aadhaar: null,
    pan: null,
    casteCert: null,
    gazette: null,
  });

  const handleFileChange = (field, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 5"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* वैवाहिक स्थिती */}
        <div>
          <label className="text-sm font-medium">
            वैवाहिक स्थिती
          </label>
          <select
            className="input mt-1"
            value={formData.maritalStatus}
            onChange={(e) =>
              setFormData({ ...formData, maritalStatus: e.target.value })
            }
          >
            <option value="">निवडा</option>
            <option>विवाहित</option>
            <option>अविवाहित</option>
            <option>विधवा</option>
            <option>विधुर</option>
            <option>देवदासी</option>
          </select>
        </div>

        {/* विवाह प्रमाणपत्र */}
        <div>
          <label className="text-sm font-medium">
            विवाह नोंदणी प्रमाणपत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("marriageCert", e.target.files[0])
            }
          />
        </div>

        {/* जन्म दाखला */}
        <div>
          <label className="text-sm font-medium">
            जन्माचा दाखला
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("birthCert", e.target.files[0])
            }
          />
        </div>

        {/* आधार */}
        <div>
          <label className="text-sm font-medium">
            आधार कार्ड
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("aadhaar", e.target.files[0])
            }
          />
        </div>

        {/* पॅन */}
        <div>
          <label className="text-sm font-medium">
            पॅन कार्ड
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("pan", e.target.files[0])
            }
          />
        </div>

        {/* जात प्रमाणपत्र */}
        <div>
          <label className="text-sm font-medium">
            जात वैधता प्रमाणपत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("casteCert", e.target.files[0])
            }
          />
        </div>

        {/* राजपत्र */}
        <div>
          <label className="text-sm font-medium">
            नावात बदल असल्यास राजपत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFileChange("gazette", e.target.files[0])
            }
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart5Form;