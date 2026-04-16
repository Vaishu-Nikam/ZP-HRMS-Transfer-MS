import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const PersonalPart4Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [formData, setFormData] = useState({
    exServiceman: "",
    domicile: "",
    spouseInService: "",
    spouseServiceType: "",
    officeType: "",
    officeDetails: "",
    spouseEmpId: "",
    pranAvailable: "",
    pranNo: "",
    gpfNo: "",
    ppoNo: "",
    ppoDate: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 4"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* माजी सैनिक */}
        <div>
          <label className="text-sm font-medium">
            कर्मचारी माजी सैनिक आहे का?
          </label>
          <select
            className="input mt-1"
            value={formData.exServiceman}
            onChange={(e) =>
              handleChange("exServiceman", e.target.value)
            }
          >
            <option value="">निवडा</option>
            <option>होय</option>
            <option>नाही</option>
          </select>
        </div>

        {/* अधिवास प्रमाणपत्र */}
        <div>
          <label className="text-sm font-medium">
            अधिवास प्रमाणपत्र आहे का?
          </label>
          <select
            className="input mt-1"
            value={formData.domicile}
            onChange={(e) =>
              handleChange("domicile", e.target.value)
            }
          >
            <option value="">निवडा</option>
            <option>होय</option>
            <option>नाही</option>
          </select>
        </div>

        {/* पती/पत्नी सेवेत */}
        <div>
          <label className="text-sm font-medium">
            पती/पत्‍नी सेवेत आहे का?
          </label>
          <select
            className="input mt-1"
            value={formData.spouseInService}
            onChange={(e) =>
              handleChange("spouseInService", e.target.value)
            }
          >
            <option value="">निवडा</option>
            <option>होय</option>
            <option>नाही</option>
          </select>
        </div>

        {/* सेवा प्रकार */}
        {formData.spouseInService === "होय" && (
          <div>
            <label className="text-sm font-medium">
              सेवा प्रकार
            </label>
            <select
              className="input mt-1"
              value={formData.spouseServiceType}
              onChange={(e) =>
                handleChange("spouseServiceType", e.target.value)
              }
            >
              <option value="">निवडा</option>
              <option>शासकीय</option>
              <option>निमशासकीय</option>
            </select>
          </div>
        )}

        {/* कार्यालयाचा प्रकार */}
        <Input
          label="कार्यालयाचा प्रकार"
          placeholder="Enter Office Type"
          value={formData.officeType}
          onChange={(e) =>
            handleChange("officeType", e.target.value)
          }
        />

        {/* कार्यालय माहिती */}
        <Input
          label="कार्यालय नाव, तालुका व जिल्हा"
          placeholder="Enter Office Details"
          value={formData.officeDetails}
          onChange={(e) =>
            handleChange("officeDetails", e.target.value)
          }
        />

        {/* spouse employee id */}
        <Input
          label="पती/पत्‍नीचा कर्मचारी क्र."
          placeholder="Enter Employee ID"
          value={formData.spouseEmpId}
          onChange={(e) =>
            handleChange("spouseEmpId", e.target.value)
          }
        />

        {/* PRAN */}
        <div>
          <label className="text-sm font-medium">
            PRAN Number आहे का?
          </label>
          <select
            className="input mt-1"
            value={formData.pranAvailable}
            onChange={(e) =>
              handleChange("pranAvailable", e.target.value)
            }
          >
            <option value="">निवडा</option>
            <option>होय</option>
            <option>नाही</option>
          </select>
        </div>

        {/* PRAN number */}
        {formData.pranAvailable === "होय" && (
          <Input
            label="PRAN Number"
            placeholder="Enter PRAN Number"
            value={formData.pranNo}
            onChange={(e) =>
              handleChange("pranNo", e.target.value)
            }
          />
        )}

        {/* GPF */}
        <Input
          label="GPF क्रमांक (असल्यास)"
          placeholder="Enter GPF Number"
          value={formData.gpfNo}
          onChange={(e) =>
            handleChange("gpfNo", e.target.value)
          }
        />

        {/* PPO number */}
        <Input
          label="PPO क्र. (असल्यास)"
          placeholder="Enter PPO Number"
          value={formData.ppoNo}
          onChange={(e) =>
            handleChange("ppoNo", e.target.value)
          }
        />

        {/* PPO Date */}
        <DatePicker
          label="PPO दिनांक (असल्यास)"
          value={formData.ppoDate}
          onChange={(val) => handleChange("ppoDate", val)}
          placeholder="dd/MM/yyyy"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart4Form;