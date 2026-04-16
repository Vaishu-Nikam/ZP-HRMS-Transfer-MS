import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const CurrentPostingForm = (props) => {
  const [formData, setFormData] = useState({
    status: "",
    statusDate: "",
    probation: "",
    probationStart: "",
    probationEnd: "",
    probationComplete: "",
    probationOrderDate: "",
    probationOrderNo: "",
    permanentCert: "",
    permanentCertDate: "",
    permanentDate: "",
    permanentPost: "",
    probationFile: null,
    permanentFile: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 OPTIONS
  const statusOptions = [
    { id: "कायमस्वरूपी", name: "कायमस्वरूपी" },
    { id: "कंत्राटी", name: "कंत्राटी" },
  ];

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleFile = (field, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }
    handleChange(field, file);
  };

  return (
    <EmployeeFormCard title="पदस्थापना सद्यस्थिती माहिती" {...props}>
      <div className="space-y-6">

        {/* 🔷 BASIC */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">सद्यस्थिती</label>
            <DropdownSearch
              value={formData.status}
              onChange={(e)=>handleChange("status", e.target.value)}
              options={statusOptions}
              placeholder="निवडा"
            />
          </div>

          <DatePicker
            label="सद्य स्थिती दिनांक"
            onChange={(v)=>handleChange("statusDate", v)}
          />

        </div>

        {/* 🔷 PROBATION */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">परीविक्षा माहिती</h3>

          <div>
            <label className="text-sm font-medium">परीविक्षा लागू आहे का?</label>
            <DropdownSearch
              value={formData.probation}
              onChange={(e)=>handleChange("probation", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.probation === "होय" && (
            <>
              <DatePicker label="सुरुवात दिनांक"
                onChange={(v)=>handleChange("probationStart", v)} />

              <DatePicker label="समाप्ती दिनांक"
                onChange={(v)=>handleChange("probationEnd", v)} />

              <div>
                <label className="text-sm font-medium">परीविक्षा संपली का?</label>
                <DropdownSearch
                  value={formData.probationComplete}
                  onChange={(e)=>handleChange("probationComplete", e.target.value)}
                  options={yesNoOptions}
                  placeholder="निवडा"
                />
              </div>
            </>
          )}

          {formData.probationComplete === "होय" && (
            <>
              <DatePicker label="आदेश दिनांक"
                onChange={(v)=>handleChange("probationOrderDate", v)} />

              <Input label="आदेश क्रमांक"
                onChange={(e)=>handleChange("probationOrderNo", e.target.value)} />
            </>
          )}

        </div>

        {/* 🔷 PERMANENT */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">स्थायीत्व माहिती</h3>

          <div>
            <label className="text-sm font-medium">स्थायीत्व लाभ प्रमाणपत्र आहे का?</label>
            <DropdownSearch
              value={formData.permanentCert}
              onChange={(e)=>handleChange("permanentCert", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.permanentCert === "होय" && (
            <>
              <DatePicker label="प्रमाणपत्र दिनांक"
                onChange={(v)=>handleChange("permanentCertDate", v)} />

              <DatePicker label="कायम दिनांक"
                onChange={(v)=>handleChange("permanentDate", v)} />

              <Input label="पदनाम"
                onChange={(e)=>handleChange("permanentPost", e.target.value)} />
            </>
          )}

        </div>

        {/* 🔷 FILES */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">परीविक्षा प्रमाणपत्र</label>
            <input
              type="file"
              className="input mt-1"
              onChange={(e)=>handleFile("probationFile", e.target.files[0])}
            />
          </div>

          <div>
            <label className="text-sm font-medium">स्थायीत्व प्रमाणपत्र</label>
            <input
              type="file"
              className="input mt-1"
              onChange={(e)=>handleFile("permanentFile", e.target.files[0])}
            />
          </div>

        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default CurrentPostingForm;