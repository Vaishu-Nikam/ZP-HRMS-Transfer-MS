import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

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

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const spouseServiceOptions = [
    { id: "शासकीय", name: "शासकीय" },
    { id: "निमशासकीय", name: "निमशासकीय" },
  ];

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 4"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* माजी सैनिक */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            कर्मचारी माजी सैनिक आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.exServiceman}
            onChange={(e)=>handleChange("exServiceman", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* अधिवास */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            अधिवास प्रमाणपत्र आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.domicile}
            onChange={(e)=>handleChange("domicile", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* spouse */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            पती/पत्‍नी सेवेत आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.spouseInService}
            onChange={(e)=>handleChange("spouseInService", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* spouse service */}
        {formData.spouseInService === "होय" && (
          <div>
            <label className="text-sm font-medium text-slate-700">
              सेवा प्रकार
            </label>
            <DropdownSearch
              options={spouseServiceOptions}
              value={formData.spouseServiceType}
              onChange={(e)=>handleChange("spouseServiceType", e.target.value)}
              placeholder="निवडा"
            />
          </div>
        )}

        <Input
          label="कार्यालयाचा प्रकार"
          placeholder="उदा. पंचायत समिती"
          value={formData.officeType}
          onChange={(e)=>handleChange("officeType", e.target.value)}
        />

        <Input
          label="कार्यालय नाव, तालुका व जिल्हा"
          placeholder="उदा. पंचायत समिती, नगर"
          value={formData.officeDetails}
          onChange={(e)=>handleChange("officeDetails", e.target.value)}
        />

        <Input
          label="पती/पत्‍नीचा कर्मचारी क्र."
          placeholder="उदा. EMP123"
          value={formData.spouseEmpId}
          onChange={(e)=>handleChange("spouseEmpId", e.target.value)}
        />

        {/* PRAN */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            PRAN Number आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.pranAvailable}
            onChange={(e)=>handleChange("pranAvailable", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* PRAN no */}
        {formData.pranAvailable === "होय" && (
          <Input
            label="PRAN Number"
            placeholder="उदा. 123456789012"
            value={formData.pranNo}
            onChange={(e)=>handleChange("pranNo", e.target.value)}
          />
        )}

        <Input
          label="GPF क्रमांक (असल्यास)"
          placeholder="उदा. GPF12345"
          value={formData.gpfNo}
          onChange={(e)=>handleChange("gpfNo", e.target.value)}
        />

        <Input
          label="PPO क्र. (असल्यास)"
          placeholder="उदा. PPO98765"
          value={formData.ppoNo}
          onChange={(e)=>handleChange("ppoNo", e.target.value)}
        />

        <DatePicker
          label="PPO दिनांक (dd/MM/yyyy)"
          value={formData.ppoDate}
          onChange={(val)=>handleChange("ppoDate", val)}
          placeholder="दिनांक निवडा"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart4Form;